import { prisma } from '@/lib/db';
import { cache } from 'react';

export interface CMSImage {
  url: string;
  altText: string;
}

export const getCMSImage = cache(async (sectionId: string): Promise<CMSImage | null> => {
  try {
    const image = await prisma.image.findFirst({
      where: {
        sectionId,
        isActive: true,
      },
      orderBy: {
        uploadedAt: 'desc',
      },
    });

    if (!image) return null;

    return {
      url: image.url,
      altText: image.altText || '',
    };
  } catch (error) {
    console.error(`Failed to fetch CMS image for ${sectionId}:`, error);
    return null;
  }
});
