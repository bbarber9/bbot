# Discord-BBot

This bot is meant for playing around in Discord

## Setup

1. Clone this repo
2. `npm install` inside of the directory
3. create a `.env` file with a line like this:

```
BOT_TOKEN=your_token_here
```

4. `node dist/index.js` to run the bot

## Optional Setup For Voice Commands

In order to use voice functionality, you will need to install `ffmpeg`

## Adding Commands

It is pretty simple to add a command to the bot simply create a new file in the `commands` directory and register it in `commandBootstrap.js` like so:

```javascript
cmdParser.registerCommand("command_name", require("./commands/command_name"));
```
