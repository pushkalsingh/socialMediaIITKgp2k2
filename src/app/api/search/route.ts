import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const [categories, people] = await Promise.all([
    prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { name: "asc" },
      take: 4,
      select: {
        name: true,
        slug: true,
        icon: true,
        _count: { select: { people: true } },
      },
    }),
    prisma.person.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { bio: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { name: "asc" },
      take: 6,
      select: {
        name: true,
        slug: true,
        avatarUrl: true,
        category: { select: { name: true, icon: true } },
      },
    }),
  ]);

  const results = [
    ...categories.map((category) => ({
      type: "category" as const,
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      count: category._count.people,
    })),
    ...people.map((person) => ({
      type: "person" as const,
      name: person.name,
      slug: person.slug,
      avatarUrl: person.avatarUrl,
      category: person.category,
    })),
  ];

  return NextResponse.json({ results });
}
