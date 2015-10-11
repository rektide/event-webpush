var
  assert= require( "assert"),
  EventWebPush= require( ".."),
  spdy= require( "spdy")

EventWebPush.on( "push", function(){
	console.log( "push")
})

var spdyAgent= new spdy.createAgent({
  host: 'www.google.com',
  port: 443
})

EventWebPush.get({
  host: 'www.google.com',
  path: '/',
  agent: spdyAgent
}, function(res){
	assert.equal(res.statusCode, 200)
	spdyAgent.close()
	console.log("response received")
})
