"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin, getTodaysCreateCount, DAILY_CREATE_LIMIT } from "@/lib/dal";
import { toSlug, uniqueSuffix } from "@/lib/slug";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

async function requireSuperAdmin() {
  const admin = await requireAdmin();
  if (!admin.isSuperAdmin) redirect("/admin/people");
  return admin;
}

const urlField = z
  .union([z.string().trim().url(), z.literal("")])
  .optional()
  .transform((v) => (v ? v : undefined));

const personSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  bio: z.string().trim().min(1, "Bio is required").max(500),
  categoryId: z.string().min(1, "Choose a topic"),
  avatarUrl: urlField,
  youtubeUrl: urlField,
  instagramUrl: urlField,
  facebookUrl: urlField,
  xUrl: urlField,
  tiktokUrl: urlField,
  websiteUrl: urlField,
});

function readPersonForm(formData: FormData) {
  return personSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    categoryId: formData.get("categoryId"),
    avatarUrl: formData.get("avatarUrl") || "",
    youtubeUrl: formData.get("youtubeUrl") || "",
    instagramUrl: formData.get("instagramUrl") || "",
    facebookUrl: formData.get("facebookUrl") || "",
    xUrl: formData.get("xUrl") || "",
    tiktokUrl: formData.get("tiktokUrl") || "",
    websiteUrl: formData.get("websiteUrl") || "",
  });
}

export async function createPersonAction(formData: FormData) {
  const admin = await requireAdmin();

  if (!admin.isSuperAdmin) {
    const todaysCount = await getTodaysCreateCount(admin.id);
    if (todaysCount >= DAILY_CREATE_LIMIT) {
      redirect(
        `/admin/people/new?error=${encodeURIComponent(
          `You've hit the daily limit of ${DAILY_CREATE_LIMIT} new entries. Try again tomorrow.`
        )}`
      );
    }
  }

  const parsed = readPersonForm(formData);
  if (!parsed.success) {
    redirect(`/admin/people/new?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  const data = parsed.data;
  let slug = toSlug(data.name);
  const existing = await prisma.person.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${uniqueSuffix()}`;

  await prisma.person.create({
    data: { ...data, slug, addedById: admin.id },
  });

  revalidatePath("/");
  revalidatePath("/admin/people");
  redirect("/admin/people");
}

export async function updatePersonAction(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = readPersonForm(formData);
  if (!parsed.success) {
    redirect(`/admin/people/${id}/edit?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  const verified = formData.get("verified") === "on";

  await prisma.person.update({
    where: { id },
    data: { ...parsed.data, verified },
  });

  revalidatePath("/");
  revalidatePath("/admin/people");
  redirect("/admin/people");
}

// Deleting is permanent, so it's restricted to the super admin.
export async function deletePersonAction(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id"));
  await prisma.person.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/people");
  redirect("/admin/people");
}
