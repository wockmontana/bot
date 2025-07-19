import { type NextRequest, NextResponse } from "next/server"
import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } from "discord.js"

// Configurarea botului
let client: Client | null = null

const TOKEN = process.env.DISCORD_BOT_TOKEN
const CLIENT_ID = process.env.DISCORD_CLIENT_ID

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

async function initializeBot() {
  if (client) return client

  client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  })

  // Înregistrarea comenzilor
  const rest = new REST({ version: "10" }).setToken(TOKEN!)

  try {
    console.log("Înregistrarea comenzilor slash...")
    await rest.put(Routes.applicationCommands(CLIENT_ID!), { body: commands })
    console.log("Comenzile au fost înregistrate cu succes!")
  } catch (error) {
    console.error("Eroare la înregistrarea comenzilor:", error)
  }

  // Event când botul este gata
  client.once("ready", () => {
    console.log(`Botul ${client!.user!.tag} este online!`)
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
                value: server!.name,
                inline: true,
              },
              {
                name: "Membri",
                value: server!.memberCount.toString(),
                inline: true,
              },
              {
                name: "Creat la",
                value: server!.createdAt.toLocaleDateString("ro-RO"),
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
            content: `🏓 Pong! Latența este: ${ping}ms\nLatența API: ${Math.round(client!.ws.ping)}ms`,
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
              text: "Bot creat cu Discord.js pe Vercel",
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
      console.error("Eroare la executarea comenzii:", error)

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
    console.error("Eroare Discord.js:", error)
  })

  // Login
  if (TOKEN) {
    await client.login(TOKEN)
  } else {
    throw new Error("❌ Token-ul Discord nu a fost găsit!")
  }

  return client
}

export async function GET(request: NextRequest) {
  try {
    if (!TOKEN || !CLIENT_ID) {
      return NextResponse.json({ error: "Variabilele de mediu lipsesc" }, { status: 500 })
    }

    await initializeBot()

    return NextResponse.json({
      status: "Bot online! 🤖",
      user: client?.user?.tag || "Unknown",
      guilds: client?.guilds.cache.size || 0,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Eroare la inițializarea botului:", error)
    return NextResponse.json({ error: "Eroare la pornirea botului" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.action === "restart") {
      if (client) {
        client.destroy()
        client = null
      }
      await initializeBot()
      return NextResponse.json({ message: "Bot restartat cu succes!" })
    }

    return NextResponse.json({ error: "Acțiune necunoscută" }, { status: 400 })
  } catch (error) {
    console.error("Eroare la procesarea cererii POST:", error)
    return NextResponse.json({ error: "Eroare la procesarea cererii" }, { status: 500 })
  }
}
