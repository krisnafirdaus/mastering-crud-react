# Movie React Next - Monorepo

A monorepo project with separate backend (Laravel) and frontend (Next.js) applications.

## 📁 Project Structure

```
movie-react-next/
├── backend/              # Laravel backend API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── composer.json
│   ├── .env
│   └── ...
├── frontend/             # Next.js frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend runs on [http://localhost:8000](http://localhost:8000).

## 📘 Documentation

- **Frontend**: See [frontend/README.md](frontend/README.md) for Next.js specific instructions
- **Backend**: See [backend/README.md](backend/README.md) for Laravel specific instructions
