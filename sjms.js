var Event = (function () {
  var clientList = {},
    listen,
    emit,
    remove;
  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  }

  emit = function () {
    var key = Array.prototype.shift.call(arguments);
    fns = clientList[key];
    if (!fns || fns.length === 0) {
      return;
    }
    for (var i = 0, fn = fns[i]; i < fns.length; i++) {
      fn.apply(this, arguments)
    }
  }

  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) return;
    if (!fn) {
      fns.length = 0;
    } else {
      for (var i = fns.length - 1; i >= 0; i--) {
        if (fns[i] === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
  return {
    listen: listen,
    emit: emit,
    remove: remove
  }
})();


