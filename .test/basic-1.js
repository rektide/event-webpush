var
  assert= require("assert"),
  EventWebPush= require(".."),
  http= EventWebPush

EventWebPush.on( "push", function(){
	console.log( "push")
})

EventWebPush.get({
  hostname: 'www.google.com',
  host: 'www.google.com',
  port: 80,
  path: '/'
}, function(res){
	assert.equal(res.statusCode, 200)
})
