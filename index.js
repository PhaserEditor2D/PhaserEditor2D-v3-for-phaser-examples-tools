import puppeteer from "puppeteer-core";
import { browserUrlPrefix, browserUrlPrefixForBoot, ignorePaths, urlPrefix, urlPrefixLen } from "./consts.js";
import { readFileSync, writeFileSync } from "fs";

const examplesList = JSON.parse(readFileSync("./examples-list.json"));

const outputData = {};

let currentExamplePath;

const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const page = await browser.newPage();
page.setViewport({ width: 1280, height: 800 });

function processNextExample() {

    if (examplesList.length === 0) {

        console.log("finished!");

        writeFileSync("examples-assets.json", JSON.stringify(outputData, undefined, 2));

        browser.close();

        return;
    }

    currentExamplePath = examplesList.pop();

    let url;

    if (currentExamplePath.endsWith("boot.json")) {

        url = url = `${browserUrlPrefixForBoot}${currentExamplePath}`;

    } else {

        url = `${browserUrlPrefix}${currentExamplePath}`;
    }

    console.log("processing " + currentExamplePath);
    console.log("load page " + url);

    outputData[currentExamplePath] = [];

    page.goto(url, {
        timeout: 0,
    });

    setTimeout(() => {

        processNextExample();

    }, 1500);
}

page.on("request", req => {

    let url = decodeURI(req.url());

    if (!url.startsWith(urlPrefix)) {

        return;
    };

    let filePath = url.substring(urlPrefixLen);
    {
        let i = filePath.indexOf("?");

        if (i > 0) {

            filePath = filePath.substring(0, i);
        }
    }

    if (filePath.startsWith("/view-iframe.html")) {

        return;
    };

    if (filePath.startsWith("/boot.html")
        || filePath.endsWith("/boot.json")
        || filePath.endsWith("/boot.js")) {

        return;
    }

    if (ignorePaths.has(filePath)) {

        return;
    }

    console.log("\tcapture", filePath);

    outputData[currentExamplePath].push(filePath);
});

processNextExample();

//await browser.close();