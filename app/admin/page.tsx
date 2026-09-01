'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Team {
  id: string
  name: string
  country?: string
}

interface Player {
  id: string
  name: string
  position: string
  age: number
  nationality: string
  marketValue: number
  currentTeamId?: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [activeTab, setActiveTab] = useState('transfer')
  const [loading, setLoading] = useState(false)

  const [transferForm, setTransferForm] = useState({
    playerId: '',
    fromTeamId: '',
    toTeamId: '',
    fee: '',
    type: 'Bonservis',
    date: new Date().toISOString().split('T')[0],
    season: '2024/2025',
  })

  const [playerForm, setPlayerForm] = useState({
    name: '',
    position: '',
    age: '',
    nationality: '',
    marketValue: '',
    currentTeamId: '',
  })

  const [teamForm, setTeamForm] = useState({
    name: '',
    country: '',
    founded: '',
  })

  useEffect(() => {
    fetchTeamsAndPlayers()
  }, [])

  const fetchTeamsAndPlayers = async () => {
    try {
      const [teamsRes, playersRes] = await Promise.all([
        fetch('/api/teams'),
        fetch('/api/players'),
      ])
      setTeams(await teamsRes.json())
      setPlayers(await playersRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...transferForm,
          fee: parseInt(transferForm.fee),
        }),
      })
      if (response.ok) {
        alert('Transfer başarıyla eklendi!')
        setTransferForm({
          playerId: '',
          fromTeamId: '',
          toTeamId: '',
          fee: '',
          type: 'Bonservis',
          date: new Date().toISOString().split('T')[0],
          season: '2024/2025',
        })
        router.refresh()
      }
    } catch (error) {
      alert('Hata: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...playerForm,
          age: parseInt(playerForm.age),
          marketValue: parseInt(playerForm.marketValue),
        }),
      })
      if (response.ok) {
        alert('Oyuncu başarıyla eklendi!')
        setPlayerForm({
          name: '',
          position: '',
          age: '',
          nationality: '',
          marketValue: '',
          currentTeamId: '',
        })
        fetchTeamsAndPlayers()
      }
    } catch (error) {
      alert('Hata: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...teamForm,
          founded: parseInt(teamForm.founded),
        }),
      })
      if (response.ok) {
        alert('Takım başarıyla eklendi!')
        setTeamForm({ name: '', country: '', founded: '' })
        fetchTeamsAndPlayers()
      }
    } catch (error) {
      alert('Hata: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary to-dark">
      <nav className="bg-dark/80 backdrop-blur border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient">⚽ AurenLig Admin</div>
          <a href="/" className="text-white hover:text-accent transition-smooth">
            ← Ana Sayfa
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('transfer')}
            className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
              activeTab === 'transfer'
                ? 'bg-accent text-dark'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Transfer Ekle
          </button>
          <button
            onClick={() => setActiveTab('player')}
            className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
              activeTab === 'player'
                ? 'bg-accent text-dark'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Oyuncu Ekle
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
              activeTab === 'team'
                ? 'bg-accent text-dark'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Takım Ekle
          </button>
        </div>

        {activeTab === 'transfer' && (
          <div className="bg-white/5 backdrop-blur border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Yeni Transfer Ekle</h2>
            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Oyuncu</label>
                  <select
                    value={transferForm.playerId}
                    onChange={(e) => setTransferForm({ ...transferForm, playerId: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Seçin...</option>
                    {players.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Eski Takım</label>
                  <select
                    value={transferForm.fromTeamId}
                    onChange={(e) => setTransferForm({ ...transferForm, fromTeamId: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Seçin...</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Yeni Takım</label>
                  <select
                    value={transferForm.toTeamId}
                    onChange={(e) => setTransferForm({ ...transferForm, toTeamId: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Seçin...</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Bonservis Ücreti (€)</label>
                  <input
                    type="number"
                    value={transferForm.fee}
                    onChange={(e) => setTransferForm({ ...transferForm, fee: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white mb-2">Taşınma Türü</label>
                  <select
                    value={transferForm.type}
                    onChange={(e) => setTransferForm({ ...transferForm, type: e.target.value })}
                    className="input"
                  >
                    <option>Bonservis</option>
                    <option>Kiralama</option>
                    <option>Serbest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Tarih</label>
                  <input
                    type="date"
                    value={transferForm.date}
                    onChange={(e) => setTransferForm({ ...transferForm, date: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Sezon</label>
                  <input
                    type="text"
                    value={transferForm.season}
                    onChange={(e) => setTransferForm({ ...transferForm, season: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full text-lg"
              >
                {loading ? 'Ekleniyor...' : 'Transfer Ekle'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'player' && (
          <div className="bg-white/5 backdrop-blur border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Yeni Oyuncu Ekle</h2>
            <form onSubmit={handlePlayerSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Oyuncu Adı</label>
                  <input
                    type="text"
                    value={playerForm.name}
                    onChange={(e) => setPlayerForm({ ...playerForm, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Pozisyon</label>
                  <input
                    type="text"
                    value={playerForm.position}
                    onChange={(e) => setPlayerForm({ ...playerForm, position: e.target.value })}
                    className="input"
                    placeholder="Örn: Forvet"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Yaş</label>
                  <input
                    type="number"
                    value={playerForm.age}
                    onChange={(e) => setPlayerForm({ ...playerForm, age: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Uyruk</label>
                  <input
                    type="text"
                    value={playerForm.nationality}
                    onChange={(e) => setPlayerForm({ ...playerForm, nationality: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Pazar Değeri (€)</label>
                  <input
                    type="number"
                    value={playerForm.marketValue}
                    onChange={(e) => setPlayerForm({ ...playerForm, marketValue: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Takım</label>
                  <select
                    value={playerForm.currentTeamId}
                    onChange={(e) => setPlayerForm({ ...playerForm, currentTeamId: e.target.value })}
                    className="input"
                  >
                    <option value="">Seçin...</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full text-lg"
              >
                {loading ? 'Ekleniyor...' : 'Oyuncu Ekle'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white/5 backdrop-blur border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Yeni Takım Ekle</h2>
            <form onSubmit={handleTeamSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white mb-2">Takım Adı</label>
                  <input
                    type="text"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Ülke</label>
                  <input
                    type="text"
                    value={teamForm.country}
                    onChange={(e) => setTeamForm({ ...teamForm, country: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Kuruluş Yılı</label>
                  <input
                    type="number"
                    value={teamForm.founded}
                    onChange={(e) => setTeamForm({ ...teamForm, founded: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full text-lg"
              >
                {loading ? 'Ekleniyor...' : 'Takım Ekle'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
