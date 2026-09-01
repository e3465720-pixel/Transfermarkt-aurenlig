'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Team {
  id: string
  name: string
  country?: string
  founded?: number
  players?: Player[]
}

interface Player {
  id: string
  name: string
  position: string
  age: number
  marketValue: number
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams')
      const data = await response.json()
      setTeams(data)
    } catch (error) {
      console.error('Error fetching teams:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`
    }
    return `€${(value / 1000).toFixed(0)}K`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary to-dark">
      <nav className="bg-dark/80 backdrop-blur border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient">⚽ AurenLig</div>
          <div className="flex gap-6">
            <Link href="/" className="text-white hover:text-accent transition-smooth">
              Transfer Market
            </Link>
            <Link href="/teams" className="text-accent font-semibold">
              Takımlar
            </Link>
            <Link href="/admin" className="text-white hover:text-accent transition-smooth">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">AurenLig Takımları</h1>
          <p className="text-xl text-gray-300">
            Tüm takımları ve oyuncu kadrolarını görüntüleyin
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-300">Yükleniyor...</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300">Henüz takım kaydı yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div key={team.id} className="bg-white/5 backdrop-blur border border-primary/20 rounded-xl overflow-hidden hover:bg-white/10 transition-smooth">
                <div className="p-6 border-b border-primary/20">
                  <h2 className="text-2xl font-bold text-white mb-2">{team.name}</h2>
                  <div className="flex gap-4 text-sm text-gray-300">
                    {team.country && <span>🌍 {team.country}</span>}
                    {team.founded && <span>📅 {team.founded}</span>}
                  </div>
                </div>

                {team.players && team.players.length > 0 && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Oyuncu Kadrosu</h3>
                    <div className="space-y-3">
                      {team.players.map((player) => (
                        <div
                          key={player.id}
                          className="flex justify-between items-start p-3 bg-white/5 rounded-lg"
                        >
                          <div>
                            <p className="text-white font-semibold">{player.name}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="badge badge-primary text-xs">
                                {player.position}
                              </span>
                              <span className="badge badge-success text-xs">
                                {player.age} yaş
                              </span>
                            </div>
                          </div>
                          <p className="text-accent font-semibold text-right">
                            {formatCurrency(player.marketValue)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-dark/80 border-t border-primary/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>© 2024 AurenLig Transfer Market. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
