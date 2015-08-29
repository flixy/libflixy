var io = require('socket.io-client');
var util = require('util');

// TODO make this easily changeable? is this even our job? should we just let
// the extensions deal with this?
function Flixy(opts) {
  var self = this;

  var host = util.format("http%s://%s:%s", (opts.https ? 's' : ''), opts.host, opts.port);
  this.socket = io(host);
  this.nick = null;

  this.cadmium = null;

  this.SetNetflixCadmium = function(cad) {
    // test for cadmium methods
  };

  this.JoinSyncSession = function(sid) {
    self.socket.emit('flixy join', JSON.encode({ session_id: sid, nick: self.nick }));
  };

  this.SetNick = function(nick) {
    self.nick = nick;
  };
}

Object.defineProperty(Flixy.prototype, "NetflixCadmium", {
  get: function() { return this.cadmium; },
  set: function(newCadmium) { this.SetNetflixCadmium(newCadmium); },
});

Object.defineProperty(Flixy.prototype, "Nick", {
  get: function() { return this.nick; },
  set: function(newNick) { this.SetNick(newNick); },
});
