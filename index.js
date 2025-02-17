"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const AWS = require("aws-sdk");
const Stream = require("stream");
const ytdl = require("ytdl-core");
const fs = require("fs");
const Quotes_1 = require("./Quotes");
const Links_1 = require("./Links");
const sounds_1 = require("./sounds/sounds");
const status = [
    { game: { name: "with ze waifu pillow!", type: "PLAYING", url: "https://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8" } },
    { game: { name: "!nofun help", type: "PLAYING", url: "https://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8" } },
    { game: { name: "\_RealDeal_.mp4", type: "WATCHING", url: "https://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8" } }
];
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY)
    throw "Provide AWS credentials!";
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID.toString();
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY.toString();
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'eu-west-1'
});
const discord = new discord_js_1.Client();
async function start() {
    await discord.login(process.env.DISCORD_TOKEN);
    console.log("Discord Connected!");
    setInterval(() => {
        discord.user.setPresence(status[Math.floor(Math.random() * status.length)]).catch(console.error);
    }, 1000 * 10);
}
const help = "It’s your move.\n\n" +
    "**Commands** !nofun\n" +
    "RealDeal.mp4 | RealBASS.mp4 | exposed | DTRASh | earrape | windowsxp | gayfrok | personalhealer | nofun wii | wiisports | ytmeme | pillowtalking | gabage.mp4 | whyubullyme | rapbattle | zocken>ficken | gayfrog | hypixelzoo | hypixelpirates | einszwei\n" +
    "\n!nofun dog's (*members*)\n" +
    "\n!nofun rainbowdisagree2 (*members*)\n" +
    "!nofun pls *sound*\n" +
    "\t *SOUNDS: " + sounds_1.CATEGORIES_STRING + "!* \n" +
    "!nofun play *url*\n" +
    "!nofun say *text*\n" +
    "!nofun rage *text*\n" +
    "\n!nofun stop\n" +
    "!nofun pause\n" +
    "!nofun resume\n" +
    "\n**Settings**\n" +
    "!nofun toggle\n" +
    "\n**Invite me:** !nofun invitelink\n" +
    "\nPlz don not say NO FUN or I get triggered and I ban you from this Discord server - FOREVER :rage: \n";
async function pls(msg, what) {
    if (sounds_1.CATEGORIES.indexOf(what) === -1)
        await msg.reply("Fuck off. I can't find the sound for **" + what + "**! You should try **[" + sounds_1.CATEGORIES_STRING + "]** instead, pathetic cunt!");
    else
        await playFile(msg, "./sounds/" + what + "/" + sounds_1.SOUNDS[what][Math.floor(Math.random() * sounds_1.SOUNDS[what].length)]);
}
async function commands(msg) {
    const args = msg.content.split(" ");
    console.log(new Date().toISOString() + " | " + msg.guild.name + "#" + msg.guild.id + " | " + msg.author.tag + " | " + msg.content);
    if (args.length === 1 || args[1] === "help") {
        await msg.reply(help);
        return;
    }
    else if (args[1] === "stop") {
        if (voiceMap[msg.guild.id]) {
            getSettingsMap(msg.guild.id).continuesPlay = false;
            if (msg.member.voiceChannel)
                await pollyTTS(msg, "Joey", "NOFUN! Pathetic cunt!", 100);
            else
                await msg.reply("Okay, okay  - Worthless piece of shit, I stop NOFUN! Pathetic cunt!");
        }
    }
    else if (args[1].toLowerCase() === "_realdeal_.mp4" || args[1].toLowerCase() === "realdeal.mp4") {
        await playYoutube(msg, "https://youtu.be/MH_t2NIklMg", 0.6);
    }
    else if (args[1].toLowerCase() === "_realbass_.mp4" || args[1].toLowerCase() === "realbass.mp4") {
        await playYoutube(msg, "https://youtu.be/5WEKXg214TM", 1);
    }
    else if (args[1].toLowerCase() === "earrape") {
        await playYoutube(msg, "https://youtu.be/UkCih5DLKfI", 10);
    }
    else if (args[1].toLowerCase() === "exposed") {
        await playYoutube(msg, "https://youtu.be/JysJqkueMoI", 0.6);
    }
    else if (args[1].toLowerCase() === "dtrash") {
        await playYoutube(msg, "https://youtu.be/McLbBiK-poE", 2);
    }
    else if (args[1].toLowerCase() === "wii") {
        await playYoutube(msg, "https://youtu.be/LYN6DRDQcjI", 0.6);
    }
    else if (args[1].toLowerCase() === "wiisports") {
        await playYoutube(msg, "https://youtu.be/8IFzTDLHuCU", 0.5);
    }
    else if (args[1].toLowerCase() === "gayfrok") {
        await playYoutube(msg, "https://youtu.be/Jp3aR5c3k3U", 1);
    }
    else if (args[1].toLowerCase() === "personalhealer") {
        await playYoutube(msg, "https://youtu.be/cY-hzhJstiw", 0.8);
    }
    else if (args[1].toLowerCase() === "whyubullyme") {
        await playYoutube(msg, "https://youtu.be/_AFbtgHJriw", 2);
    }
    else if (args[1].toLowerCase() === "gayfrog") {
        await playYoutube(msg, "https://youtu.be/9JRLCBb7qK8", 0.8);
    }
    else if (args[1].toLowerCase() === "hypixelzoo") {
        await playYoutube(msg, "https://youtu.be/limp1zbeBBk", 1);
    }
    else if (args[1].toLowerCase() === "hypixelpirates") {
        await playYoutube(msg, "https://youtu.be/yc7xiK4dnII", 10);
    }
    else if (args[1].toLowerCase() === "rapbattle") {
        await playYoutube(msg, "https://youtu.be/XYkMga6kP5c", 1);
    }
    else if (args[1].toLowerCase() === "pillowtalking") {
        await playYoutube(msg, "https://youtu.be/NWWeQlXfSa0", 1);
    }
    else if (args[1].toLowerCase() === "zocken>ficken") {
        await playYoutube(msg, "https://youtu.be/NWWeQlXfSa0", 1);
    }
    else if (args[1].toLowerCase() === "einszwei") {
        await playYoutube(msg, "https://youtu.be/dSy2DcATYUo", 1);
    }
    else if (args[1].toLowerCase() === "gabage.mp4") {
        await playYoutube(msg, "https://youtu.be/3MGgvWyDW9g", 1);
    }
    else if (args[1].toLowerCase() === "windowsxp") {
        await playYoutube(msg, "https://youtu.be/6Joyj0dmkug", 10);
    }
    else if (args[1].toLowerCase() === "rainbowdisagree2") {
        if (msg.mentions.members && msg.mentions.members.size !== 0) {
            if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.id === "241301843819495425") {
                for (const member of msg.mentions.members.array()) {
                    if (getSettingsMap(msg.guild.id).rainbowdisagree2.indexOf(member.id) !== -1) {
                        getSettingsMap(msg.guild.id).rainbowdisagree2.splice(getSettingsMap(msg.guild.id).rainbowdisagree2.indexOf(member.id));
                        await msg.channel.send("play the game <@" + member.id + ">");
                    }
                    else {
                        getSettingsMap(msg.guild.id).rainbowdisagree2.push(member.id);
                        await msg.channel.send("You cannot disagree with fact. <@" + member.id + ">, you silly.\n" +
                            "\\*Edit\\* Confirmed, <@" + member.id + "> thinks facts change with skill.");
                    }
                }
            }
        }
        else {
            await msg.reply(Quotes_1.rainbowdisagree2Quotes[Math.floor(Math.random() * Quotes_1.rainbowdisagree2Quotes.length)]);
        }
    }
    else if (args[1].toLowerCase() === "dogs" || args[1].toLowerCase() === "dog's") {
        await msg.delete().catch();
        if (msg.mentions.members && msg.mentions.members.size !== 0) {
            for (const member of msg.mentions.members.array()) {
                await msg.channel.send("DOG'S <@" + member.id + ">");
            }
        }
        else {
            const members = msg.guild.members.array();
            await msg.channel.send("DOG'S <@" + members[Math.floor(Math.random() * members.length)].id + ">");
        }
    }
    else if (args[1].toLowerCase() === "pls") {
        if (args[2])
            await pls(msg, args[2]);
        else
            await msg.reply("Fuck off! There us no sound, try **[" + sounds_1.CATEGORIES_STRING + "]** instead, pathetic cunt!");
    }
    else if (args[1].toLowerCase() === "ytmeme") {
        getSettingsMap(msg.guild.id).continuesPlay = true;
        await playYoutube(msg, Links_1.links[Math.floor(Math.random() * Links_1.links.length)].toString(), 0.6);
    }
    else if (args[1].toLowerCase() === "play") {
        await playYoutube(msg, args[2], 0.6);
    }
    else if (args[1].toLowerCase() === "pause") {
        if (voiceMap[msg.guild.id] && voiceMap[msg.guild.id].dispatcher)
            voiceMap[msg.guild.id].dispatcher.pause();
    }
    else if (args[1].toLowerCase() === "resume") {
        if (voiceMap[msg.guild.id] && voiceMap[msg.guild.id].dispatcher)
            voiceMap[msg.guild.id].dispatcher.resume();
    }
    else if (args[1].toLowerCase() === "say") {
        if (msg.content.length <= msg.content.indexOf("say") + 4 + 20)
            await msg.reply("I don't care if you do this bullshit to me. But your message is to short!");
        else
            await pollyTTS(msg, "Joey", msg.content.substring(msg.content.indexOf("say") + 4));
    }
    else if (args[1].toLowerCase() === "rage") {
        if (msg.content.length <= msg.content.indexOf("rage") + 4 + 20)
            await msg.reply("I don't care if you do this bullshit to me. But your message is to short!");
        else
            await pollyTTS(msg, "Joey", msg.content.substring(msg.content.indexOf("rage") + 4), 100);
    }
    else if (args[1].toLowerCase() === "invitelink") {
        await msg.reply("Add me PLZZZZZZ \nhttps://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8");
    }
    else if (args[1].toLowerCase() === "toggle") {
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.id === "241301843819495425")
            getSettingsMap(msg.guild.id).nofunEnabled = !getSettingsMap(msg.guild.id).nofunEnabled;
        else
            await msg.reply("I just find it pathetic with the way you act. Stop acting like a 7 year old. Show a little bot of respect for yourself. Scum");
    }
    else {
        await msg.reply(help);
    }
}
async function rainbowdisagree2(msg) {
    if (msg.author.id === discord.user.id)
        return;
    if (getSettingsMap(msg.guild.id).rainbowdisagree2.indexOf(msg.author.id) === -1)
        return;
    await msg.reply(Quotes_1.rainbowdisagree2Quotes[Math.floor(Math.random() * Quotes_1.rainbowdisagree2Quotes.length)]);
    try {
        if (!msg.guild.emojis.find((value) => value.name.toLowerCase() === "rainbowdisagree2")) {
            await msg.guild.createEmoji(fs.readFileSync("rainbowdisagree2.png"), "rainbowdisagree2");
        }
        await msg.react(msg.guild.emojis.find((value) => value.name.toLowerCase() === "rainbowdisagree2"));
    }
    catch (e) {
        console.error("Something went wring while reacting with :rainbowdisagree2:");
    }
}
async function noFun(msg) {
    if (!getSettingsMap(msg.guild.id).nofunEnabled)
        return;
    if (msg.author.id === discord.user.id)
        return;
    console.log(new Date().toISOString() + " | " + msg.guild.name + "#" + msg.guild.id + " | " + msg.author.tag + " triggered RealDeal");
    if (msg.member.voiceChannel)
        await pollyTTS(msg);
    else
        await msg.reply(Quotes_1.totalQuotes[Math.floor(Math.random() * Quotes_1.totalQuotes.length)]);
    try {
        if (!msg.guild.emojis.find((value) => value.name.toLowerCase() === "nofun")) {
            await msg.guild.createEmoji(fs.readFileSync("emote.png"), "nofun");
        }
        await msg.react(msg.guild.emojis.find((value) => value.name.toLowerCase() === "nofun"));
    }
    catch (e) {
        console.error("Something went wring while reacting with :nofun:");
    }
}
const voiceMap = {};
const settingsMap = {};
function getSettingsMap(guildID) {
    if (settingsMap[guildID])
        return settingsMap[guildID];
    settingsMap[guildID] = {
        continuesPlay: false,
        nofunEnabled: true,
        rainbowdisagree2: []
    };
    return settingsMap[guildID];
}
async function playFile(msg, file, volume) {
    await joinVoice(msg);
    const dispatcher = voiceMap[msg.guild.id].playFile(file, {
        passes: 5,
        volume: volume
    });
    dispatcher.once("end", reason => {
        if (reason === undefined)
            return;
        voiceMap[msg.guild.id].disconnect();
        delete voiceMap[msg.guild.id];
    });
}
async function pollyTTS(msg, speaker, text, volume) {
    if (!text)
        text = Quotes_1.textQuotes[Math.floor(Math.random() * Quotes_1.textQuotes.length)].toString();
    Polly.synthesizeSpeech({
        Text: text,
        VoiceId: speaker ? speaker : "Joey",
        OutputFormat: "mp3",
    }, ((err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        if (data.AudioStream instanceof Buffer) {
            const stream = new Stream.PassThrough();
            stream.end(data.AudioStream);
            playStream(msg, stream, volume).catch(console.error);
        }
    }));
}
async function playYoutube(msg, url, volume) {
    if (!url.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)) {
        await msg.reply("This is not a youtube link - worthless cunt!");
        return;
    }
    else {
        await playStream(msg, ytdl(url, { filter: 'audioonly' }), volume);
    }
}
async function joinVoice(msg) {
    if (msg.member.voiceChannel) {
        voiceMap[msg.guild.id] = await msg.member.voiceChannel.join();
        return voiceMap[msg.guild.id];
    }
    else {
        await msg.reply("Wtf do you want you pathetic cunt. Join a voice channel to use the !nofun command. Otherwise stfu wortless treash.");
        return null;
    }
}
async function playStream(msg, stream, volume) {
    await joinVoice(msg);
    const dispatcher = voiceMap[msg.guild.id].playStream(stream, {
        passes: 5,
        volume: volume
    });
    dispatcher.once("end", reason => {
        if (reason === undefined)
            return;
        if (getSettingsMap(msg.guild.id).continuesPlay && msg.member.voiceChannel) {
            playYoutube(msg, Links_1.links[Math.floor(Math.random() * Links_1.links.length)].toString(), 0.6).catch(console.error);
        }
        else {
            voiceMap[msg.guild.id].disconnect();
            delete voiceMap[msg.guild.id];
        }
    });
}
discord.on("message", async (msg) => {
    try {
        if (msg.author.bot)
            return;
        if (msg.content.toUpperCase().match(/^!NOFUN/))
            await commands(msg);
        else if (msg.content.toUpperCase().match(/NO *FUN/))
            await noFun(msg);
        await rainbowdisagree2(msg);
    }
    catch (e) {
        console.error(e);
    }
});
discord.on("error", console.error);
discord.on("warn", console.warn);
start().catch(console.error);
