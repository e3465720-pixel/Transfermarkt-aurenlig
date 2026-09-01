# Transfermarkt Aurenlig

Aurenlig sunucusu için eğlence amaçlı bir Transfermarkt kopyası (oyuncu transfer sitesi).

## 📋 Proje Yapısı

```
Transfermarkt-aurenlig/
├── backend/              # Node.js + Express sunucusu
│   ├── server.js        # Ana sunucu dosyası
│   ├── package.json     # Bağımlılıklar
│   ├── .env.example     # Ortam değişkenleri template
│   ├── routes/          # API rotaları
│   ├── controllers/      # İş mantığı
│   ├── models/          # Veritabanı modelleri
│   └── middleware/      # Ara yazılımlar
│
├── frontend/            # React uygulaması
│   ├── package.json
│   ├── src/
│   │   ├── components/  # React bileşenleri
│   │   ├── pages/       # Sayfa bileşenleri
│   │   ├── api/         # API çağrıları
│   │   └── App.js       # Ana bileşen
│   └── public/
│
└── README.md
```

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js (v16+)
- npm veya yarn
- PostgreSQL (v12+)

### Backend Kurulumu

```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenleyin ve veritabanı bilgilerini girin
npm start
```

### Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Uygulama `http://localhost:3000` adresinde açılacaktır.

## 📝 Geliştirme

- Backend: `http://localhost:5000` (API)
- Frontend: `http://localhost:3000` (UI)

## 📚 Sonraki Adımlar

1. Backend rotaları ekleyin
2. Veritabanı şemasını oluşturun
3. React sayfalarını tasarlayın
4. API bağlantılarını yapın

## 📄 Lisans

Eğlence amaçlı proje.
