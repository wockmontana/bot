FROM node:18-alpine

WORKDIR /app

# Copiază package.json și package-lock.json
COPY package*.json ./

# Instalează dependențele
RUN npm ci --only=production

# Copiază restul codului
COPY . .

# Expune portul
EXPOSE 3000

# Pornește aplicația
CMD ["npm", "start"]
