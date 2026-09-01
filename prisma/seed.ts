import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Admin user created')

  // Teams
  const teams = await Promise.all([
    prisma.team.upsert({
      where: { name: 'Fenerbahçe' },
      update: {},
      create: {
        name: 'Fenerbahçe',
        country: 'Türkiye',
        founded: 1907,
      },
    }),
    prisma.team.upsert({
      where: { name: 'Galatasaray' },
      update: {},
      create: {
        name: 'Galatasaray',
        country: 'Türkiye',
        founded: 1905,
      },
    }),
    prisma.team.upsert({
      where: { name: 'Beşiktaş' },
      update: {},
      create: {
        name: 'Beşiktaş',
        country: 'Türkiye',
        founded: 1903,
      },
    }),
    prisma.team.upsert({
      where: { name: 'Trabzonspor' },
      update: {},
      create: {
        name: 'Trabzonspor',
        country: 'Türkiye',
        founded: 1967,
      },
    }),
  ])
  console.log('✅ Teams created')

  // Players
  const players = await Promise.all([
    prisma.player.upsert({
      where: { id: 'player-1' },
      update: {},
      create: {
        id: 'player-1',
        name: 'Mesut Özil',
        position: 'Orta Saha',
        age: 35,
        nationality: 'Almanya',
        marketValue: 15000000n,
        currentTeamId: teams[0].id,
      },
    }),
    prisma.player.upsert({
      where: { id: 'player-2' },
      update: {},
      create: {
        id: 'player-2',
        name: 'Hakim Ziyech',
        position: 'Sağ Kanat',
        age: 31,
        nationality: 'Fas',
        marketValue: 20000000n,
        currentTeamId: teams[0].id,
      },
    }),
    prisma.player.upsert({
      where: { id: 'player-3' },
      update: {},
      create: {
        id: 'player-3',
        name: 'Kerem Aktürkoğlu',
        position: 'Sol Kanat',
        age: 26,
        nationality: 'Türkiye',
        marketValue: 35000000n,
        currentTeamId: teams[1].id,
      },
    }),
    prisma.player.upsert({
      where: { id: 'player-4' },
      update: {},
      create: {
        id: 'player-4',
        name: 'Okan Buruk',
        position: 'Defans',
        age: 28,
        nationality: 'Türkiye',
        marketValue: 25000000n,
        currentTeamId: teams[2].id,
      },
    }),
  ])
  console.log('✅ Players created')

  // Transfers
  await prisma.transfer.create({
    data: {
      playerId: players[0].id,
      fromTeamId: teams[2].id,
      toTeamId: teams[0].id,
      fee: 5000000n,
      type: 'Bonservis',
      season: '2024/2025',
      date: new Date('2024-08-15'),
    },
  })

  await prisma.transfer.create({
    data: {
      playerId: players[1].id,
      fromTeamId: teams[3].id,
      toTeamId: teams[0].id,
      fee: 8000000n,
      type: 'Bonservis',
      season: '2024/2025',
      date: new Date('2024-08-20'),
    },
  })

  console.log('✅ Transfers created')
  console.log('✅ Database seeded successfully!')
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
