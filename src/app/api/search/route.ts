import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const people = await prisma.person.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { bio: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { name: "asc" },
    take: 8,
    select: {
      name: true,
      slug: true,
      avatarUrl: true,
      category: { select: { name: true, icon: true } },
    },
  });

  return NextResponse.json({ results: people });
}
