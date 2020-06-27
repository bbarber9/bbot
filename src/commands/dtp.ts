import { Command } from "../../types";
const HOURS_TO_MS = 60 * 60 * 1000;

const parseMsgChunks = (chunks: string[]): [number, string] => {
  const defaultHours = 1;
  const defaultGames = "anything";
  if (chunks.length === 1) {
    return [defaultHours, defaultGames];
  }
  const [command, maybeHours, ...maybeGamesList] = chunks;
  const parsedHours = parseInt(maybeHours, 10);
  if (isNaN(parsedHours)) {
    const gamesList = maybeHours;
    return [defaultHours, gamesList];
  }
  return [parsedHours, maybeGamesList.join("")];
};

export const dtp: Command = {
  description: "Marks you as 'Down To Play",
  example: "!dtp 1 LoL",
  action: async ({ message }) => {
    const { guild, member } = message;
    if (guild && member) {
      const roles = await guild.roles.fetch();
      const dtpRole = roles.cache.find((role, key) => {
        return role.name === "Down To Play";
      });
      if (!dtpRole) return;
      member.roles.add(dtpRole);
      const messageChunks = message.content.split(" ");

      const [hours, gamesList] = parseMsgChunks(messageChunks);

      const msg = `<@${member.id}> is down to play ${gamesList} for the next ${hours} hour(s). Drop a 👍 on this comment if you want to play.`;
      const playMsg = await message.channel.send(msg);
      const collector = playMsg.createReactionCollector(
        (reaction, user) =>
          reaction.emoji.name === "👍" && user.id !== member.id,
        {
          time: hours * HOURS_TO_MS,
        }
      );
      collector.on("collect", (reaction, user) => {
        // nothing, for now
      });
      setTimeout(() => {
        member.roles.remove(dtpRole);
      }, hours * HOURS_TO_MS);
    }
  },
};
