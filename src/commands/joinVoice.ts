import { Command } from "../../types";

export const joinVoice: Command = {
  description: "Makes the bot join your voice channel",
  action: function({ message, updateContext }) {
    if (!message.member) {
      return;
    }
    if (message.member.voice.channel) {
      message.member.voice.channel.join().then(connection => {
        updateContext({ connection });
        message.reply("I have joined the channel!");
      });
    }
  }
};
