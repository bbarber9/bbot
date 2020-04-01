import { promises as fs } from "fs";
import { Command } from "../../types";
import { constants } from "../utils";

export const sbList: Command = {
  description: "Lists sounds available to the soundboard",
  action: function({ message }) {
    let msg = "Available Sounds:\n-----------------------\n";
    fs.readdir(constants.sbPath)
      .then(files => {
        files.forEach(file => {
          let fileName = file.split(".")[0];
          msg += `* ${fileName}\n`;
        });
        message.channel.send(msg);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
