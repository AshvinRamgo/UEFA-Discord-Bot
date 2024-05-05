require("dotenv").config();
const { REST, Routes, DataResolver } = require("discord.js");

const commands = [
  {
    name: "live",
    description: "Sends the live score of an ongoing UEFA match.",
  },
  {
    name: "fixtures",
    description: "Displays the upcoming matches and dates",
  },
  {
    name: "matchevents",
    description: "Displays the Events of the latest Match.",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering Slash Commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash Commands were registered...");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
