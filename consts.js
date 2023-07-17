export const browserUrlPrefix = "http://127.0.0.1:8080/view-iframe.html?src=";
export const browserUrlPrefixForBoot = "http://127.0.0.1:8080/boot.html?src=";
export const urlPrefix = "http://127.0.0.1:8080";
export const urlPrefixLen = urlPrefix.length;
export const ignorePaths = new Set([
    "/js/versions.js",
    "/js/getQueryString.js",
    "/js/jquery-3.1.1.min.js",
    "/js/labs.js",
    "/build/dev.js",
    "/images/favicon.ico"
]);
export const examplesPath = `${process.env.PHASER_PATH}/phaser3-examples`;
export const examplesDataPath = `${examplesPath}/public/examples.json`;