module.exports = (function(){

  // Public facing API
  function API() {
    // Do Objects actually Need to be 'new'..?
    return  {
      status    : new Status(),
      listeners : new Listener()
    };
  } 
  // Scope - Private Object to pass data between both Status and Listener Instances.
  var Scope = {
    status         : -1, // current status
    stateListeners : {}, // status listeners kept here
    republic : {         // the 'republic' of states - where new states are added
      "testing" : 0,
      "init"    : 1
    },
    humanise : function(state) { // humanise status string into index position of stateListener
      // does key string exist
      if(this.republic[state]) {
        return Object.keys(this.republic)[state]; // return key integer value
      } else {
        return null
      }
    }
  } 

  function Status() {
    
    return this;  
  }
  var s = Status.prototype;
  // get all available state names, or current state
  s.get = function(current) {
    return (!current)? Scope.republic : Scope.status;
  };
  // add a new state
  s.add = function(state) {
    Scope.republic[state] = key
  }
  // set current state
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

    } else {
      console.log('That State has not been added.');
    }
  }
  // when a state is set - fire the method attached
  s.on = function(status, method) {
    
    if (!Scope.stateListeners.hasOwnProperty(status)) {
      Scope.stateListeners[status] = [];
    } 
    Scope.stateListeners[status].push(method);
  }

  // Create window event listeners
  function Listener(){
    
    this.eventListeners = {}; // key = event : array = subscribers
    
    return this;
  }
  var l = Listener.prototype;
  // build new add eventListener - ie 'mousemove', and stipulate return object
  l.create = function(event, returns) {
    $this = this;
    this.eventListeners[event] = []; // todo:: add to, not overwrite if exists

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
  // add a method to a eventListener
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