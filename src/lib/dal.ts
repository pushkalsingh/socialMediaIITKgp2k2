import "server-only";
import { cache } from "react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type CurrentAdmin = {
  id: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
};

/**
 * Secure (database-backed) authorization check. The session cookie only proves
 * *who* someone claims to be; this confirms their account still exists and is
 * currently APPROVED, so a super admin revoking access takes effect on the next
 * request rather than waiting for the old session cookie to expire.
 */
export const getCurrentAdmin = cache(async (): Promise<CurrentAdmin | null> => {
  const session = await getSession();
  if (!session) return null;

  const admin = await prisma.admin.findUnique({ where: { id: session.adminId } });
  if (!admin || admin.status !== "APPROVED") return null;

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    isSuperAdmin: admin.isSuperAdmin,
  };
});

// Regular (non-super) admins can add at most this many topics + channels,
// combined, per calendar day (UTC) — a spam/abuse guard for a small, trusted
// but not fully vetted group. Super admins are exempt.
export const DAILY_CREATE_LIMIT = 50;

function startOfTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function getTodaysCreateCount(adminId: string) {
  const since = startOfTodayUTC();
  const [categoryCount, personCount] = await Promise.all([
    prisma.category.count({ where: { addedById: adminId, createdAt: { gte: since } } }),
    prisma.person.count({ where: { addedById: adminId, createdAt: { gte: since } } }),
  ]);
  return categoryCount + personCount;
}
