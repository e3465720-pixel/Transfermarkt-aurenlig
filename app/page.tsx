'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Team {
  id: string
  name: string
  country?: string
}

interface Player {
  id: string
  name: string
  position: string
  currentTeam?: Team
  marketValue: number
}

interface Transfer {
  id: string
  player: Player
  fromTeam: Team
  toTeam: Team
  fee: number
  type: string
  date: string
}

export default function Home() {
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransfers()
  }, [])

  const fetchTransfers = async () => {
    try {
      const response = await fetch('/api/transfers')
      const data = await response.json()
      setTransfers(data)
    } catch (error) {
      console.error('Error fetching transfers:', error)
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
      {/* Navigation */}
      <nav className="bg-dark/80 backdrop-blur border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient">⚽ AurenLig</div>
          <div className="flex gap-6">
            <Link href="/" className="text-white hover:text-accent transition-smooth">
              Transfer Market
            </Link>
            <Link href="/teams" className="text-white hover:text-accent transition-smooth">
              Takımlar
            </Link>
            <Link href="/admin" className="text-accent hover:text-accent/80 transition-smooth font-semibold">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">AurenLig Transfer Market</h1>
          <p className="text-xl text-gray-300 mb-8">
            En güncel futbol transferlerini takip edin
          </p>
          <Link
            href="/admin"
            className="btn-accent text-lg inline-block"
          >
            + Yeni Transfer Ekle
          </Link>
        </div>

        {/* Transfers List */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white mb-6">Son Transferler</h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-300">Yükleniyor...</p>
            </div>
          ) : transfers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300">Henüz transfer kaydı yok</p>
            </div>
          ) : (
            transfers.map((transfer) => (
              <div key={transfer.id} className="bg-white/5 backdrop-blur border border-primary/20 rounded-xl p-6 hover:bg-white/10 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {transfer.player.name}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-300">
                      <span className="badge badge-primary">
                        {transfer.player.position}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-accent font-semibold">
                          {transfer.fromTeam.name}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="text-accent font-semibold">
                          {transfer.toTeam.name}
                        </span>
                      </span>
                      <span className="badge badge-success">
                        {transfer.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {formatCurrency(transfer.fee)}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(transfer.date).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark/80 border-t border-primary/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>© 2024 AurenLig Transfer Market. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
