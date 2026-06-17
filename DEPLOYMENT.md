# TZEL CAFÉ — Deployment Guide

## Stack

- **Frontend**: Vue 3 + Vite (`frontend/`)
- **Backend**: Laravel 12 (`backend/`)
- **Database**: MySQL 8+

## Environment

### Backend (`backend/.env`)

Set `APP_URL`, `FRONTEND_URL`, `DB_*`, `PAYSTACK_*`, `BREVO_*`, `GROQ_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URL`, `ADMIN_NOTIFICATION_EMAIL`, `PAYSTACK_WEBHOOK_SECRET` (defaults to secret key if empty).

### Frontend (`frontend/.env`)

```
VITE_API_BASE_URL=https://api.tzelcafe.co.ke
VITE_WHATSAPP_NUMBER=254700000000
VITE_GA_ID=
```

## Build & deploy

```bash
cd backend && composer install --no-dev && php artisan migrate --force && php artisan config:cache
cd ../frontend && npm ci && npm run build
```

Serve `backend/public` via PHP-FPM/nginx. Host `frontend/dist` on static CDN or same nginx.

Run `php artisan queue:work` for queued emails.

## Webhooks

Paystack: `POST {APP_URL}/api/paystack/webhook`

## Tests

```bash
cd backend
php artisan test
php scripts/smoke-test.php
```
