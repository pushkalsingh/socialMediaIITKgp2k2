"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, getSession } from "@/lib/auth";

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

  await createSession({ adminId: admin.id, email: admin.email, name: admin.name });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function changePasswordAction(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  const admin = await prisma.admin.findUnique({ where: { id: session.adminId } });
  if (!admin) redirect("/admin/login");

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    redirect(`/admin/account?error=${encodeURIComponent("Current password is incorrect")}`);
  }
  if (newPassword.length < 8) {
    redirect(
      `/admin/account?error=${encodeURIComponent("New password must be at least 8 characters")}`
    );
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.admin.update({ where: { id: admin.id }, data: { passwordHash } });

  redirect(`/admin/account?success=${encodeURIComponent("Password updated")}`);
}

export async function addAdminAction(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

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
  await prisma.admin.create({ data: { email, name, passwordHash } });

  redirect(`/admin/account?success=${encodeURIComponent("Admin added")}`);
}
