import {Message} from "discord.js";

abstract class AbstractCommand{
    abstract onChatMessage(msg : Message);
    abstract testify()
    abstract onCommand(msg : Message);
}