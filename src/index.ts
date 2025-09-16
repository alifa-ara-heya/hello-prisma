import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * ==================================================================
 * Main Function
 * ==================================================================
 * This is the entry point of our script. You can comment/uncomment
 * the function calls below to run specific Prisma examples.
 */
async function main() {
  console.log('🚀 Starting Prisma examples...');

  // --- 1. CREATING DATA ---
  await seedDatabase(); // Creates initial data for other examples
  // await createUserWithRelations();

  // --- 2. READING DATA ---
  // await findUniqueUser();
  // await findAllUsers();

  // --- 3. UPDATING DATA ---
  await updateUser();
  // await updateManyUsers();
  // await updateManyAndReturnUsers(); // PREVIEW FEATURE

  console.log('✅ Prisma examples finished.');
}

// ==================================================================
// 1. CREATING DATA
// ==================================================================

/**
 * `createMany`
 * Seeds the database with some initial users and posts.
 * Use `createMany` for bulk-inserting records. It's much faster than
 * creating records one by one in a loop.
 */
async function seedDatabase() {
  console.log('\n--- Seeding Database ---');
  const users = await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@prisma.io' },
      { name: 'Bob', email: 'bob@prisma.io' },
      { name: 'Charlie', email: 'charlie@prisma.io' },
    ],
    skipDuplicates: true, // If a user with the same unique email exists, skip it
  });
  console.log(`Created ${users.count} users.`);
}

/**
 * `create`
 * Creates a single user and includes related records (a Post and a Profile)
 * in the same transaction.
 */
async function createUserWithRelations() {
  console.log('\n--- Creating a User with Relations ---');
  const user = await prisma.user.create({
    data: {
      name: 'Taimiyah',
      email: 'taimiyah@prisma.io',
      posts: {
        create: { title: 'Follow me on Twitter!' },
      },
      profile: {
        create: { bio: 'I love building things.' },
      },
    },
    include: {
      posts: true, // Include the created posts in the returned object
      profile: true, // Include the created profile
    },
  });
  console.log('Created user with relations:', user);
}

// ==================================================================
// 2. READING DATA
// ================================================================== 

/**
 * `findUnique` / `findUniqueOrThrow`
 * Finds a single record based on a unique field (e.g., id, email).
 * `findUnique` returns the record or `null` if not found.
 * `findUniqueOrThrow` returns the record or throws an error if not found.
 */
async function findUniqueUser() {
  console.log('\n--- Finding a Unique User ---');
  const user = await prisma.user.findUnique({
    where: {
      email: 'alice@prisma.io',
    },
  });
  console.log('Found unique user:', user);
}

/**
 * `findMany`
 * Retrieves all records that match a set of criteria.
 * Useful for lists, searches, and filtering.
 */
async function findAllUsers() {
  console.log('\n--- Finding All Users ---');
  const allUsers = await prisma.user.findMany({
    where: {
      email: {
        endsWith: '@prisma.io',
      },
    },
    include: {
      posts: true,
    },
  });
  console.log('Found all users:', allUsers);
}

// ==================================================================
// 3. UPDATING DATA
// ==================================================================

/**
 * `update`
 * Updates a single unique record.
 * Requires a `where` clause targeting a unique field.
 * Returns the updated record.
 */
async function updateUser() {
  console.log('\n--- Updating a Single User ---');
  const updatedUser = await prisma.user.update({
    where: {
      email: 'bob@prisma.io',
    },
    data: {
      name: 'Bobby',
    },
  });
  console.log('Updated user:', updatedUser);
}

/**
 * `updateMany`
 * Updates multiple records that match a `where` clause.
 * Returns an object with a `count` of the number of records updated.
 * It does NOT return the updated records themselves.
 */
async function updateManyUsers() {
  console.log('\n--- Updating Many Users ---');
  const result = await prisma.user.updateMany({
    where: {
      email: {
        endsWith: '@prisma.io',
      },
    },
    data: {
      name: 'Prisma User',
    },
  });
  console.log(`Updated ${result.count} users.`);

  // To see the updated records, you must fetch them in a separate query
  const updatedUsers = await prisma.user.findMany({
    where: {
      name: 'Prisma User',
    },
  });
  console.log('Fetched the updated users:', updatedUsers);
}

/**
 * `updateManyAndReturn` (PREVIEW FEATURE)
 * Updates multiple records and returns the actual updated records.
 * NOTE: This requires the `createManyAndReturn` preview feature to be enabled
 * in your `schema.prisma` and is only supported for PostgreSQL and SQLite.
 */
async function updateManyAndReturnUsers() {
  console.log('\n--- Updating Many and Returning Them (Preview) ---');
  const updatedUsers = await prisma.user.updateManyAndReturn({
    where: {
      name: 'Prisma User',
    },
    data: {
      name: 'Returned Prisma User',
    },
  });
  console.log('Updated and returned users:', updatedUsers);
  console.log(`Returned ${updatedUsers.length} records.`);
}

// ==================================================================
// RUN SCRIPT
// ==================================================================

main()
  .catch(async (e) => {
    console.error('An error occurred:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure Prisma Client is disconnected when the script finishes
    await prisma.$disconnect();
  });