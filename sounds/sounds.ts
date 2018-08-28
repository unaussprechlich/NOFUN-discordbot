import {readdirSync} from "fs";

export const SOUNDS : { [key: string] : string[] }= {};
export const CATEGORIES : string[] = [];
export let CATEGORIES_STRING : string = "";


for(const folder of readdirSync("./sounds")){
    if(!folder.includes(".")){
        CATEGORIES.push(folder);
        CATEGORIES_STRING += folder + " ";
        SOUNDS[folder] = readdirSync("./sounds/" + folder);
    }
}