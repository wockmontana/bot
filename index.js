import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } from "discord.js"
import express from "express"

// Configurarea botului
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

// Token-ul botului
const TOKEN = process.env.DISCORD_BOT_TOKEN
const CLIENT_ID = process.env.DISCORD_CLIENT_ID
const PORT = process.env.PORT || 3000

// Definirea comenzilor slash
const commands = [
  new SlashCommandBuilder().setName("salut").setDescription("Botul îți va răspunde cu un salut"),
  new SlashCommandBuilder().setName("info").setDescription("Informații despre server"),
  new SlashCommandBuilder().setName("ping").setDescription("Verifică latența botului"),
  new SlashCommandBuilder().setName("ajutor").setDescription("Lista cu toate comenzile disponibile"),
  new SlashCommandBuilder()
    .setName("random")
    .setDescription("Generează un număr aleatoriu")
    .addIntegerOption((option) => option.setName("min").setDescription("Numărul minim").setRequired(false))
    .addIntegerOption((option) => option.setName("max").setDescription("Numărul maxim").setRequired(false)),
]

// Înregistrarea comenzilor
const rest = new REST({ version: "10" }).setToken(TOKEN)

async function deployCommands() {
  try {
    console.log("🔄 Înregistrarea comenzilor slash...")
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    console.log("✅ Comenzile au fost înregistrate cu succes!")
  } catch (error) {
    console.error("❌ Eroare la înregistrarea comenzilor:", error)
  }
}

// Event când botul este gata
client.once("ready", () => {
  console.log(`🤖 Botul ${client.user.tag} este online!`)
  deployCommands()
})

// Gestionarea comenzilor slash
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction

  try {
    switch (commandName) {
      case "salut":
        await interaction.reply({
          content: `Salut, ${interaction.user.displayName}! 👋 Cum te mai simți?`,
          ephemeral: false,
        })
        break

      case "info":
        const server = interaction.guild
        const embed = {
          color: 0x0099ff,
          title: "Informații Server",
          fields: [
            {
              name: "Nume Server",
              value: server.name,
              inline: true,
            },
            {
              name: "Membri",
              value: server.memberCount.toString(),
              inline: true,
            },
            {
              name: "Creat la",
              value: server.createdAt.toLocaleDateString("ro-RO"),
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        }
        await interaction.reply({ embeds: [embed] })
        break

      case "ping":
        const ping = Date.now() - interaction.createdTimestamp
        await interaction.reply({
          content: `🏓 Pong! Latența este: ${ping}ms\nLatența API: ${Math.round(client.ws.ping)}ms`,
        })
        break

      case "ajutor":
        const helpEmbed = {
          color: 0x00ff00,
          title: "📋 Lista Comenzilor",
          description: "Iată toate comenzile disponibile:",
          fields: [
            {
              name: "/salut",
              value: "Botul îți va răspunde cu un salut prietenos",
            },
            {
              name: "/info",
              value: "Afișează informații despre server",
            },
            {
              name: "/ping",
              value: "Verifică latența botului",
            },
            {
              name: "/random",
              value: "Generează un număr aleatoriu (opțional între min și max)",
            },
            {
              name: "/ajutor",
              value: "Afișează această listă de comenzi",
            },
          ],
          footer: {
            text: "Bot hostat pe Railway 🚂",
          },
        }
        await interaction.reply({ embeds: [helpEmbed] })
        break

      case "random":
        const min = interaction.options.getInteger("min") || 1
        const max = interaction.options.getInteger("max") || 100

        if (min >= max) {
          await interaction.reply({
            content: "❌ Numărul minim trebuie să fie mai mic decât maximul!",
            ephemeral: true,
          })
          return
        }

        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        await interaction.reply({
          content: `🎲 Numărul aleatoriu între ${min} și ${max} este: **${randomNum}**`,
        })
        break

      default:
        await interaction.reply({
          content: "❌ Comandă necunoscută!",
          ephemeral: true,
        })
    }
  } catch (error) {
    console.error("❌ Eroare la executarea comenzii:", error)

    const errorMessage = {
      content: "❌ A apărut o eroare la executarea comenzii!",
      ephemeral: true,
    }

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage)
    } else {
      await interaction.reply(errorMessage)
    }
  }
})

// Gestionarea erorilor
client.on("error", (error) => {
  console.error("❌ Eroare Discord.js:", error)
})

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled promise rejection:", error)
})

// Server Express pentru Railway (să știe că aplicația rulează)
const app = express()

app.get("/", (req, res) => {
  res.json({
    status: "🤖 Discord Bot is running!",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    user: client.user?.tag || "Not logged in",
    guilds: client.guilds.cache.size,
  })
})

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    bot: client.isReady() ? "online" : "offline",
    ping: client.ws.ping,
  })
})

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`)
})

// Pornirea botului
if (TOKEN && CLIENT_ID) {
  client.login(TOKEN)
} else {
  console.error("❌ Token-ul Discord sau Client ID nu au fost găsite!")
  console.error("Setează DISCORD_BOT_TOKEN și DISCORD_CLIENT_ID în variabilele de mediu.")
}
