import fs from "fs";
import { Command } from "../../types";

export const sbList: Command = {
  description: "Lists sounds available to the soundboard",
  action: function({ message }) {
    let msg = "Available Sounds:\n-----------------------\n";
    fs.readdir("./soundboard", function(err, files) {
      if (err) {
        return;
      }
      for (let file of files) {
        let fileName = file.split(".")[0];
        msg += `* ${fileName}\n`;
      }
      message.channel.send(msg);
    });
  }
};
