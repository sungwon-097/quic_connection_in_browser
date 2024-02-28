const { Client } = require('quic');
const WebSocket = require('ws');

const cli = new Client();
let isConnected = false;
let isConnecting = false;

cli.on('error', (err) => console.error('Error connecting QUIC client', err));

const wsServer = new WebSocket.WebSocketServer({ port: 8080 });

async function send(data) {
    try {
        if (!isConnected && !isConnecting) {
            isConnecting = true;
            await cli.connect(2345);
            await cli.ping();
            isConnected = true;
            isConnecting = false;
        }

        const stream = cli.request();
        stream
            .on('error', (err) => console.error('Client stream error :', err))
            .on('data', (data) => console.info(`Receive(QUIC) : ${data.toString()}`))
            .on('end', () => {
                console.info('End stream');
                isConnected = false;
            })
            .on('finish', () => console.info('Complete stream'));

        stream.write(data);
        stream.end();

        await new Promise(resolve => cli.once('close', resolve));
    } catch (err) {
        console.error('Error connecting QUIC client:', err);
        isConnected = false;
        isConnecting = false;
    }
}

wsServer.on('connection', (ws) => {
    console.log('WebSocket client connected.');

    ws.on('message', (message) => {
        console.log('Receive(WS) : ', message);

        send(message).then(() => console.log('Data transfer complete')).catch(console.error);
        ws.send(message)
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});
