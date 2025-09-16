# Hello Prisma

This repository demonstrates **Prisma ORM CRUD operations** with PostgreSQL using TypeScript.  
Here is a structured reference of all the main Prisma queries.

---

## **1. Create**

```ts
const user = await prisma.user.create({
  data: {
    name: "Jhankar Mahbub",
    email: "jkr@ph.com",
    profilePhoto: "https://programing-hero.com/level2/jkr.png",
  },
});
```

Inserts a single user into the database and returns the created object.

---

## **2. Create Many**

```ts
const users = await prisma.user.createMany({
  data: [
    { name: "Mir", email: "mir@ph.com" },
    { name: "Tanmoy", email: "tanmoy@ph.com" },
    { name: "Mizan", email: "mizan@ph.com" },
    { name: "Imun", email: "imun@ph.com" },
  ],
});
```

Inserts multiple users at once. Returns a count of inserted rows.

---

## **3. Find Many**

```ts
const users = await prisma.user.findMany({
  where: { email: { contains: "ph.com", mode: "insensitive" } },
  orderBy: { name: "asc" },
});
```

Retrieves multiple users as an array. Supports filtering, ordering, and case-insensitive search.

---

## **4. Find Unique**

```ts
const user = await prisma.user.findUnique({
  where: { id: 1 },
});
```

Retrieves a single user by a unique field (e.g., `id` or `email`). Returns `null` if not found.

---

## **5. Find Unique Or Throw**

```ts
const user = await prisma.user.findUniqueOrThrow({
  where: { id: 6 },
});
```

Retrieves a single user by a unique field. Throws an error if the user does not exist.

---

## **6. Update**

```ts
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: "Mezba Abedin", email: "mezba@gmail.com" },
});
```

Updates a single user and returns the updated object.

---

## **7. Update Many**

```ts
const result = await prisma.user.updateMany({
  where: { id: { gt: 2 } },
  data: {
    profilePhoto: "https://programing-hero.com/level2/default-image.png",
  },
});
```

Updates multiple users matching the filter. Returns the count of updated rows.

---

## **8. Update Many and Return**

```ts
const updateProfilePhoto = await prisma.user.updateManyAndReturn({
  where: {
    id: {
      gt: 2,
    },
  },
  data: {
    profilePhoto: "https://programing-hero.com/level2/default-image.png",
  },
});
```

---

## **9. Delete**

```ts
const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});
```

Deletes a single user by unique field and returns the deleted object.

---

## **10. Delete Many**

```ts
const result = await prisma.user.deleteMany({
  where: { id: { lt: 3 } },
});
```

Deletes multiple users matching the filter. Returns the count of deleted rows.

---

## **11. Order By**

```ts
const users = await prisma.user.findMany({
  orderBy: { createdAt: "desc" },
});
```

Sorts the results based on a field in ascending (`asc`) or descending (`desc`) order.

---

## **12. Contains (with case-insensitive mode)**

```ts
const users = await prisma.user.findMany({
  where: {
    name: { contains: "john", mode: "insensitive" },
  },
});
```

Performs a substring search in a string field with optional case-insensitivity.

---

> This guide follows the exact order of Prisma queries used in the `hello-prisma` repository, making it easy to understand and practice CRUD operations with PostgreSQL.

---

### **Documentations**

- [Prisma Official Website](https://www.prisma.io/)
- [Prisma Setup Guide (TypeScript + PostgreSQL)](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
- [Prisma Client CRUD Queries](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
