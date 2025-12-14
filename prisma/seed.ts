import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Hash passwords using better-auth's password utility
  const hashedPassword = await hashPassword("password123");

  // Check if users already exist
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@nutriwell.com" },
  });
  const existingPatient = await prisma.user.findUnique({
    where: { email: "patient@nutriwell.com" },
  });

  // Create Admin User
  let adminUser;
  if (existingAdmin) {
    // Update existing user
    adminUser = await prisma.user.update({
      where: { email: "admin@nutriwell.com" },
      data: { role: "admin" },
    });
    // Update password if account exists
    const account = await prisma.account.findFirst({
      where: {
        userId: adminUser.id,
        providerId: "credential",
      },
    });
    if (account) {
      await prisma.account.update({
        where: { id: account.id },
        data: { password: hashedPassword },
      });
    } else {
      await prisma.account.create({
        data: {
          userId: adminUser.id,
          accountId: "admin@nutriwell.com",
          providerId: "credential",
          password: hashedPassword,
        },
      });
    }
  } else {
    // Create new user
    adminUser = await prisma.user.create({
      data: {
        email: "admin@nutriwell.com",
        emailVerified: true,
        name: "Admin User",
        role: "admin",
        accounts: {
          create: {
            accountId: "admin@nutriwell.com",
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
    });
  }

  console.log(
    "✅ Created/updated admin user:",
    adminUser.email,
    `(Role: ${adminUser.role})`
  );

  // Create Patient User
  let patientUser;
  if (existingPatient) {
    // Update existing user
    patientUser = await prisma.user.update({
      where: { email: "patient@nutriwell.com" },
      data: { role: "patient" },
    });
    // Update password if account exists
    const account = await prisma.account.findFirst({
      where: {
        userId: patientUser.id,
        providerId: "credential",
      },
    });
    if (account) {
      await prisma.account.update({
        where: { id: account.id },
        data: { password: hashedPassword },
      });
    } else {
      await prisma.account.create({
        data: {
          userId: patientUser.id,
          accountId: "patient@nutriwell.com",
          providerId: "credential",
          password: hashedPassword,
        },
      });
    }
  } else {
    // Create new user
    patientUser = await prisma.user.create({
      data: {
        email: "patient@nutriwell.com",
        emailVerified: true,
        name: "Patient User",
        role: "patient",
        accounts: {
          create: {
            accountId: "patient@nutriwell.com",
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
    });
  }

  console.log(
    "✅ Created/updated patient user:",
    patientUser.email,
    `(Role: ${patientUser.role})`
  );

  console.log("\n📝 Login credentials:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👤 Admin User:");
  console.log("   Email:    admin@nutriwell.com");
  console.log("   Password: password123");
  console.log("   Role:     admin");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👤 Patient User:");
  console.log("   Email:    patient@nutriwell.com");
  console.log("   Password: password123");
  console.log("   Role:     patient");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n✨ Seed completed! You can now use these credentials to log in.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
