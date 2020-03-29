import { Command } from "../../types";

export const compliment: Command = {
  description: "Compliments a user",
  example: "!compliment @bbarber9#5232",
  action: function({ message }) {
    const mentionedUser = message.mentions.users.first();
    if (mentionedUser) {
      const userId = mentionedUser.id;
      const compliments = [
        `You are beautiful <@${userId}>!`,
        `<@${userId}>, you are the smartest person I know!`,
        `You should be proud of yourself, <@${userId}>`,
        `You look great today <@${userId}>!`,
        `On a scale of 1 to 10, you are an 11 <@${userId}>.`,
        `If you were a triangle, you would be acute one <@${userId}> :)`
      ];
      let randomIndex = Math.floor(Math.random() * compliments.length);
      message.channel.send(compliments[randomIndex]);
    }
  }
};
