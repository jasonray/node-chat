var net  = require("net");
var chatServer = net.createServer();
var clientList = [];

chatServer.on('connection', function(client) {
	client.name = client.remoteAddress + ":" + client.remotePort;

	clientList.push(client);

	client.on('data', function(data) {
		var message = client.name + " => " + data;
		broadcast(message,client);
	});

	broadcast(client.name + ' has joined\n');
	client.write('Hi! ' + client.name + '\n');

});

function broadcast(message, client) {
	console.log(message);
	for (var i=0;i<clientList.length;i++) {
		if (client != clientList[i]) {
			clientList[i].write(message);
		}
	}
}

chatServer.listen(9000);