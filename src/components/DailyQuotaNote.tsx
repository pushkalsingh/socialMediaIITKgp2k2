import { getCurrentAdmin, getTodaysCreateCount, DAILY_CREATE_LIMIT } from "@/lib/dal";

export async function DailyQuotaNote() {
  const admin = await getCurrentAdmin();
  if (!admin || admin.isSuperAdmin) return null;

  const used = await getTodaysCreateCount(admin.id);
  const remaining = Math.max(DAILY_CREATE_LIMIT - used, 0);

  return (
    <p className="text-xs text-neutral-500 mb-4">
      {remaining} of {DAILY_CREATE_LIMIT} new entries left today.
    </p>
  );
}
