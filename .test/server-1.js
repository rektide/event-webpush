var
  fs = require( "fs"),
  selfsigned= require( "selfsigned"),
  spdy = require( "spdy")

var
  ss= selfsigned.generate({ subj: "/CN=localhost", days: 365}),
  options= {
    key: ss.private,
    cert: ss.cert,
    ca: ss.public,
    spdy: {
      protocols: [ "h2"],
    }
  }

fs.writeFile("./server-cert.pem", options.cert)

var page= "<html><body><script type='text/javascript'>setTimeout(function(){"+
"var s= document.createElement('script'); s.setAttribute('src', '/foo.js'); document.body.appendChild(s);"+
"}, 1000)</script><p>hello via h2</p></body></html>"

var server = spdy.createServer(options, function(req, res) {
	console.log(req.url)
	var stream = res.push("/foo.js", {
	  request: {
	    accept: "*/*"
	  },
	  response: {
	    "Content-Type": "application/javascript"
	  }
	})
	stream.on("error", function(err) {
		console.log("push error")
	})
	stream.end("console.log(2+2);")

	res.writeHead(200, {
		"Content-Type": "text/html"
	})
	res.end(page)
})
server.listen(8433)

module.exports= server
module.exports.options= options
module.exports.ca= options.ca
module.exports.cert= options.cert
module.exports.key= options.key
