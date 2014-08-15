module.exports = (function(){

	function API() {
		return  {
			status 		: new Status(),
			listeners : new Listener()
		};
	}	

	var Scope = {
		status 				 : -1,
		stateListeners : {},
		republic : {
			"initialising" : 0,
			"testing" 		 : 1
		},
		humanise : function(key) { // humanise status string into index position of stateListener
			if(key >= 0) {
				return Object.keys(this.republic)[key];
			} else {
				return null
			}
		}
	}	

	function Status() {
		
		return this;	
	}
	var s = Status.prototype;

	s.get = function(current) {
		return (!current)? Scope.republic : Scope.status;
	};
	s.add = function(state) {
		Scope.republic[state] = key
	}
	s.set = function(state) {
		// is there a viable state to set?
		if(Scope.republic.hasOwnProperty(state)){
			Scope.status = Scope.republic[state];

			// run through status change events - if there are any
			if(Scope.stateListeners.hasOwnProperty(state)){
				Scope.stateListeners[state].forEach(function(callback, i){
					callback();
				})
			} 

		}	else {
			console.log('That State has not been added.');
		}
	}
	s.on = function(status, method) {
		
		if (!Scope.stateListeners.hasOwnProperty(status)) {
      Scope.stateListeners[status] = [];
    } 
    Scope.stateListeners[status].push(method);
	}

	function Listener(){
		
		this.eventListeners = {}; // key = event : array = subscribers
		
		return this;
	}
	var l = Listener.prototype;

	l.create = function(event, returns) {
		$this = this;
		this.eventListeners[event] = []; // add to, not overight if exists

		window.addEventListener(type, function (e) {
			var props = returns(e);
			
			$this.eventListeners[type].forEach(function (cb){
				// fire event on listener dependant on status
				if(cb.status === Scope.humanise(Scope.status) || cb.status === null){
					cb.action.apply(null, [props]);	
				}
			})
		})
	}
	l.add = function(type, func, status) {
		
		var method = {
      name: (func.name)? func.name : 'eventListenerAction',
      action: func,
      status: (status)? status : null
    };
    this.eventListeners[type].push(method);
	};
	
	return new API();

})();