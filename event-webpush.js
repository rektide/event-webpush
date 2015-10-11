var
  events= require( "events"),
  util= require( "util"),
  spdy,
  _agent,
  _https= require( "https"),
  _global

function EventWebPush( https){
	if( !( this instanceof EventWebPush)){
		return new EventWebPush( https)
	}
	https= https|| _global
	this._get= https.get
	this._request= https._request
	var
	  self= this
	this._emit= function(stream){
		self.emit( "push", stream)
	}
	return this
}

util.inherits(EventWebPush, events.EventEmitter)

EventWebPush.prototype.get= function get( opts, cb){
	var isOptsFn= typeof(opts)=== "function"
	if( isOptsFn){
		cb= opts
		opts= {
		  agent: defaultAgent()
		}
	}else if( !isOptsFn&& opts){
		if( opts.agent=== false){
			opts.agent= agent()
		}else if( !opts.agent){
			opts.agent= defaultAgent()
		}else{
		}
	}

	var
	  get= this._get(opts, cb)
	get.on("push", this._emit)
}

EventWebPush.prototype.request= function request( opts, cb){
	var isOptsFn= typeof(opts)=== "function"
	if( isOptsFn){
		cb= opts
		opts= {
		  agent: defaultAgent()
		}
	}else if( !isOptsFn&& opts){
		if( opts.agent=== false){
			opts.agent= agent()
		}else if( !opts.agent){
			opts.agent= defaultAgent()
		}else{
		}
	}

	var
	  request= this._request(opts, cb)
	request.on("push", this._emit)
}

EventWebPush.prototype.createAgent= function createAgent( opts){
	return spdy.createAgent( opts|| {})
}

function agent(){
	if( spdy){
		return spdy.createAgent()
	}
	spdy= require( "spdy")
	return spdy.createAgent({})
}

function defaultAgent(){
	if( _agent){
		return _agent
	}
	_agent= agent()
	return _agent
}

_global= EventWebPush( _https)

module.exports= _global
module.exports.EventWebPush= EventWebPush
