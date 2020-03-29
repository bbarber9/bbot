import { Command } from "../../types";

export const help: Command = {
  description: "Lists commands and their descriptions",
  action: function({ message, parserCtx }) {
    const { commandTree } = parserCtx;
    let msg = "Command List:\n--------------------------\n";

    for (let cmd in commandTree) {
      msg += `* **!${cmd}** : ${commandTree[cmd].description}\n`;
      if (commandTree[cmd].hasOwnProperty("example")) {
        msg += "```" + commandTree[cmd].example + "```";
      }
    }
    message.channel.send(msg);
  }
};
