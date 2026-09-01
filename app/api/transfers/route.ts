import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const transfers = await prisma.transfer.findMany({
      include: {
        player: {
          include: {
            currentTeam: true,
          },
        },
        fromTeam: true,
        toTeam: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(transfers)
  } catch (error) {
    console.error('Error fetching transfers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transfers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { playerId, fromTeamId, toTeamId, fee, type, date, season, notes } = body

    const transfer = await prisma.transfer.create({
      data: {
        playerId,
        fromTeamId,
        toTeamId,
        fee: BigInt(fee),
        type,
        date: new Date(date),
        season,
        notes,
      },
      include: {
        player: true,
        fromTeam: true,
        toTeam: true,
      },
    })

    // Update player's current team
    await prisma.player.update({
      where: { id: playerId },
      data: { currentTeamId: toTeamId },
    })

    return NextResponse.json(transfer, { status: 201 })
  } catch (error) {
    console.error('Error creating transfer:', error)
    return NextResponse.json(
      { error: 'Failed to create transfer' },
      { status: 500 }
    )
  }
}
