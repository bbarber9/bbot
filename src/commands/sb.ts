import { promises as fs } from "fs";
import path from "path";
import { Command } from "../../types";
import { VoiceConnection } from "discord.js";
import { constants } from "../utils";
export const sb: Command = {
  description: "Plays a sound from the soundboard",
  example: "!sb <sound-name> <optional-volume 1-100>",
  action: function({ message, parserCtx, updateContext }) {
    const playSoundBite = (connection: VoiceConnection, soundName: string) => {
      const filepath = path.join(constants.sbPath, soundName);
      let volume = 50;
      if (args.length > 1) {
        volume = parseFloat(args[1]);
        if (volume > 100) {
          volume = 100;
        }
      }
      console.info("volume is ", volume);
      const dispatcher = connection.play(filepath, { volume: volume / 100 });
      dispatcher.on("finish", () => {
        connection.channel.leave();
        updateContext({ connection: undefined });
      });
    };
    const args = message.content
      .substring(1)
      .split(" ")
      .slice(1);
    if (!message.guild) return;
    if (args.length === 0) {
      message.reply("Give me a sound to play!");
      return;
    }
    fs.readdir(constants.sbPath)
      .then(files => {
        const soundFileName = files.find(file => file.indexOf(args[0]) > -1);
        console.info("File I found is ", soundFileName);
        if (!soundFileName) {
          message.reply("I couldn't not find the sound you asked for :(");
          return;
        }
        if (!(message.member && message.member.voice.channel)) {
          return;
        }
        if (
          !parserCtx.connection ||
          message.member.voice.channel.name !==
            parserCtx.connection.channel.name
        ) {
          message.member.voice.channel.join().then(connection => {
            updateContext({ connection });
            playSoundBite(connection, soundFileName);
          });
        } else {
          playSoundBite(parserCtx.connection, soundFileName);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
};
