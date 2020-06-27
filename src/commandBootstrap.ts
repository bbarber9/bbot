import { CommandParser } from "./commandParser";
const cmdParser = CommandParser();

export const registerCommands = () => {
  const cmdPath = "./commands/";
  //load in command files
  const commandsToRegister = [
    "help",
    "test",
    "compliment",
    "insult",
    "bincero",
    "joinVoice",
    "leaveVoice",
    "sb",
    "sbList",
    "dtp",
    "dtpcancel",
  ];
  const loadPromises = commandsToRegister.map((cmdName) => {
    return import(`${cmdPath}${cmdName}`)
      .then((cmdModule) => {
        cmdParser.registerCommand(cmdName, cmdModule[cmdName]);
      })
      .catch((e) => {
        console.error(`Failed to load command ${cmdName}`, e);
      });
  });
  return Promise.all(loadPromises);
};

export { cmdParser };
