import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Data from the original journal.ts file
const journalPosts = [
  {
    slug: "amboseli-at-dawn",
    title: "Amboseli at Dawn",
    subtitle: "The Soul of the Savannah",
    heroImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=90",
    thumbnailImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    excerpt: "A quiet morning wrapped in golden light, wandering elephants, and the timeless rhythm of the plains.",
    intro: "As sunrise spills gently across the vast plains of Amboseli, the savannah comes alive in a soft golden glow. Silhouettes of wandering elephants move gracefully under the shadow of Kilimanjaro a quiet dance between light, land, and the unwavering rhythm of nature.",
    sections: [
      {
        title: "Where Silence Speaks",
        content: "At dawn, Amboseli breathes. The air is still, broken only by distant calls of birds awakening with the sun. Every moment feels intentional an invitation to pause, observe, and connect with the pulse of the wild.",
        image: "https://i.ibb.co/FbcX2q7G/IMG-0821.jpg",
        reverse: false
      },
      {
        title: "The Path of the Elephants",
        content: "Amboseli's elephants iconic, gentle, wise move slowly across the glowing landscape. Their steps are steady, reminding us that nature carries its own time. Nothing is rushed. Everything has a rhythm.",
        image: "https://i.ibb.co/4ZyFWdrT/IMG-0144.jpg",
        reverse: true
      }
    ],
    gallery: [
      "https://i.ibb.co/WWKRV1rW/IMG-0747.jpg",
      "https://i.ibb.co/s8X0dcg/IMG-0798.jpg",
      "https://i.ibb.co/d04Lmy7K/IMG-0892.jpg"
    ],
    conclusionTitle: "A Meditation on Stillness",
    conclusionContent: "There is a calm in Amboseli that lingers long after you leave. It's in the warmth of the morning sun, the gentle sway of acacias, and the quiet harmony between every living thing on the plains. This is not just a destination it is a return to yourself.",
    conclusionImage: "https://i.ibb.co/sv3xt3bf/IMG-0009.jpg",
    published: true
  },
  {
    slug: "designing-perfect-beach-retreat",
    title: "Zanzibar by the Sea",
    subtitle: "A Symphony of Waves",
    heroImage: "https://i.ibb.co/RpnRMML3/IMG-4354.jpg",
    thumbnailImage: "https://i.ibb.co/RpnRMML3/IMG-4354.jpg",
    excerpt: "From location choice to intention setting, here's how we shape meaningful travel experiences.",
    intro: "As sunrise touches the turquoise waters of Zanzibar, the coastline glows with gentle light. Wooden dhows drift across the horizon while palm shadows dance quietly on the sand a peaceful rhythm shaped by the sea.",
    sections: [
      {
        title: "Where the Ocean Whispers",
        content: "At dawn, Zanzibar feels still yet alive. The air carries the scent of salt and morning breeze. Every moment invites you to slow down to breathe in the calm and let the sea remind you of simplicity.",
        image: "https://i.ibb.co/My32QYZY/IMG-4312.jpg",
        reverse: false
      },
      {
        title: "The Rhythm of the Tides",
        content: "The tides move gently, shaping the shoreline in their own unhurried way. Fishermen guide their boats with familiarity, following a rhythm passed down for generations a reminder that the ocean sets its own pace.",
        image: "https://i.ibb.co/vx9Bpk4g/IMG-4296.jpg",
        reverse: true
      }
    ],
    gallery: [
      "https://i.ibb.co/ksz5ZFvT/IMG-4377.jpg",
      "https://i.ibb.co/BHh025Hz/IMG-4279.jpg",
      "https://i.ibb.co/kgsCss0P/8cf9612a-59a7-4ace-9d86-deb97205e84f.jpg"
    ],
    conclusionTitle: "A Meditation by the Shore",
    conclusionContent: "Zanzibar carries a stillness that lingers long after you leave. It's in the warm breeze, the gentle roll of waves, and the effortless harmony between sky and sea. This is not just an island it is a feeling you return to.",
    conclusionImage: "https://i.ibb.co/cc85JsnD/IMG-4232.jpg",
    published: true
  },
  {
    slug: "guide-to-cape-town",
    title: "Cape Town at Dawn",
    subtitle: "Where Ocean Meets Mountain",
    heroImage: "https://i.ibb.co/LHbd1r0/IMG-8249-1.jpg",
    thumbnailImage: "https://i.ibb.co/LHbd1r0/IMG-8249-1.jpg",
    excerpt: "Curated retreats for travelers seeking quiet luxury, intimate stays, and unforgettable hideaways.",
    intro: "As first light spills across Cape Town, the city softens. The Atlantic breathes against the shore in slow, steady rhythms, and the silhouette of Table Mountain holds the sky with quiet grace. Morning arrives not with haste, but with a gentle invitation to pause, to feel, to simply be.",
    sections: [
      {
        title: "Where Stillness Has a Pulse",
        content: "Dawn along Cape Town's coastline is a quiet symphony gentle winds tracing the air, waves humming their ancient rhythm, and soft light brushing the city awake. In these early hours, stillness is not silence it is a pulse felt in the bones.",
        image: "https://i.ibb.co/RTTXt9Kn/IMG-8297.jpg",
        reverse: false
      },
      {
        title: "The Mountain's Gentle Watch",
        content: "Beneath the vast shadow of Table Mountain, the city unfolds slowly pathways lined with fynbos, cliffs warmed by the rising sun, and the endless cadence of the sea below. Here, nature holds the stories of the day before it begins.",
        image: "https://i.ibb.co/1tGtzwmc/IMG-8361.jpg",
        reverse: true
      }
    ],
    gallery: [
      "https://i.ibb.co/wZ1bpmqR/IMG-8372.jpg",
      "https://i.ibb.co/JRK3pxbc/IMG-8102.jpg",
      "https://i.ibb.co/Fq8rchh0/IMG-7550.jpg"
    ],
    conclusionTitle: "A Quiet Conversation with Light",
    conclusionContent: "Cape Town teaches a slower rhythm one shaped by tides, winds, and shifting skies. In the early calm, you feel it: a gentle grounding, a soft reminder that beauty often whispers long before it calls your name. This place is more than a landscape. It is a breath, a pause, a beginning.",
    conclusionImage: "https://i.ibb.co/HT5WdscB/IMG-7680-1.jpg",
    published: true
  }
];

async function main() {
  console.log('Starting seed...');

  for (const postData of journalPosts) {
    const { sections, ...post } = postData;

    // Check if post already exists
    const existing = await prisma.journalPost.findUnique({
      where: { slug: post.slug },
    });

    if (existing) {
      console.log(`Post "${post.slug}" already exists, skipping...`);
      continue;
    }

    // Create the post with sections
    await prisma.journalPost.create({
      data: {
        ...post,
        sections: {
          create: sections.map((section, index) => ({
            title: section.title,
            content: section.content,
            image: section.image,
            reverse: section.reverse,
            order: index,
          })),
        },
      },
    });

    console.log(`Created post: ${post.title}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

