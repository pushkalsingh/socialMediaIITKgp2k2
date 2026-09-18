import { PrismaClient } from "@prisma/client";

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
  // Email of the contributor to attribute this entry to. Defaults to the
  // category's addedByEmail, then to the super admin.
  addedByEmail?: string;
};

type SeedCategory = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  people: SeedPerson[];
  addedByEmail?: string;
};

// Contributors whose personal recommendations are attributed on the public
// site (e.g. "Added by Nitesh"). These aren't real login accounts unless
// someone later gives them a real email/ID number via the admin panel.
const contributors = {
  nitesh: {
    email: "nitesh@example.com",
    name: "Nitesh",
    identificationNumber: "00NI0001",
  },
  arindam: {
    email: "arindam.kushagra@example.com",
    name: "Arindam Kushagra",
    identificationNumber: "00AK0001",
  },
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
      "Founders and operators sharing lessons on building companies, product, and early-stage growth.",
    people: [
      {
        name: "Elon Musk",
        slug: "elon-musk",
        bio: "Entrepreneur behind Tesla, SpaceX, and other ventures. Posts frequently on X about technology, business, and current events.",
        xUrl: "https://x.com/elonmusk",
        addedByEmail: contributors.arindam.email,
      },
      {
        name: "Y Combinator",
        slug: "y-combinator",
        bio: "Influential startup accelerator. Its YouTube channel and Startup School content are widely followed for practical, founder-focused startup advice.",
        websiteUrl: "https://www.ycombinator.com",
        youtubeUrl: "https://www.youtube.com/@ycombinator",
        xUrl: "https://x.com/ycombinator",
        addedByEmail: contributors.arindam.email,
      },
    ],
  },
  {
    name: "Design & UX",
    slug: "design-ux",
    icon: "🎨",
    description:
      "Product designers and UX practitioners sharing design process, critique, and career advice. Add your own picks here.",
    people: [],
  },
  {
    name: "Finance & Investing",
    slug: "finance-investing",
    icon: "💰",
    description: "Investors and educators explaining valuation, markets, and financial decision-making.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Aswath Damodaran",
        slug: "aswath-damodaran",
        bio: "NYU Stern finance professor known as \"the Dean of Valuation.\" Followed for company valuation frameworks, in the tradition of Graham and Dodd.",
      },
    ],
  },
  {
    name: "Fitness & Strength Training",
    slug: "fitness-strength-training",
    icon: "💪",
    description: "Coaches sharing practical, no-nonsense training, mobility, and strength wisdom.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Kboges",
        slug: "kboges",
        bio: "Fitness coach and physical therapist sharing practical strength training and mobility advice.",
        youtubeUrl: "https://www.youtube.com/@kboges",
      },
      {
        name: "Dan John",
        slug: "dan-john",
        bio: "Veteran strength coach known for pragmatic, experience-tested kettlebell and barbell training wisdom.",
      },
    ],
  },
  {
    name: "Food & Cooking",
    slug: "food-cooking",
    icon: "🍳",
    description: "Chefs and food writers sharing recipes and the culture and science behind them.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Krish Ashok",
        slug: "krish-ashok",
        bio: "Writer behind \"Masala Lab,\" exploring the science and culture of Indian cooking.",
      },
      {
        name: "Ranveer Brar",
        slug: "ranveer-brar",
        bio: "Chef and TV personality sharing Indian recipes and food culture.",
        youtubeUrl: "https://www.youtube.com/@RanveerBrar",
      },
    ],
  },
  {
    name: "Mythology & Culture",
    slug: "mythology-culture",
    icon: "📜",
    description: "Writers and storytellers exploring mythology and its modern parallels.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Devdutt Pattanaik",
        slug: "devdutt-pattanaik",
        bio: "Mythologist and author who brings Indian mythology and its modern parallels to a wide audience — less a formal scholar than a source of thought-provoking perspective.",
      },
    ],
  },
  {
    name: "Productivity & Focus",
    slug: "productivity-focus",
    icon: "🎯",
    description: "Writers and researchers on attention, deep work, and avoiding digital distraction.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Cal Newport",
        slug: "cal-newport",
        bio: "Computer science professor and author (Deep Work, Digital Minimalism) known for practical thinking on focus, attention, and dopamine detox.",
        websiteUrl: "https://calnewport.com",
      },
    ],
  },
  {
    name: "Mathematics",
    slug: "mathematics",
    icon: "➗",
    description: "Channels making mathematics accessible and interesting to a general audience.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Numberphile",
        slug: "numberphile",
        bio: "Brady Haran's channel exploring interesting mathematics, from number theory to puzzles, with academics and enthusiasts.",
        youtubeUrl: "https://www.youtube.com/@numberphile",
      },
    ],
  },
  {
    name: "Computer Science",
    slug: "computer-science",
    icon: "🖥️",
    description: "Academic computer science content — courses, theory, and computing history.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Computerphile",
        slug: "computerphile",
        bio: "Companion channel to Numberphile covering computer science topics, from algorithms to computing history.",
        youtubeUrl: "https://www.youtube.com/@Computerphile",
      },
      {
        name: "David J. Malan (CS50)",
        slug: "david-j-malan-cs50",
        bio: "Harvard professor behind CS50, one of the most popular introductory computer science courses, with lectures freely available on YouTube.",
        youtubeUrl: "https://www.youtube.com/@cs50",
      },
    ],
  },
  {
    name: "Science",
    slug: "science",
    icon: "🔬",
    description: "Publications and channels covering research and ideas across the sciences.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Veritasium",
        slug: "veritasium",
        bio: "Derek Muller's channel covering physics, engineering, and the science behind everyday phenomena.",
        youtubeUrl: "https://www.youtube.com/@veritasium",
        addedByEmail: contributors.nitesh.email,
      },
      {
        name: "David Epstein",
        slug: "david-epstein",
        bio: "Science journalist and author of Range and The Sports Gene, writing on performance, generalism, and evidence-based thinking.",
        addedByEmail: contributors.arindam.email,
      },
      {
        name: "Quanta Magazine",
        slug: "quanta-magazine",
        bio: "Editorially independent publication covering developments in math, physics, biology, and computer science.",
        websiteUrl: "https://www.quantamagazine.org",
        addedByEmail: contributors.arindam.email,
      },
      {
        name: "Nautil.us",
        slug: "nautilus",
        bio: "Science and philosophy publication known for long-form, narrative-style articles, in the vein of PBS-style general-audience science storytelling.",
        websiteUrl: "https://nautil.us",
        addedByEmail: contributors.arindam.email,
      },
      {
        name: "Phys.org",
        slug: "phys-org",
        bio: "News aggregator covering the latest research across physics, science, and technology.",
        websiteUrl: "https://phys.org",
        addedByEmail: contributors.arindam.email,
      },
    ],
  },
  {
    name: "Motorcycles",
    slug: "motorcycles",
    icon: "🏍️",
    description: "Channels covering motorcycle reviews, culture, and history.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "FortNine",
        slug: "fortnine",
        bio: "Canadian motorcycle channel known for well-researched, entertaining reviews and motorcycle history and culture videos.",
        youtubeUrl: "https://www.youtube.com/@FortNine",
      },
    ],
  },
  {
    name: "Human Anatomy & Physiology",
    slug: "human-anatomy-physiology",
    icon: "🫀",
    description: "Educational channels covering human anatomy and physiology.",
    addedByEmail: contributors.nitesh.email,
    people: [
      {
        name: "Institute of Human Anatomy",
        slug: "institute-of-human-anatomy",
        bio: "Known for hands-on anatomy lessons using real specimens. More recent videos lean toward explaining physiology via cadavers, which some viewers find harder to follow than the earlier anatomy-focused content.",
        youtubeUrl: "https://www.youtube.com/@instituteofhumananatomy",
      },
    ],
  },
  {
    name: "Philosophy & Big Ideas",
    slug: "philosophy-big-ideas",
    icon: "🧠",
    description: "Writers and publications exploring philosophy, history, and big-picture ideas.",
    addedByEmail: contributors.arindam.email,
    people: [
      {
        name: "Yuval Noah Harari",
        slug: "yuval-noah-harari",
        bio: "Historian and author of Sapiens and Homo Deus, known for big-picture thinking on human history, technology, and the future.",
        websiteUrl: "https://www.ynharari.com",
      },
      {
        name: "Naval Ravikant",
        slug: "naval-ravikant",
        bio: "Entrepreneur and investor (AngelList) known for widely shared writing and podcasts on wealth, happiness, and decision-making.",
        websiteUrl: "https://nav.al",
        xUrl: "https://x.com/naval",
      },
      {
        name: "Aeon.co",
        slug: "aeon-co",
        bio: "Publication of essays and ideas spanning philosophy, science, and culture.",
        websiteUrl: "https://aeon.co",
      },
    ],
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminIdNumber = process.env.ADMIN_ID_NUMBER;
  const adminName = process.env.ADMIN_NAME ?? "Admin";

  if (!adminEmail || !adminIdNumber) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_ID_NUMBER must be set in .env before seeding."
    );
  }

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { isSuperAdmin: true, status: "APPROVED", identificationNumber: adminIdNumber },
    create: {
      email: adminEmail,
      name: adminName,
      identificationNumber: adminIdNumber,
      isSuperAdmin: true,
      status: "APPROVED",
    },
  });

  console.log(`Super admin ready: ${admin.email}`);

  const adminsByEmail: Record<string, { id: string }> = { [adminEmail]: admin };
  for (const contributor of Object.values(contributors)) {
    const created = await prisma.admin.upsert({
      where: { email: contributor.email },
      update: {},
      create: {
        email: contributor.email,
        name: contributor.name,
        identificationNumber: contributor.identificationNumber,
        status: "APPROVED",
        isSuperAdmin: false,
      },
    });
    adminsByEmail[contributor.email] = created;
    console.log(`Contributor ready: ${created.name} <${created.email}>`);
  }

  for (const category of categories) {
    const categoryAdmin = adminsByEmail[category.addedByEmail ?? adminEmail] ?? admin;

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
        addedById: categoryAdmin.id,
      },
    });

    for (const person of category.people) {
      const personAdmin =
        adminsByEmail[person.addedByEmail ?? category.addedByEmail ?? adminEmail] ?? admin;

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
          addedById: personAdmin.id,
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
