import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - List all journal posts
export async function GET() {
  try {
    const posts = await prisma.journalPost.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Fetch journal posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - Create a new journal post
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      slug,
      title,
      subtitle,
      heroImage,
      intro,
      sections,
      gallery,
      conclusionTitle,
      conclusionContent,
      conclusionImage,
      thumbnailImage,
      excerpt,
      published,
    } = body;

    // Validate required fields
    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 });
    }

    // Check if slug already exists
    const existingPost = await prisma.journalPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    const post = await prisma.journalPost.create({
      data: {
        slug,
        title,
        subtitle: subtitle || '',
        heroImage: heroImage || '',
        intro: intro || '',
        gallery: gallery || [],
        conclusionTitle: conclusionTitle || '',
        conclusionContent: conclusionContent || '',
        conclusionImage: conclusionImage || '',
        thumbnailImage: thumbnailImage || '',
        excerpt: excerpt || '',
        published: published || false,
        sections: {
          create: (sections || []).map((section: { title: string; content: string; image: string; reverse: boolean }, index: number) => ({
            title: section.title,
            content: section.content,
            image: section.image || '',
            reverse: section.reverse || false,
            order: index,
          })),
        },
      },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Create journal post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}



