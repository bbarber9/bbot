import { Command } from "../../types";

export const leaveVoice: Command = {
  description: "Makes the bot leave your voice channel",
  action: function({ message }) {
    if (!message.member) {
      return;
    }
    if (message.member.voice.channel) {
      message.member.voice.channel.leave();
    }
  }
};
