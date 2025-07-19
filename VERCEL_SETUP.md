# 🚀 Setup Discord Bot pe Vercel

## ⚠️ Limitări importante:

Vercel **NU** este ideal pentru Discord bots din următoarele motive:
- Funcțiile serverless au timeout limitat (10s Hobby / 60s Pro)
- Nu rulează continuu 24/7
- Se oprește după inactivitate
- Costisitor pentru usage mare

## 🛠️ Cum să faci deploy:

### 1. Pregătește proiectul
\`\`\`bash
npm install
npm run build
\`\`\`

### 2. Deploy pe Vercel
- Apasă butonul "Deploy" din v0
- SAU folosește Vercel CLI:
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### 3. Setează Environment Variables în Vercel:
- `DISCORD_BOT_TOKEN` - Token-ul botului
- `DISCORD_CLIENT_ID` - ID-ul aplicației

### 4. Testează botul:
- Mergi la URL-ul Vercel
- Apasă "Verifică Status"
- Testează comenzile pe Discord

## 🔧 Cum funcționează:

1. **API Route** (`/api/discord`) - Inițializează botul
2. **Keep-Alive** (`/api/keep-alive`) - Menține botul activ
3. **Dashboard** - Interfață pentru monitorizare

## 💡 Sfaturi pentru Vercel:

### Pentru a menține botul activ:
1. Folosește un serviciu extern de ping (UptimeRobot, etc.)
2. Ping către `/api/keep-alive` la fiecare 5 minute
3. Monitorizează logs-urile în Vercel Dashboard

### Limitări de buget:
- Hobby Plan: 100GB bandwidth/lună
- Funcții: 100GB-hours/lună
- Invocări: 1M/lună

## 🎯 Recomandări:

**Pentru teste și dezvoltare**: ✅ Vercel e OK
**Pentru producție**: ❌ Folosește Railway/Render

## 🔗 Alternative recomandate:
- **Railway**: Ideal pentru Discord bots
- **Render**: 750 ore gratuite/lună
- **Fly.io**: Plan gratuit decent
