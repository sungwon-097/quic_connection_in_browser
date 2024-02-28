const { Server } = require('quic');

const quicServer = new Server();

quicServer.on('error', (err) => {
    console.error('Error occurred in QUIC server :', err);
});

quicServer.on('session', (session) => {
    session.on('stream', (stream) => {
        stream.on('data', (data) => {
            console.log('Receive :', data.toString());
            stream.write(data);
        });
    });
});

quicServer.listen(2345)
    .then(() => {
        console.log('QUIC server is waiting on port 2345.');
    })
    .catch((err) => {
        console.error('Error starting QUIC server : ', err);
    });
