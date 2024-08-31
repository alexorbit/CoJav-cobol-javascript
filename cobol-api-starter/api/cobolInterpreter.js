// api/cobolInterpreter.js

/**
 * Enhanced COBOL interpreter that simulates the execution of COBOL code.
 * This interpreter processes basic COBOL commands and translates output to HTML.
 * @param {string} code - The COBOL code to interpret.
 * @returns {string} - The HTML output of the COBOL code execution.
 */
function interpretCobol(code) {
    // Split the COBOL code into lines for processing
    const lines = code.split('\n').map(line => line.trim());
    let htmlOutput = '<html><body>';
    
    for (let line of lines) {
        // Handling COBOL 'DISPLAY' command
        if (line.startsWith('DISPLAY')) {
            const content = line.match(/DISPLAY\s+"([^"]+)"/);
            if (content && content[1]) {
                htmlOutput += `<p>${content[1]}</p>`;
            } else {
                throw new Error("Invalid DISPLAY syntax in COBOL code.");
            }
        }
        // Additional COBOL commands can be added here
        // Example: Handling 'STOP RUN' command
        else if (line.startsWith('STOP RUN')) {
            break; // End execution
        }
        else {
            throw new Error(`Unsupported COBOL command or syntax: ${line}`);
        }
    }

    htmlOutput += '</body></html>';
    return htmlOutput;
}

module.exports = interpretCobol;
