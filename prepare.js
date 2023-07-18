import { time } from "console";
import { readFileSync, writeFileSync } from "fs";

export const examplesPath = `${process.env.PHASER_PATH}/phaser3-examples`;
export const examplesDataPath = `${examplesPath}/public/examples.json`;

const examplesList = [];

const examplesData = JSON.parse(readFileSync(examplesDataPath));

function processExampleDataItem(item) {

    console.log("processing ", item.path);

    if (item.children) {

        if (item.children.find(c => c.name === "boot.json")) {

            console.log("\ta multi-scripts example detected, skip children");

            const file = (item.path + "/boot.json").replace(/\\/g, '/');

            examplesList.push(file);
    
            return;
        }

        for(const item2 of item.children) {

            processExampleDataItem(item2);
        }

    } else {

        const file = item.path.replace(/\\/g, '/');

        examplesList.push(file);
    }
}

function convertPath(windowsPath) {
    
    return windowsPath.replace(/^\\\\\?\\/,"").replace(/\\/g,'\/').replace(/\/\/+/g,'\/');
}

for(const item of examplesData.children) {

    processExampleDataItem(item);
}

writeFileSync("examples-list.json", JSON.stringify(examplesList, undefined, 4));
