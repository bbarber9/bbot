import { Message, VoiceConnection } from "discord.js";
export interface Command {
  description: string;
  example?: string;
  action: (context: CommandCtx) => void;
}

export interface ParserCtx {
  connection?: VoiceConnection;
  commandTree: Record<string, Command>;
}

export interface CommandCtx {
  message: Message;
  updateContext: (updates: Partial<ParserCtx>) => void;
  parserCtx: ParserCtx;
}
