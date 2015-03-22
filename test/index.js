var azar = require('../index');
var expect = require('chai').expect;

describe('Azar', function() {

  it('should generate repeatable random numbers', function() {

    azar.seed(6);

    expect(azar.pickInt(0,6)).to.be.equal(4);
    expect(azar.pickInt(0,6)).to.be.equal(2);
    expect(azar.pickInt(0,6)).to.be.equal(4);
    expect(azar.pickInt(0,6)).to.be.equal(6);
    expect(azar.pickInt(0,6)).to.be.equal(4);

  });

  it('should roll fudge dices', function() {

    for (var i = 0; i < 1000; i++) {
      expect(azar.fudge()).to.be.within(-1,1);
    }

  });

  it('should roll 6 side dices', function() {

    for (var i = 0; i < 1000; i++) {
      expect(azar.dice(6)).to.be.within(1,6);
    }

  });

  it('should roll six 6 side dices', function() {

    for (var i = 0; i < 1000; i++) {
      expect(azar.roll('6d6')).to.be.within(6,36);
    }

  });

});
