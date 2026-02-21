import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma";

async function main() {
  const email = "admin@kyanjajuniorschool.edu";
  const password = "Admin@123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      name: "KJS Admin",
      passwordHash,
      role: "ADMIN"
    }
  });

  console.log(`Seeded admin user: ${email}`);
  console.log(`Temporary password: ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
