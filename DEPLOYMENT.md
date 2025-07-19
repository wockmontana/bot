# 🚀 Cum să hostezi botul gratuit

## Opțiunea 1: Railway (Recomandat)

### Pași:
1. **Creează cont pe [Railway.app](https://railway.app)**
2. **Conectează cu GitHub**
3. **Creează un nou proiect**
4. **Selectează repository-ul cu botul**
5. **Adaugă variabilele de mediu**:
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_CLIENT_ID`
6. **Deploy automat!**

### Avantaje Railway:
- ✅ 500 ore gratuite/lună
- ✅ Rulează 24/7
- ✅ Auto-deploy la fiecare commit
- ✅ Logs în timp real

## Opțiunea 2: Render

### Pași:
1. **Mergi pe [Render.com](https://render.com)**
2. **Conectează cu GitHub**
3. **Creează "Web Service"**
4. **Setează**:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Adaugă Environment Variables**

### Avantaje Render:
- ✅ 750 ore gratuite/lună
- ✅ SSL gratuit
- ✅ Auto-deploy

## Opțiunea 3: Fly.io

### Pași:
1. **Instalează Fly CLI**
2. **Rulează**: `fly launch`
3. **Deploy**: `fly deploy`

## Opțiunea 4: Vercel (Limitat)

⚠️ **Notă**: Vercel nu e ideal pentru Discord bots care rulează continuu, dar poți încerca pentru teste.

## 💡 Sfaturi:

### Pentru Railway:
- Folosește planul gratuit (500 ore/lună)
- Botul va dormi după inactivitate
- Adaugă un "keep-alive" ping dacă e necesar

### Pentru toate platformele:
- Păstrează token-urile în Environment Variables
- Nu le pune niciodată în cod
- Folosește `.env.example` pentru referință

## 🔧 Troubleshooting:

### Dacă botul nu pornește:
1. Verifică logs-urile
2. Confirmă că token-urile sunt setate corect
3. Asigură-te că botul are permisiunile necesare

### Dacă comenzile nu funcționează:
1. Verifică că botul e invitat cu `applications.commands`
2. Așteaptă câteva minute pentru sincronizarea comenzilor
3. Încearcă să restartezi botul
