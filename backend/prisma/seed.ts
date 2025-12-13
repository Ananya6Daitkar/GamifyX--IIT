import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Get or create default institution
  let institution = await prisma.institution.findUnique({
    where: { id: 'default-institution' },
  })

  if (!institution) {
    institution = await prisma.institution.create({
      data: {
        id: 'default-institution',
        name: 'Default Institution',
        domain: 'default.local',
      },
    })
  }

  // Create demo users
  const student = await prisma.user.create({
    data: {
      email: 'student@example.com',
      name: 'Demo Student',
      role: 'STUDENT',
      institutionId: institution.id,
    },
  })

  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@example.com',
      name: 'Demo Teacher',
      role: 'TEACHER',
      institutionId: institution.id,
    },
  })

  // Create demo student profile
  const studentProfile = await prisma.student.create({
    data: {
      userId: student.id,
      githubUsername: 'demo-student',
      githubConnected: false,
      currentPoints: 0,
      currentLevel: 1,
      currentStreak: 0,
      riskScore: 0,
      riskLevel: 'LOW',
    },
  })

  console.log('Seeding complete!')
  console.log({ institution, student, teacher, studentProfile })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
