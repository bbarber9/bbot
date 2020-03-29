import { Command } from "../../types";

export const bincero: Command = {
  description: "Summons 🅱️incero",
  action: function({ message }) {
    message.channel.send(
      "🅱️incero!\nhttps://gfycat.com/HeartfeltSkeletalCutworm"
    );
  }
};
