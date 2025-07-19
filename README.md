# Bot Discord Românesc 🤖

Un bot de Discord simplu cu comenzi în limba română.

## Comenzi Disponibile

- `/salut` - Botul îți va răspunde cu un salut prietenos
- `/info` - Afișează informații despre server
- `/ping` - Verifică latența botului
- `/random` - Generează un număr aleatoriu (opțional între min și max)
- `/ajutor` - Lista cu toate comenzile disponibile

## Configurare

### 1. Creează un bot pe Discord Developer Portal

1. Mergi la [Discord Developer Portal](https://discord.com/developers/applications)
2. Creează o nouă aplicație
3. Mergi la secțiunea "Bot"
4. Creează un bot și copiază token-ul
5. Activează "Message Content Intent" dacă este necesar

### 2. Invită botul pe server

1. Mergi la secțiunea "OAuth2" > "URL Generator"
2. Selectează:
   - **Scopes**: `bot`, `applications.commands`
   - **Bot Permissions**: 
     - Send Messages
     - Use Slash Commands
     - Read Message History
     - Embed Links
3. Copiază URL-ul generat și deschide-l pentru a invita botul

### 3. Configurează variabilele de mediu

Creează un fișier `.env` în directorul proiectului:

\`\`\`env
DISCORD_BOT_TOKEN=token_botului_tau_aici
DISCORD_CLIENT_ID=client_id_aplicatiei_tale
\`\`\`

### 4. Instalează dependențele și pornește botul

\`\`\`bash
npm install
npm start
\`\`\`

## Funcționalități

- ✅ Comenzi slash moderne
- ✅ Răspunsuri în română
- ✅ Gestionarea erorilor
- ✅ Embeds frumoase
- ✅ Comenzi interactive
- ✅ Informații despre server
- ✅ Generator de numere aleatoare

## Dezvoltare

Pentru a rula botul în modul dezvoltare cu auto-restart:

\`\`\`bash
npm run dev
\`\`\`

## Notițe

- Botul folosește Discord.js v14
- Toate comenzile sunt slash commands
- Mesajele sunt în limba română
- Codul include gestionarea erorilor
