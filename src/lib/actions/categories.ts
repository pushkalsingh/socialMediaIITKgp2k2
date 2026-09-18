"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/dal";
import { toSlug, uniqueSuffix } from "@/lib/slug";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

const categorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60),
  description: z.string().trim().min(1, "Description is required").max(300),
  icon: z.string().trim().max(8).optional(),
});

export async function createCategoryAction(formData: FormData) {
  await requireAdmin();

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon") || undefined,
  });

  if (!parsed.success) {
    redirect(`/admin/categories/new?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  const { name, description, icon } = parsed.data;
  let slug = toSlug(name);
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${uniqueSuffix()}`;

  await prisma.category.create({ data: { name, description, icon: icon ?? null, slug } });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon") || undefined,
  });

  if (!parsed.success) {
    redirect(
      `/admin/categories/${id}/edit?error=${encodeURIComponent(parsed.error.issues[0].message)}`
    );
  }

  const { name, description, icon } = parsed.data;
  await prisma.category.update({
    where: { id },
    data: { name, description, icon: icon ?? null },
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.category.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
