// node-red-start.js
const http = require('http');
const express = require('express');
const RED = require('node-red');

// Use PORT from Render Environment
const PORT = process.env.PORT || 1880;

// Setup Express server
const app = express();
const server = http.createServer(app);

// Node-RED settings
const settings = {
    httpAdminRoot: "/",
    httpNodeRoot: "/api",
    userDir: "./.nodered", 
    flowFile: "flows.json", // Main flow file
    functionGlobalContext: { },
    editorTheme: {
        // Additional settings can be added here
    },
};

// Initialize Node-RED
RED.init(server, settings);

// Add the Node-RED user interface (editor)
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Add the Node-RED flow handler
app.use(settings.httpNodeRoot, RED.httpNode);

// Start the server
server.listen(PORT, () => {
    console.log(Node-RED running on port ${PORT});
    RED.start();
});

// Stop Node-RED when the server shuts down
process.on('SIGINT', () => {
    RED.stop();
});
