/**
 *  Thanks to @indiegamr for this algorithm:
 *  @see http://indiegamr.com/generate-repeatable-random-numbers-in-js/
 */
var azar = {

  _A: 9301,
  _B: 49297,
  _C: 233280,

  _seed: 6,

  seed: function(value) {
    this._seed = value;
  },

  pick: function() {
    return (this._seed = (this._seed * this._A + this._B) % this._C);
  },

  pickUnit: function() {
    return (this.pick() / this._C);
  },

  pickFloat: function(max, min) {
    max = max || 1;
    min = min || 0;
    return (this.pickUnit() * (max - min)) + min;
  },

  pickInt: function(max, min) {
    return Math.round(this.pickFloat(max, min));
  },

  fudge: function() {
    return this.pickInt(1, -1);
  },

  dice: function(sides) {
    return this.pickInt(sides, 1);
  },

  roll: function(dice, sum) {
    sum = sum || true;
    var matches = /([0-9]+)d([0-9]+|f)/.exec(dice);
    if (matches) {
      var count = parseInt(matches[1], 10);
      var type = matches[2];
      var result = (sum === true ? 0 : []);
      var current;
      for (var i = 0; i < count; i++) {
        if (type === 'f') {
          current = this.fudge();
        } else {
          type = parseInt(type);
          current = this.dice(type);
        }

        if (typeof result === 'number') {
          result += current;
        } else {
          result.push(current);
        }
      }
      return result;
    }
    return false;
  }

};

// UMD
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.azar = factory();
  }
}(this, function () {
  return azar;
}));
