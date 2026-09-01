# ⚽ AurenLig Transfer Market

AurenLig Discord sunucusu için oluşturulan, modern ve profesyonel bir futbol transfer piyasası web uygulaması.

## 🎯 Özellikler

### Ana Sayfa
- AurenLig logosu ve branding
- Transfer arama alanı
- Son transferler listesi
- En yüksek bonservisli transferler
- En değerli oyuncular
- Takımlara göre transferler

### Transferler
- Tablo şeklinde transfer listeleri
- Oyuncu fotoğrafı ve detayları
- Eski/Yeni takım logoları
- Transfer ücreti ve tarihi
- Transfer türü (Bonservis, Bedelsiz, Kiralık, Serbest)
- Arama ve filtreleme

### Oyuncu Profilleri
- Profil fotoğrafı
- Detaylı oyuncu bilgileri
- Mevcut takımı ve pozisyonu
- Piyasa değeri
- Kariyer transfer geçmişi
- Eski takımlar

### Takım Sayfaları
- Takım logosu ve bilgileri
- Kadro listesi
- Gelen/Giden transferler
- Transfer istatistikleri
- Toplam harcama/gelir

### Admin Paneli
- Oyuncu yönetimi
- Takım yönetimi
- Transfer yönetimi
- Fotoğraf/Logo yüklemesi
- Piyasa değeri ayarlaması
- Güvenli giriş sistemi

## 🛠️ Teknoloji Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Veritabanı:** PostgreSQL
- **ORM:** Prisma
- **Dosya Yükleme:** Multer
- **Kimlik Doğrulama:** NextAuth.js
- **Stil:** Tailwind CSS + Custom CSS

## 📋 Proje Yapısı

```
transfermarkt-aurenlig/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── players/
│   │   ├── teams/
│   │   ├── transfers/
│   │   └── upload/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── players/
│   │   ├── teams/
│   │   └── transfers/
│   ├── players/
│   ├── teams/
│   ├── transfers/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── TransferCard.tsx
│   ├── PlayerCard.tsx
│   ├── TeamCard.tsx
│   └── Search.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── logos/
│   ├── players/
│   └── teams/
├── styles/
│   └── globals.css
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── prisma.ts
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL 12+
- npm/yarn

### Adım Adım Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/e3465720-pixel/Transfermarkt-aurenlig.git
cd Transfermarkt-aurenlig

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenlerini ayarlayın
cp .env.example .env.local

# Veritabanı şemasını oluşturun
npx prisma migrate dev --name init

# Demo verilerini ekleyin
npx prisma db seed

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama `http://localhost:3000` adresinde açılacaktır.

### Ortam Değişkenleri

```
DATABASE_URL=postgresql://user:password@localhost:5432/aurenlig
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## 👥 Varsayılan Admin Bilgileri

- **Kullanıcı Adı:** admin
- **Şifre:** admin123

*Üretim ortamında değiştirin!*

## 📊 API Endpoints

### Oyuncular
- `GET /api/players` - Tüm oyuncuları listele
- `GET /api/players/[id]` - Oyuncu detayları
- `POST /api/players` - Oyuncu ekle (Admin)
- `PUT /api/players/[id]` - Oyuncu güncelle (Admin)
- `DELETE /api/players/[id]` - Oyuncu sil (Admin)

### Takımlar
- `GET /api/teams` - Tüm takımları listele
- `GET /api/teams/[id]` - Takım detayları
- `POST /api/teams` - Takım ekle (Admin)
- `PUT /api/teams/[id]` - Takım güncelle (Admin)
- `DELETE /api/teams/[id]` - Takım sil (Admin)

### Transferler
- `GET /api/transfers` - Tüm transferleri listele
- `GET /api/transfers/[id]` - Transfer detayları
- `POST /api/transfers` - Transfer ekle (Admin)
- `PUT /api/transfers/[id]` - Transfer güncelle (Admin)
- `DELETE /api/transfers/[id]` - Transfer sil (Admin)

## 🎨 Tasarım Rehberi

- **Ana Renkler:** Lacivert (#1e3a8a), Beyaz (#ffffff), Gri (#6b7280)
- **Vurgu Rengi:** Altın (#fbbf24)
- **Responsive Kütüphanesi:** Tailwind CSS
- **Font:** Inter, sans-serif

## 📝 Lisans

Eğlence amaçlı proje. AurenLig Discord sunucusu için oluşturulmuştur.

## 🤝 Katkıda Bulunma

Sorunları ve geliştirme önerilerinizi GitHub Issues kısmında paylaşın.
