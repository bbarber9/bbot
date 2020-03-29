import { Message } from "discord.js";
import { Command, ParserCtx } from "../types";
export const CommandParser = () => {
  const commandTree: Record<string, Command> = {};
  let parserCtx: ParserCtx = {
    connection: undefined,
    commandTree
  };

  const updateContext = (newCtx: Partial<ParserCtx>) => {
    parserCtx = { ...parserCtx, ...newCtx };
  };

  const parseCommand = (message: Message) => {
    let cmd = message.content.substring(1).split(" ")[0];
    if (commandTree.hasOwnProperty(cmd)) {
      commandTree[cmd].action({ message, updateContext, parserCtx });
    }
  };

  const registerCommand = (cmdName: string, cmdObject: Command) => {
    commandTree[cmdName] = cmdObject;
  };

  return {
    parseCommand,
    registerCommand
  };
};
