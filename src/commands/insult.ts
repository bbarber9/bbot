import { Command } from "../../types";

export const insult: Command = {
  description: "Insults a user",
  example: "!insult @bbarber9#5232",
  action: function({ message }) {
    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      return;
    }
    let userId = mentionedUser.id;
    let insults = [
      `<@${userId}> I fart in your general direction! Your mother was a hamster and your father smells of elderberries!`,
      `<@${userId}> is compensating for something 😏`,
      `<@${userId}> may look like an idiot and talk like an idiot but don't let that fool you. They really are an idiot.`,
      `<@${userId}>, you are a sad strange little man, and you have my pity.`,
      `<@${userId}> has no enemies, but is intensely disliked by their friends`,
      `<@${userId}>, you bowl like your momma. Unless of course she bowls well, in which case you bowl nothing like her.`,
      `<@${userId}>, you are a fart factory, slug-slimed sack of rat guts in cat vomit. A cheesy scap picked pimple squeezing finger bandage. A week old maggot burger with everything on it and flies on the side.`
    ];
    let randomIndex = Math.floor(Math.random() * insults.length);
    message.channel.send(insults[randomIndex]);
  }
};
