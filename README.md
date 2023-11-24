# USCIS Status Checker
This simple script uses Selenium to automate the USCIS (United States Citizenship and Immigration Services) case status checking process. It inputs a receipt number, retrieves the status information, and removes unnecessary patterns from the output.

## Prerequisites
Before running the script, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Google Chrome browser (for running Chrome in headless mode)

## Setup
1. Clone the repository:
```bash
git clone https://github.com/your-username/uscis-status-check.git
```

2. Navigate to the project directory:
```bash
cd uscis-status-check
```

3. Install dependencies:
```bash
npm install
```

4. Create a .env file in the project root and add your USCIS receipt number:
```env
RECEIPT_NUMBER=your-receipt-number
```

## Usage
Run the script using the following command:
```bash
npm start
```

This will launch a headless Chrome browser, navigate to the USCIS status check page, input the provided receipt number, and print the cleaned status information.

## Configuration
Chrome Options: Chrome is configured to run in headless mode by default. You can adjust Chrome options in the index.ts file if needed.

Patterns to Remove: Patterns like "Enter Another Receipt Number" and others are removed from the status text. You can customize the patterns to remove in the PATTERNS_TO_REMOVE array.

--- 

## License
This project is licensed under the MIT License.

Feel free to adjust the content based on your preferences or any additional information you'd like to include.