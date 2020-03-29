#!/usr/bin/env node
import dotenv from "dotenv";
import Discord from "discord.js";
import { cmdParser, registerCommands } from "./commandBootstrap";

dotenv.config({ path: "../.env" });

registerCommands().then(() => {
  const client = new Discord.Client();

  client.on("ready", () => {
    if (client.user) {
      console.log(`Logged in as ${client.user.tag}!`);
    }
  });

  client.on("message", msg => {
    if (msg.content.startsWith("!")) {
      cmdParser.parseCommand(msg);
    }
  });
  client.login(process.env.BOT_TOKEN).catch(e => console.error(e));
});
