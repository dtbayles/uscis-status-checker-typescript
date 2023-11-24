"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const dotenv_1 = __importDefault(require("dotenv"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    dotenv_1.default.config();
    const TODAY = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const USCIS_URL = 'https://egov.uscis.gov/';
    const RECEIPT_NUMBER = (_a = process.env.RECEIPT_NUMBER) !== null && _a !== void 0 ? _a : '';
    const PATTERNS_TO_REMOVE = [
        /Enter Another Receipt Number/g,
        /Check Status/g,
        /Already have an Account\? Login/g,
        /Create an Account\? Sign up/g,
        /Check Case Status/g,
        /Use this tool to track the status of an immigration application, petition, or request\./g,
        /The receipt number is a unique 13-character identifier that consists of three letters and 10 numbers\. Omit dashes \("-"\) when entering a receipt number\. However, you can include all other characters, including asterisks \("\*"\), if they are listed on your notice as part of the receipt number\. When a receipt number is entered, the check status button will be enabled and you can check the status\./g,
        /Enter a Receipt Number/g,
    ];
    // Set up Chrome options
    const chromeOptions = new chrome_1.default.Options();
    chromeOptions.addArguments('--headless'); // Run Chrome in headless mode (no GUI)
    // Create a new WebDriver instance
    const driver = yield new selenium_webdriver_1.Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    try {
        // Navigate to the USCIS status check page
        console.log(`Navigating to ${USCIS_URL}`);
        yield driver.get(USCIS_URL);
        // Input the receipt number
        console.log(`Inputting receipt number ${RECEIPT_NUMBER}`);
        yield driver.findElement(selenium_webdriver_1.By.id('receipt_number')).sendKeys(RECEIPT_NUMBER, selenium_webdriver_1.Key.RETURN);
        // Get and print the status
        console.log('Getting status');
        yield new Promise(f => setTimeout(f, 10000));
        let statusText = yield driver.findElement(selenium_webdriver_1.By.className('caseStatusSection')).getText();
        // Remove unnecessary patterns
        PATTERNS_TO_REMOVE.forEach(pattern => {
            statusText = statusText.replace(pattern, '').trim();
        });
        // Print the status
        console.log(`${TODAY}: ${statusText}`);
        // TODO - add ability to look up multiple receipt numbers and save the results for data analysis
    }
    finally {
        // Close the browser
        yield driver.quit();
    }
});
// Run the script
run().then(r => { });
