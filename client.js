const WebSocket = require('ws');
const {randomInt} = require("node:crypto");

const ws = new WebSocket('ws://localhost:8080')

ws.onopen = () => {
    let i = 0;
    const sendData = () => {
        ws.send(i);
        i++;
        setTimeout(sendData, randomInt(100, 1000));
    };
    sendData();
};

ws.onmessage = (message) => {
    console.log(`Receive : ${message}`)
}

ws.onerror = (error) => {
    console.error('Error occurred in WebSocket : ', error);
};

ws.onclose = () => {
    console.log('Connection closed');
};
