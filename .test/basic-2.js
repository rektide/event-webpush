var
  assert= require( "assert"),
  EventWebPush= require( ".."),
  spdy= require( "spdy"),
  server= require("./server-1")

var spdyAgent= new spdy.createAgent({
  host: 'localhost',
  port: 8433,
  ca: server.cert,
  rejectUnauthorized: false
})

EventWebPush.on( "push", function( push){
	console.log( "got push")
	push.on( "data", function(){
		console.log( "data")
	})
	push.on( "end", function(){
		console.log( "close")
		spdyAgent.close()
		server.close()
	})
})

EventWebPush.get({
  host: 'localhost',
  path: '/',
  agent: spdyAgent
}, function(res){
	assert.equal(res.statusCode, 200)
	console.log("response received")
})
