import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateMountainCategorySlug() {
  try {
    console.log('🔄 Updating mountain & cabin getaways category slug...\n');

    // Update all properties with the old slug to the new slug
    const result = await prisma.property.updateMany({
      where: {
        categorySlug: 'mountain-cabin-getaways',
      },
      data: {
        categorySlug: 'mountain-and-cabin-getaways',
      },
    });

    console.log(`✅ Successfully updated ${result.count} properties\n`);

    if (result.count === 0) {
      console.log('ℹ️  No properties found with the old slug. All properties are already up to date.\n');
    } else {
      console.log('📋 Updated properties now use the slug: mountain-and-cabin-getaways\n');
    }

  } catch (error) {
    console.error('❌ Error updating category slug:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateMountainCategorySlug();
