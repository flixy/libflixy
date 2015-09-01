var io = require('socket.io-client');
var util = require('util');

// TODO make this easily changeable? is this even our job? should we just let
// the extensions deal with this?
function Flixy(opts) {
  var self = this;
  this.Opts = opts;
  this.nick = null;
  this.socket = null;

  this.cadmium = null;
}
Flixy.prototype.ConnectToFlixyServer = function(hoststring) {
  self.socket = io(hoststring);
  io.on('flixy sync', this.UpdateSession.bind(this));
  io.on('flixy new session', this.UpdateSession.bind(this));
  io.on('flixy join session', this.UpdateSession.bind(this));
  io.on('flixy invalid new init map', function(map){
    throw {
      error: "invalid new init map",
      wrong_map: map,
    };
  });
  io.on('flixy invalid session id', function(invalid_sid){
    throw {
      error: "invalid session ID sent",
      invalid_sid: invalid_sid,
    };
  });
};

Flixy.prototype.UpdateSession = function(update) {
};

Flixy.prototype.SetNetflixCadmium = function(cad) {
  // test for cadmium methods
};

Flixy.prototype.JoinSyncSession = function(sid) {
  if(this.socket) {
    this.socket.connect();
    this.socket.emit('flixy join', JSON.encode({ session_id: sid, nick: this.nick }));
  } else {
    throw {
      error: "Tried to use a non-existent socket — you must initialize the socket first!"
    };
  }
};

Flixy.prototype.LeaveSyncSession = function() {
  if(this.socket) {
    this.socket.disconnect();
  } else {
    throw {
      error: "socket was null — were you even in a sync session in the first place?"
    };
  }
};

Flixy.prototype.SetNick = function(nick) {
  this.nick = nick;
};

Object.defineProperty(Flixy.prototype, "NetflixCadmium", {
  get: function() { return this.cadmium; },
  set: function(newCadmium) { this.SetNetflixCadmium(newCadmium); },
});

Object.defineProperty(Flixy.prototype, "Nick", {
  get: function() { return this.nick; },
  set: function(newNick) { this.SetNick(newNick); },
});

module.exports = Flixy;
