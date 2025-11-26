import { prisma } from '@/lib/db';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const [images, journalPosts] = await Promise.all([
    prisma.image.findMany({
      where: { isActive: true },
      orderBy: { uploadedAt: 'desc' },
    }),
    prisma.journalPost.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return <AdminDashboard images={images} journalPosts={journalPosts} />;
}
