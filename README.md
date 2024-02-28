- quic_connection_in_nodejs

[NodeJS QUIC](https://github.com/nodejs/quic)  
[WebGL Networking](https://docs.unity3d.com/kr/2019.4/Manual/webgl-networking.html)  

### Introduction
QUIC(Quick UDP Internet Connections)은 UDP기반 프로토콜로 TCP와 같이 신뢰 할 수 있는 연결을 제공한다.  
그러나 브라우저 환경에서는 IP socket에 직접 접근 할 수가 없기에 WebSocket연결을 QUIC 으로 변환해 전달하는 프록시를 사용한다.

```bash
$ server.js
QUIC server is waiting on port 2345.
...

$ proxy.js
WebSocket client connected
...

$ client.js
Receive Data
...
```


