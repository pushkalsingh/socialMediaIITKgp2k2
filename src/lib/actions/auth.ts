"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth";
import { getCurrentAdmin } from "@/lib/dal";

const ID_NUMBER_PATTERN = /^\d{2}[A-Z]{2}\d{4}$/;

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(`/admin/login?error=${encodeURIComponent("Email and password are required")}`);
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  const valid = admin ? await bcrypt.compare(password, admin.passwordHash) : false;

  if (!admin || !valid) {
    redirect(`/admin/login?error=${encodeURIComponent("Invalid email or password")}`);
  }

  if (admin.status === "PENDING") {
    redirect(
      `/admin/login?error=${encodeURIComponent(
        "Your access request is still awaiting approval from a super admin."
      )}`
    );
  }
  if (admin.status === "REJECTED") {
    redirect(
      `/admin/login?error=${encodeURIComponent(
        "Your access request was not approved. Contact the site owner if you think this is a mistake."
      )}`
    );
  }

  await createSession({ adminId: admin.id });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function changePasswordAction(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  const record = await prisma.admin.findUnique({ where: { id: admin.id } });
  if (!record) redirect("/admin/login");

  const valid = await bcrypt.compare(currentPassword, record.passwordHash);
  if (!valid) {
    redirect(`/admin/account?error=${encodeURIComponent("Current password is incorrect")}`);
  }
  if (newPassword.length < 8) {
    redirect(
      `/admin/account?error=${encodeURIComponent("New password must be at least 8 characters")}`
    );
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.admin.update({ where: { id: record.id }, data: { passwordHash } });

  redirect(`/admin/account?success=${encodeURIComponent("Password updated")}`);
}

// Any approved admin can vouch for and directly add another admin — this
// bypasses the identification-number request queue entirely.
export async function addAdminAction(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !name || password.length < 8) {
    redirect(
      `/admin/account?error=${encodeURIComponent(
        "Name, email, and an 8+ character password are required"
      )}`
    );
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    redirect(`/admin/account?error=${encodeURIComponent("An admin with that email already exists")}`);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.create({
    data: { email, name, passwordHash, status: "APPROVED", isSuperAdmin: false },
  });

  redirect(`/admin/account?success=${encodeURIComponent("Admin added")}`);
}

const requestAccessSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  identificationNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(ID_NUMBER_PATTERN, "ID number should look like 02ME3031 (year + department + roll number)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Public: anyone can submit a request. It sits as PENDING until a super admin
// approves or rejects it from /admin/requests.
export async function requestAccessAction(formData: FormData) {
  const parsed = requestAccessSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    identificationNumber: formData.get("identificationNumber"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect(`/admin/apply?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  const { name, email, identificationNumber, password } = parsed.data;

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    redirect(
      `/admin/apply?error=${encodeURIComponent(
        "An account with that email already exists — log in, or contact the super admin if your request is still pending."
      )}`
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.create({
    data: {
      name,
      email,
      identificationNumber,
      passwordHash,
      status: "PENDING",
      isSuperAdmin: false,
    },
  });

  redirect("/admin/apply?submitted=1");
}

async function requireSuperAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (!admin.isSuperAdmin) redirect("/admin");
  return admin;
}

export async function approveAdminAction(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id"));
  await prisma.admin.update({ where: { id }, data: { status: "APPROVED" } });
  redirect("/admin/requests");
}

export async function rejectAdminAction(formData: FormData) {
  const superAdmin = await requireSuperAdmin();
  const id = String(formData.get("id"));
  if (id === superAdmin.id) {
    redirect(`/admin/requests?error=${encodeURIComponent("You can't reject your own account")}`);
  }
  await prisma.admin.update({ where: { id }, data: { status: "REJECTED" } });
  redirect("/admin/requests");
}

// Pulls an already-approved admin's access, e.g. someone who left or was added by mistake.
export async function revokeAdminAction(formData: FormData) {
  const superAdmin = await requireSuperAdmin();
  const id = String(formData.get("id"));
  if (id === superAdmin.id) {
    redirect(`/admin/requests?error=${encodeURIComponent("You can't revoke your own access")}`);
  }
  await prisma.admin.update({ where: { id }, data: { status: "REJECTED" } });
  redirect("/admin/requests");
}
