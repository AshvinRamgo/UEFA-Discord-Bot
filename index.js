require("dotenv/config");
const { Client, EmbedBuilder } = require("discord.js");
const {
  fetchLiveMatches,
  fetchFixtures,
  fetchMostRecentMatch,
  fetchMatchEvents,
} = require("./get-data.js");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "live") {
    const liveMatchesMessage = await fetchLiveMatches();
    await interaction.reply(liveMatchesMessage);
  }

  if (interaction.commandName === "fixtures") {
    const fixturesMessage = await fetchFixtures();
    await interaction.reply(fixturesMessage);
  }

  if (interaction.commandName === "matchevents") {
    // Acknowledge the interaction immediately
    await interaction.deferReply();
    const mostRecentMatch = await fetchMostRecentMatch();
    if (mostRecentMatch) {
      const matchEventsMessage = await fetchMatchEvents(mostRecentMatch.id);
      await interaction.followUp(
        `Match: ${mostRecentMatch.home_name} vs ${mostRecentMatch.away_name}, Date: ${mostRecentMatch.date}\nHere are the match events:\n${matchEventsMessage}`
      );
    } else {
      await interaction.followUp("Could not retrieve the most recent match.");
    }
  }
});

client.login(process.env.TOKEN);
