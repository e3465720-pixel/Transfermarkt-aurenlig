import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const players = await prisma.player.findMany({
      include: {
        currentTeam: true,
      },
    })

    return NextResponse.json(players)
  } catch (error) {
    console.error('Error fetching players:', error)
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      position,
      age,
      nationality,
      marketValue,
      currentTeamId,
    } = body

    const player = await prisma.player.create({
      data: {
        id: uuidv4(),
        name,
        position,
        age,
        nationality,
        marketValue: BigInt(marketValue),
        currentTeamId,
      },
      include: {
        currentTeam: true,
      },
    })

    return NextResponse.json(player, { status: 201 })
  } catch (error) {
    console.error('Error creating player:', error)
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    )
  }
}
