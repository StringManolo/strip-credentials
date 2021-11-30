#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const loadFile = (filename) => {
    let retValue;
    try {
        retValue = fs_1.default.readFileSync(filename, { encoding: "utf-8" });
    }
    catch (e) {
        retValue = null;
    }
    return (retValue ? retValue.slice(0, -1) : null);
};
const open = (filename, mode) => {
    const fd = {};
    try {
        fd.internalFd = fs_1.default.openSync(filename, mode);
        fd.read = (buffer, position, len) => fs_1.default.readSync(fd.internalFd, buffer, position, len, null);
        fd.puts = (str) => fs_1.default.writeSync(fd.internalFd, str);
        fd.close = () => fs_1.default.closeSync(fd.internalFd);
        return fd;
    }
    catch (err) {
        // console.log("open " + err);
        return fd;
    }
};
const createFile = (filename, data) => {
    try {
        if (!fs_1.default.existsSync(filename)) {
            const fd = open(filename, "w");
            fd.puts(data);
            fd.close();
            return true;
        }
    }
    catch (err) {
        //console.log("createFile " + err);
    }
    return false;
};
const createFileOverwrite = (filename, data) => {
    const fd = open(filename, "w");
    fd.puts(data);
    fd.close();
};
const createFolder = (dir) => {
    try {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        return true;
    }
    catch (err) {
        // console.log("CreateProgramFolder " + err);
        return false;
    }
};
const run = (args) => {
    let res = child_process_1.default.execSync(args).toString();
    return res;
};
const replaceByPlaceholders = (filename) => {
    console.log("Checking " + filename + " ... ");
    const placeholder = {
        email: "example@gmail.com",
        password: "12345678"
    };
    let fileContent = loadFile(filename);
    console.log(fileContent === null || fileContent === void 0 ? void 0 : fileContent.length);
    if (!fileContent) {
        return null;
    }
    const originalContent = fileContent;
    let emailsCounter = 0;
    let passwordsCounter = 0;
    if (/\/\*.REPLACE.[EMAIL|PASSWORD]/g.test(fileContent)) {
        const coments = fileContent.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);
        if (Array.isArray(coments)) {
            for (let i in coments) {
                if (/REPLACE EMAIL BETWEEN /g.test(coments[i])) {
                    const [firstChar, secondChar] = coments[i].split(" ")[4].split("");
                    const email = fileContent.split(coments[i])[1]
                        .split(firstChar)[1]
                        .split(secondChar)[0];
                    // console.log("The EMAIL is " + email);
                    fileContent = fileContent.replace(`${coments[i]}${firstChar}${email}${secondChar}`, `${firstChar}${placeholder.email}${secondChar}`);
                    ++emailsCounter;
                }
                else if (/REPLACE PASSWORD BETWEEN /g.test(coments[i])) {
                    const [firstChar, secondChar] = coments[i].split(" ")[4].split("");
                    const password = fileContent.split(coments[i])[1]
                        .split(firstChar)[1]
                        .split(secondChar)[0];
                    // console.log("The PASSWORD is " + password);
                    fileContent = fileContent.replace(`${coments[i]}${firstChar}${password}${secondChar}`, `${firstChar}${placeholder.password}${secondChar}`);
                    ++passwordsCounter;
                }
            }
        }
    }
    else {
        return false;
        ;
    }
    try {
        createFileOverwrite("./withCredentials/" + filename, originalContent);
    }
    catch (error) {
        let dirName = filename.split("/");
        dirName.pop();
        createFolder("./withCredentials/" + dirName.join("/"));
        createFileOverwrite("./withCredentials/" + filename, originalContent);
    }
    createFileOverwrite(filename, fileContent);
    console.log(emailsCounter + " emails and " + passwordsCounter + " passwords replaced from " + filename + "\n");
    return true;
};
/* <main> */
if (process.argv[2]) {
    if (process.argv[2] === "--init" || process.argv[2] === "init") {
        try {
            if (!createFile("./sc.config", "")) {
                console.log("sc.config file already exists. Place each file you want to track into new line");
                process.exit(0);
            }
            console.log("Done");
        }
        catch (error) {
            console.log("sc.config file already exists. Place each file you want to track in a separated line");
        }
        process.exit(0);
    }
    if (/r/gi.test(process.argv[2])) {
        try {
            run("mv ./.gitignore ./_.gitignore~ 2>&1 > /dev/null; cp ./withCredentials/* ./ -r 2>&1 > /dev/null; rm ./.gitignore 2>&1 > /dev/null; mv ./_.gitignore~ ./.gitignore 2>&1 > /dev/null");
        }
        catch (error) {
        }
        console.log("Files recovered");
    }
    if (process.argv[3]) {
        if (/d/gi.test(process.argv[3])) {
            try {
                run("rm ./withCredentials -r 2>&1 > /dev/null");
            }
            catch (error) {
            }
            console.log("\"./withCredentials\" folder removed");
        }
    }
    process.exit(0);
}
const fileContents = loadFile("./sc.config");
if (fileContents) {
    createFolder("./withCredentials");
    createFileOverwrite("./withCredentials/.gitignore", "*\n*/\n!.gitignore");
    let listOfFiles = fileContents;
    if (/\n/g.test(listOfFiles)) {
        listOfFiles = listOfFiles.split("\n");
    }
    if (typeof listOfFiles === "string") {
        replaceByPlaceholders(listOfFiles);
    }
    else {
        for (let i in listOfFiles) {
            replaceByPlaceholders(listOfFiles[i]);
        }
    }
}
else {
    console.log("Unable to get file contents from ./sc.config");
}
/* </main> */
