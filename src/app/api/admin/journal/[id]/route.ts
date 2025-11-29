import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { del } from '@vercel/blob';

// GET - Get a single journal post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.journalPost.findUnique({
      where: { id: params.id },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Fetch journal post error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT - Update a journal post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Check if the post exists
    const existingPost = await prisma.journalPost.findUnique({
      where: { id: params.id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if new slug conflicts with another post
    if (slug && slug !== existingPost.slug) {
      const slugConflict = await prisma.journalPost.findUnique({
        where: { slug },
      });
      if (slugConflict) {
        return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
      }
    }

    // Delete existing sections and recreate them
    await prisma.journalSection.deleteMany({
      where: { postId: params.id },
    });

    const post = await prisma.journalPost.update({
      where: { id: params.id },
      data: {
        slug: slug || existingPost.slug,
        title: title || existingPost.title,
        subtitle: subtitle ?? existingPost.subtitle,
        heroImage: heroImage ?? existingPost.heroImage,
        intro: intro ?? existingPost.intro,
        gallery: gallery ?? existingPost.gallery,
        conclusionTitle: conclusionTitle ?? existingPost.conclusionTitle,
        conclusionContent: conclusionContent ?? existingPost.conclusionContent,
        conclusionImage: conclusionImage ?? existingPost.conclusionImage,
        thumbnailImage: thumbnailImage ?? existingPost.thumbnailImage,
        excerpt: excerpt ?? existingPost.excerpt,
        published: published ?? existingPost.published,
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
    console.error('Update journal post error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE - Delete a journal post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const post = await prisma.journalPost.findUnique({
      where: { id: params.id },
      include: {
        sections: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Collect all blob URLs to delete
    const blobUrls: string[] = [];
    
    if (post.heroImage && post.heroImage.includes('blob.vercel-storage.com')) {
      blobUrls.push(post.heroImage);
    }
    if (post.thumbnailImage && post.thumbnailImage.includes('blob.vercel-storage.com')) {
      blobUrls.push(post.thumbnailImage);
    }
    if (post.conclusionImage && post.conclusionImage.includes('blob.vercel-storage.com')) {
      blobUrls.push(post.conclusionImage);
    }
    
    post.gallery.forEach((url) => {
      if (url.includes('blob.vercel-storage.com')) {
        blobUrls.push(url);
      }
    });
    
    post.sections.forEach((section) => {
      if (section.image && section.image.includes('blob.vercel-storage.com')) {
        blobUrls.push(section.image);
      }
    });

    // Delete blobs (don't fail if blob deletion fails)
    await Promise.allSettled(blobUrls.map((url) => del(url)));

    // Delete the post (sections will cascade delete)
    await prisma.journalPost.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete journal post error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}





