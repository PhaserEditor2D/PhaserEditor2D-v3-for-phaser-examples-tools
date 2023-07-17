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
            examplesList.push(item.path + "/boot.json");
    
            return;
        }

        for(const item2 of item.children) {

            processExampleDataItem(item2);
        }

    } else {

        examplesList.push(item.path);
    }
}

for(const item of examplesData.children) {

    processExampleDataItem(item);
}

writeFileSync("examples-list.json", JSON.stringify(examplesList, undefined, 4));
