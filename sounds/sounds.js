"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.SOUNDS = {};
exports.CATEGORIES = [];
exports.CATEGORIES_STRING = "";
for (const folder of fs_1.readdirSync("./sounds")) {
    if (!folder.includes(".")) {
        exports.CATEGORIES.push(folder);
        exports.CATEGORIES_STRING += folder + " ";
        exports.SOUNDS[folder] = fs_1.readdirSync("./sounds/" + folder);
    }
}
