# 🚂 Ghid Railway Deployment

## Pas cu Pas:

### 1. 📝 Creează cont Railway
- Mergi pe [railway.app](https://railway.app)
- Apasă "Start a New Project"
- Conectează cu GitHub

### 2. 📁 Pune codul pe GitHub
- Creează un repository nou pe GitHub
- Fă push la codul botului

### 3. 🚀 Deploy pe Railway
- În Railway, apasă "Deploy from GitHub repo"
- Selectează repository-ul cu botul
- Railway va detecta automat că e o aplicație Node.js

### 4. ⚙️ Setează Environment Variables
În Railway dashboard:
- Mergi la tab-ul "Variables"
- Adaugă:
  - `DISCORD_BOT_TOKEN` = token-ul botului tău
  - `DISCORD_CLIENT_ID` = client ID-ul aplicației

### 5. ✅ Verifică deployment
- Așteaptă să se termine build-ul
- Verifică logs-urile în tab-ul "Deployments"
- Botul ar trebui să fie online!

## 💰 Costuri Railway:
- **Starter Plan**: $5/lună (recomandat)
- **Trial**: $5 credit gratuit pentru început
- **Usage-based**: Plătești doar ce folosești

## 🔧 Troubleshooting:

### Dacă botul nu pornește:
1. Verifică logs-urile în Railway
2. Asigură-te că variabilele sunt setate corect
3. Verifică că token-ul Discord e valid

### Dacă comenzile nu funcționează:
1. Așteaptă 1-2 minute pentru sincronizare
2. Verifică că botul e invitat cu permisiunile corecte
3. Testează cu `/ping` primul

## 🎯 Avantaje Railway:
- ✅ Rulează 24/7
- ✅ Auto-deploy la fiecare commit
- ✅ Logs în timp real
- ✅ Scaling automat
- ✅ SSL gratuit
