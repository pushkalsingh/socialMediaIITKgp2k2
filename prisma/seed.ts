import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type SeedPerson = {
  name: string;
  slug: string;
  bio: string;
  youtubeUrl?: string;
  xUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  websiteUrl?: string;
};

type SeedCategory = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  people: SeedPerson[];
};

// Links below are seeded from well-known, public handles as a starting point.
// Social handles change over time — an admin should periodically open each
// person's edit page and confirm the links still resolve, then mark them verified.
const categories: SeedCategory[] = [
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: "🤖",
    description:
      "Researchers, engineers, and educators who post about machine learning, deep learning, and the AI industry.",
    people: [
      {
        name: "Andrej Karpathy",
        slug: "andrej-karpathy",
        bio: "Founding member of OpenAI and former Tesla AI director. Posts deeply technical, hands-on deep learning tutorials.",
        youtubeUrl: "https://www.youtube.com/@AndrejKarpathy",
        xUrl: "https://x.com/karpathy",
      },
      {
        name: "Andrew Ng",
        slug: "andrew-ng",
        bio: "Co-founder of Coursera and DeepLearning.AI. One of the most widely followed voices in applied machine learning education.",
        youtubeUrl: "https://www.youtube.com/@Deeplearningai",
        xUrl: "https://x.com/AndrewYNg",
      },
      {
        name: "Yann LeCun",
        slug: "yann-lecun",
        bio: "Turing Award winner and Meta's Chief AI Scientist. Frequently shares commentary on AI research direction and debates.",
        xUrl: "https://x.com/ylecun",
      },
      {
        name: "Two Minute Papers",
        slug: "two-minute-papers",
        bio: "Karoly Zsolnai-Fehér breaks down cutting-edge AI and computer graphics research papers in short, accessible videos.",
        youtubeUrl: "https://www.youtube.com/@TwoMinutePapers",
      },
      {
        name: "Lex Fridman",
        slug: "lex-fridman",
        bio: "AI researcher who hosts long-form interviews with scientists, engineers, and founders about AI and technology.",
        youtubeUrl: "https://www.youtube.com/@lexfridman",
        xUrl: "https://x.com/lexfridman",
      },
    ],
  },
  {
    name: "Software Development",
    slug: "software-development",
    icon: "💻",
    description:
      "Programmers and educators sharing coding tutorials, engineering best practices, and software industry commentary.",
    people: [
      {
        name: "Fireship",
        slug: "fireship",
        bio: "Jeff Delaney's channel known for fast-paced, high-density explainer videos covering new frameworks and tools.",
        youtubeUrl: "https://www.youtube.com/@Fireship",
        xUrl: "https://x.com/fireship_dev",
      },
      {
        name: "ThePrimeagen",
        slug: "theprimeagen",
        bio: "Former Netflix engineer known for opinionated, entertaining content on Vim, performance, and software careers.",
        youtubeUrl: "https://www.youtube.com/@ThePrimeTimeagen",
        xUrl: "https://x.com/ThePrimeagen",
      },
      {
        name: "Theo (t3.gg)",
        slug: "theo-t3dotgg",
        bio: "Creator of the T3 Stack, streams and posts about TypeScript, web frameworks, and startup engineering decisions.",
        youtubeUrl: "https://www.youtube.com/@t3dotgg",
        xUrl: "https://x.com/theo",
      },
      {
        name: "freeCodeCamp.org",
        slug: "freecodecamp",
        bio: "Nonprofit publishing free, full-length courses on programming languages, frameworks, and computer science.",
        youtubeUrl: "https://www.youtube.com/@freecodecamp",
      },
      {
        name: "Dan Abramov",
        slug: "dan-abramov",
        bio: "Former React core team member at Meta, writes and speaks about React internals and software design.",
        xUrl: "https://x.com/dan_abramov",
        websiteUrl: "https://overreacted.io",
      },
    ],
  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: "🌐",
    description:
      "Front-end and full-stack creators focused on HTML, CSS, JavaScript, and modern web frameworks.",
    people: [
      {
        name: "Kevin Powell",
        slug: "kevin-powell",
        bio: "One of the most followed CSS educators on YouTube, focused on layout, responsive design, and CSS fundamentals.",
        youtubeUrl: "https://www.youtube.com/@KevinPowell",
      },
      {
        name: "Web Dev Simplified",
        slug: "web-dev-simplified",
        bio: "Kyle Cook teaches JavaScript, React, and web fundamentals with clear, project-based tutorials.",
        youtubeUrl: "https://www.youtube.com/@WebDevSimplified",
      },
      {
        name: "Traversy Media",
        slug: "traversy-media",
        bio: "Brad Traversy's long-running channel covering full-stack web development crash courses.",
        youtubeUrl: "https://www.youtube.com/@TraversyMedia",
      },
    ],
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: "📊",
    description:
      "Statisticians, analysts, and data scientists explaining statistics, machine learning, and data careers.",
    people: [
      {
        name: "StatQuest with Josh Starmer",
        slug: "statquest",
        bio: "Explains statistics and machine learning concepts with clear visuals and a friendly, patient teaching style.",
        youtubeUrl: "https://www.youtube.com/@statquest",
      },
      {
        name: "Ken Jee",
        slug: "ken-jee",
        bio: "Data scientist creating content on breaking into data science careers and real-world project workflows.",
        youtubeUrl: "https://www.youtube.com/@KenJee",
      },
    ],
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    icon: "🔒",
    description:
      "Security researchers and educators covering networking, ethical hacking, and defensive security practices.",
    people: [
      {
        name: "NetworkChuck",
        slug: "networkchuck",
        bio: "Former Air Force IT specialist teaching networking, Linux, and cybersecurity basics in an energetic style.",
        youtubeUrl: "https://www.youtube.com/@NetworkChuck",
      },
      {
        name: "John Hammond",
        slug: "john-hammond",
        bio: "Security researcher covering malware analysis, CTF walkthroughs, and practical cybersecurity education.",
        youtubeUrl: "https://www.youtube.com/@_JohnHammond",
      },
    ],
  },
  {
    name: "Startups & Entrepreneurship",
    slug: "startups-entrepreneurship",
    icon: "🚀",
    description:
      "Founders and operators sharing lessons on building companies, product, and early-stage growth. Add your own picks here.",
    people: [],
  },
  {
    name: "Design & UX",
    slug: "design-ux",
    icon: "🎨",
    description:
      "Product designers and UX practitioners sharing design process, critique, and career advice. Add your own picks here.",
    people: [],
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Admin";

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
    },
  });

  console.log(`Admin ready: ${admin.email}`);

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
      },
    });

    for (const person of category.people) {
      await prisma.person.upsert({
        where: { slug: person.slug },
        update: {
          name: person.name,
          bio: person.bio,
          categoryId: createdCategory.id,
          youtubeUrl: person.youtubeUrl,
          xUrl: person.xUrl,
          instagramUrl: person.instagramUrl,
          facebookUrl: person.facebookUrl,
          tiktokUrl: person.tiktokUrl,
          websiteUrl: person.websiteUrl,
        },
        create: {
          name: person.name,
          slug: person.slug,
          bio: person.bio,
          categoryId: createdCategory.id,
          addedById: admin.id,
          youtubeUrl: person.youtubeUrl,
          xUrl: person.xUrl,
          instagramUrl: person.instagramUrl,
          facebookUrl: person.facebookUrl,
          tiktokUrl: person.tiktokUrl,
          websiteUrl: person.websiteUrl,
        },
      });
    }

    console.log(
      `Category ready: ${createdCategory.name} (${category.people.length} people)`
    );
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
