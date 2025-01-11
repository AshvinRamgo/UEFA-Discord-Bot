# UEFA Discord Bot

## Description
Introducing the UEFA Discord Bot programmed in JavaScript using the Discord.js library. This bot is your companion for staying updated on the 2023-2024 UEFA League, right within your Discord server. With seamless integration and intuitive slash commands, this bot brings the excitement of live matches, upcoming fixtures, and detailed match events directly to your fingertips. Once the bot is running and connected to your Discord server, you can use the following commands:

## Commands
- **/live:** Sends the live score of an ongoing match.
- **/fixtures:** Displays the upcoming matches and dates.
- **/matchevents:** Displays the events of the latest match.

## Notes
- The API used was obtained from: [Live Score API](https://live-score-api.com)
- The `API_KEY` and `API_SECRET` are unique to each user and expire after 15 days. Hence, signing in and renewal is required to obtain another key. If the key is expired, its working implementation can be seen in the video uploaded (see below).

## Files
- **index.js:** Contains the main function.
- **register-commands.js:** Registers the slash commands for the Discord bot.
- **get-data.js:** Utilizes APIs in order to obtain the required information.

## Requirements
- **Node.js:** v14.0 or later
- **Discord.js:** v13.0 or later

## Code in Action: <br>

https://github.com/AshvinRamgo/UEFA-Discord-Bot/assets/140780543/6b65ff87-1a80-4f91-a3b9-6c7e09eb3943

