"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth";
import { getCurrentAdmin } from "@/lib/dal";

const ID_NUMBER_PATTERN = /^\d{2}[A-Z]{2}\d{4}$/;

function normalizeIdNumber(value: string) {
  return value.trim().toUpperCase();
}

// No password for now — this is a small, trusted group, and email + ID number
// (the same pair reviewed at approval time) is enough of a gate. Password
// support is still in the schema (passwordHash) if it's needed again later.
export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const identificationNumber = normalizeIdNumber(String(formData.get("identificationNumber") ?? ""));

  if (!email || !identificationNumber) {
    redirect(`/admin/login?error=${encodeURIComponent("Email and ID number are required")}`);
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || admin.identificationNumber !== identificationNumber) {
    redirect(`/admin/login?error=${encodeURIComponent("Invalid email or ID number")}`);
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

// Any approved admin can vouch for and directly add another admin — this
// bypasses the identification-number request queue entirely.
export async function addAdminAction(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const identificationNumber = normalizeIdNumber(
    String(formData.get("identificationNumber") ?? "")
  );

  if (!email || !name || !ID_NUMBER_PATTERN.test(identificationNumber)) {
    redirect(
      `/admin/account?error=${encodeURIComponent(
        "Name, email, and a valid ID number (e.g. 02ME3031) are required"
      )}`
    );
  }

  const existingEmail = await prisma.admin.findUnique({ where: { email } });
  if (existingEmail) {
    redirect(`/admin/account?error=${encodeURIComponent("An admin with that email already exists")}`);
  }
  const existingId = await prisma.admin.findUnique({ where: { identificationNumber } });
  if (existingId) {
    redirect(`/admin/account?error=${encodeURIComponent("That ID number is already registered")}`);
  }

  await prisma.admin.create({
    data: { email, name, identificationNumber, status: "APPROVED", isSuperAdmin: false },
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
});

// Public: anyone can submit a request. It sits as PENDING until a super admin
// approves or rejects it from /admin/requests.
export async function requestAccessAction(formData: FormData) {
  const parsed = requestAccessSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    identificationNumber: formData.get("identificationNumber"),
  });

  if (!parsed.success) {
    redirect(`/admin/apply?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  const { name, email, identificationNumber } = parsed.data;

  const existingEmail = await prisma.admin.findUnique({ where: { email } });
  if (existingEmail) {
    redirect(
      `/admin/apply?error=${encodeURIComponent(
        "An account with that email already exists — log in, or contact the super admin if your request is still pending."
      )}`
    );
  }
  const existingId = await prisma.admin.findUnique({ where: { identificationNumber } });
  if (existingId) {
    redirect(
      `/admin/apply?error=${encodeURIComponent(
        "That ID number has already submitted a request. Contact the super admin if you think this is a mistake."
      )}`
    );
  }

  await prisma.admin.create({
    data: {
      name,
      email,
      identificationNumber,
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
