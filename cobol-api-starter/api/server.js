// api/server.js

const http = require('http');
const interpretCobol = require('./cobolInterpreter');

// Function to handle HTTP requests
function requestHandler(req, res) {
    if (req.method === 'POST' && req.url === '/execute-cobol') {
        let body = '';

        // Collect incoming data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Process the COBOL code once all data is received
        req.on('end', () => {
            try {
                // Interpret COBOL code and convert to HTML
                const htmlOutput = interpretCobol(body);
                // Send the HTML output back to the client
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlOutput);
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Error executing COBOL: ${error.message}`);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}

// Create a simple HTTP server
const server = http.createServer(requestHandler);

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
