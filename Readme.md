#eso
###Events Subscriber with Status Control
---
<sup>version 0.1.3</sup>  
A `Common JS` Module, that I really should publish onto `NPM`.
The point of this "*__pubsub emitter__*", is to sit at a top level of an app instance, ie: `app.emitter`, and allow you to _create_ app `States` and `Events`, and use them together, or at least as a place to keep an organised record of your window events with their relative functions associated.

The Module itself works by returning an __API__ as on `require` self executes and instantiates __new__ instances of the `Status` and `Listener` Objects. They both share data via their private `Scope` Object, used internally.

##API methods
__`Status`__
By keeping States, __callbacks__ can be made throughout the __app__ when the status changes, as well as limiting the execution of Events.

_params denoted with *asterix mean they are not required._

* __`get(*all:boolean)`__ Passing `true` returns the current Status, whereas ommitting the param returns __all__ the available __states__. 
* __`add(state:string)`__ Will create a new state by the name given.
* __`set(state:string)`__ Sets the current status with the name of the state given. Will fail if the state does not exist.
* __`on(state:string, callback:function)`__ When the designated state becomes __set__, the function given will be ran. Ie: _callback_ is run _on_ that _state_.

__`Listener`__
Keeping your __eventListeners__ organised, and lets you create and configure these listeners with what will be passed back to the functions you wish to fire, and whether or not they are limited by the app's current status.

* __`create(type:string, returns:Object)`__ Create a window event listener, by passing the event type ie: 'mousemove', and what the event will return, based on the original event object.
* __`add(type:string, callback:function, *status:string)`__ Adds a method to an existing eventListener, which can also be set to be only fired if the status matches the modules current scope status. The __callback__ function you give it will be passed the event object you established as the __returns__ object you stipulate in the `create` method.

##Todo's

* Add `remove` methods to API.


##Usage
__Init__

	var Emitter = require('./eso);
	
	// attach it to your App.
	app.emitter = Emitter;

__Make a state__

	app.emitter.status.add('bigbang'); // now state exists to use
	
	// pass your funtion execute when status matches
	app.emitter.status.on('bigbang', function() {
		console.log('and so it begins - quicker than you realise.');
	})
	
	// change state, and see console log for output.
	app.emitter.status.set('bigbang');
	
__Utilise Event Listeners__

	// build a window level event listener, returning cursor x co-ords
	app.emitter.listeners.create('mousemove', { x: e.clientX });
	
	// add a method to the mousemove event
	app.emitter.listeners.add('mousemove', function(res){ 
		console.log(res.x); 
	}, 'bigbang')
	
