
var http = require('http');
var util = require('util');
var env = process.env;
var obj = { action : "test", version: 1.0    };
 
function processa(request, response)
{
   if(conCount <= 3)
   {	
	console.log("Incoming request method " + request.method + " asking for " + request.url);
	var data =  JSON.stringify(obj);//"Mi hai chiamato, sono qui";
	
	var data_len = data.length;
	response.writeHead("200", { "Content-Lenght":data_len, "Content-Type":"text/plain" });
	response.end(data);
	}
	else
	{
		response.writeHead("500", {"Content-Type":"text/plain" });
		response.end("Max number of connection reached");
	}
}


var web = http.createServer(processa);
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002;
var ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

web.listen(port, ip, function () {
  console.log('Application worker ' + process.pid + ' started ...');// ${process.pid} started...");
});

var conCount = 0;
web.on("connection", function(stream)
{
	console.log("Connection established :" + conCount++);
	//console.log(util.inspect(stream));
});
/*
web.once("connection", function(stream)
{
	console.log("1^ Connection");
	console.log(util.inspect(stream));
});
*/