import { DiscordCtx } from "../mainCtx";
import { Command } from "../../types";
export const dtpcancel: Command = {
  description: "Cancels 'Down To Play' Status",
  action: async ({ message }) => {
    const client = DiscordCtx.getClient();
    const { guild, member } = message;
    if (guild && member) {
      const roles = await guild.roles.fetch();
      const dtpRole = roles.cache.find((role, key) => {
        return role.name === "Down To Play";
      });
      if (!dtpRole) return;
      member.roles.remove(dtpRole);
    }
  },
};
