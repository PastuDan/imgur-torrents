const Server = require('bittorrent-tracker').Server;

var server = new Server({
    udp: true, // enable udp server? [default=true]
    http: true, // enable http server? [default=true]
    ws: true, // enable websocket server? [default=true]
    stats: true, // enable web-based statistics? [default=true]
    filter: function (infoHash, params, cb) {
        // Blacklist/whitelist function for allowing/disallowing torrents. If this option is
        // omitted, all torrents are allowed.
        console.log(`got infoHash: ${infoHash}`, params);
        cb(null)
    }
});

server.on('error', function (err) {
    // fatal server error!
    console.log(err.message)
});

server.on('warning', function (err) {
    // client sent bad data. probably not a problem, just a buggy client.
    console.log(err.message)
});

server.on('listening', function () {
    // fired when all requested servers are listening
    console.log('listening on http port:' + server.http.address().port)
    console.log('listening on udp port:' + server.udp.address().port)
});

// start tracker server listening! Use 0 to listen on a random free port.
server.listen('8800', 'localhost');

// listen for individual tracker messages from peers:

server.on('start', function (addr) {
    console.log('got start message from ' + addr)
});

server.on('complete', function (addr) {});
server.on('update', function (addr) {});
server.on('stop', function (addr) {});

setInterval(() => {
    Object.keys(server.torrents).forEach(infoHash => {
        console.log(`peer info for ${infoHash}`, server.torrents[infoHash].peers.cache[server.torrents[infoHash].peers.tail])
    });
}, 2000);
