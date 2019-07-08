var http = require("http");
var url = require("url");
var fs = require("fs");
var WebSocketServer = require("websocket").server;

var connectionArray = [];
var nextID = Date.now();
var appendToMakeUnique = 1;
const dirname = "./websocket-chat";

var server = http.createServer((request, response) => {
    console.log(new Date() + " Received request for " + request.url);
    if (request.url === "/") {
        //设置编码
        response.setHeader("Content-Type", "text/html;charset=utf-8");
        fs.createReadStream(dirname + "/index.html").pipe(response);
    } else {
        if (fs.existsSync(`.${request.url}`)) {
            fs.createReadStream(`.${request.url}`).pipe(response);
        } else {
            response.statusCode = 404;
            response.end();
        }
    }
});
// 发布服务，监听端口6502
server.listen(6502, () => {
    console.log(new Date() + " Server is listening on port 6502");
});

// Create the WebSocket server
var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true // You should use false here!
});

wsServer.on("connect", (connection) => {
    // ...

    // Handle the "message" event received over WebSocket. This
    // is a message sent by a client, and may be text to share with
    // other users or a command to the server.

    connection.on("message", (message) => {
        if (message.type === "utf8") {
            // Process messages

            var sendToClients = true;
            msg = JSON.parse(message.utf8Data);
            var connect = getConnectionForID(msg.id);

            switch (msg.type) {
                case "message":
                    // ...
                    break;
                case "username":
                    // ...
                    break;
            }
        }
    });

    // Handle the WebSocket "close" event; this means a user has logged off
    // or has been disconnected.
    connection.on("close", (connection) => {

    });
    // ...
});