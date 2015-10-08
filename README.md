# Event-WebPush

Event-WebPush provides an http consumer alike `http`, but which is also an event emitter reporting all HTTP2 Push resources as `push` events.

# API

The default export is such an instance which will report all events.

There is also a `EventWebPush` export from the module which can be used to create an consumer+event emitter. Note that Pushed resources will also appear on the global event emitter.

# Agents

This functionality relies on `spdy`. In default cases where no agent is specified or a new agent is requested (via the `agent: false` option), Event-WebPush will create a spdy agent, which is required for Push capability.
