import { Builder, By, Key, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import dotenv from 'dotenv';

const run = async () => {
    dotenv.config();
    const TODAY = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const USCIS_URL = 'https://egov.uscis.gov/';
    const RECEIPT_NUMBER = process.env.RECEIPT_NUMBER ?? '';
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
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless'); // Run Chrome in headless mode (no GUI)

    // Create a new WebDriver instance
    const driver: WebDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    try {
        // Navigate to the USCIS status check page
        console.log(`Navigating to ${USCIS_URL}`)
        await driver.get(USCIS_URL);

        // Input the receipt number
        console.log(`Inputting receipt number ${RECEIPT_NUMBER}`)
        await driver.findElement(By.id('receipt_number')).sendKeys(RECEIPT_NUMBER, Key.RETURN);

        // Get and print the status
        console.log('Getting status')
        await new Promise(f => setTimeout(f, 10000));
        let statusText: string = await driver.findElement(By.className('caseStatusSection')).getText();

        // Remove unnecessary patterns
        PATTERNS_TO_REMOVE.forEach(pattern => {
            statusText = statusText.replace(pattern, '').trim();
        });

        // Print the status
        console.log(`${TODAY}: ${statusText}`);

        // TODO - add ability to look up multiple receipt numbers and save the results for data analysis
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Run the script
run().then(r => {});
