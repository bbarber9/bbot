import { Client } from "discord.js";

export const DiscordCtx = (() => {
  let client: Client | undefined = undefined;
  const getClient = () => {
    if (client) {
      return client;
    }
    throw new Error("No client available");
  };
  const setClient = (cli: Client) => {
    client = cli;
  };

  return {
    setClient,
    getClient,
  };
})();
