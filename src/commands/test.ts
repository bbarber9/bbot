import { Command } from "../../types";
export const test: Command = {
  description: "Tests the bot",
  action: function({ message }) {
    message.channel.send("Testing 123!");
  }
};
