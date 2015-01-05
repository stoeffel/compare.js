var compare = require('./index.js'),
  caseInsensitive = compare.caseInsensitive,
  simple = compare.simple,
  desc = compare.desc,
  date = compare.date,
  property = compare.property,
  sinon = require('sinon');
  expect = require('expect.js');

describe('Comparator', function() {

  describe('#simple', function() {
    it('should return -1, 0 or 1', function() {
      expect(simple()).to.be.a('function');
      expect(simple().length).to.equal(2);

      expect(simple()(0, 0)).to.equal(0);
      expect(simple()(1, 1)).to.equal(0);
      expect(simple()(-1, -1)).to.equal(0);

      expect(simple()(-1, 0)).to.equal(-1);
      expect(simple()(0, 1)).to.equal(-1);
      expect(simple()(-2, -1)).to.equal(-1);
      expect(simple()(-3, -1)).to.equal(-1);

      expect(simple()(1, 0)).to.equal(1);
      expect(simple()(0, -1)).to.equal(1);
      expect(simple()(-1, -2)).to.equal(1);
      expect(simple()(-1, -3)).to.equal(1);
    });
  });

  describe('#desc', function() {
    it('should return -1, 0 or 1', function() {
      expect(desc()).to.be.a('function');
      expect(desc().length).to.equal(2);

      expect(desc()(0, 0)).to.equal(0);
      expect(desc()(1, 1)).to.equal(0);
      expect(desc()(-1, -1)).to.equal(0);

      expect(desc()(-1, 0)).to.equal(1);
      expect(desc()(0, 1)).to.equal(1);
      expect(desc()(-2, -1)).to.equal(1);
      expect(desc()(-3, -1)).to.equal(1);

      expect(desc()(1, 0)).to.equal(-1);
      expect(desc()(0, -1)).to.equal(-1);
      expect(desc()(-1, -2)).to.equal(-1);
      expect(desc()(-1, -3)).to.equal(-1);
    });

    it('should use the given comparator', function() {
      var spy = sinon.stub().returns(function(){
        return -1;
      });

      expect(desc(spy())(1, 2)).to.equal(-1);
      expect(spy.called).to.be.ok();

      expect(desc(simple())).to.be.a('function');
      expect(desc(simple()).length).to.equal(2);
      
      expect(desc(simple())(0, 0)).to.equal(0);
      expect(desc(simple())(1, 1)).to.equal(0);
      expect(desc(simple())(-1, -1)).to.equal(0);
      
      expect(desc(simple())(-1, 0)).to.equal(1);
      expect(desc(simple())(0, 1)).to.equal(1);
      expect(desc(simple())(-2, -1)).to.equal(1);
      expect(desc(simple())(-3, -1)).to.equal(1);
      
      expect(desc(simple())(1, 0)).to.equal(-1);
      expect(desc(simple())(0, -1)).to.equal(-1);
      expect(desc(simple())(-1, -2)).to.equal(-1);
      expect(desc(simple())(-1, -3)).to.equal(-1);
    });
  });

  describe('#property', function() {
    it('should return -1, 0 or 1', function() {
      var foo = {
        name: 'foo'
      };
      var bar = {
        name: 'bar'
      };

      expect(property()).to.be.a('function');
      expect(property().length).to.equal(2);

      expect(property('name')(foo, foo)).to.equal(0);
      expect(property('name')(bar, foo)).to.equal(-1);
      expect(property('name')(foo, bar)).to.equal(1);
      expect(desc(property('name'))(foo, bar)).to.equal(-1);
      expect(property('name', desc())(foo, bar)).to.equal(-1);
    });
  });

  describe('#date', function() {
    it('should return -1, 0 or 1', function() {
      expect(date()).to.be.a('function');
      expect(date().length).to.equal(2);

      expect(date()(new Date('2015', '01', '31'), new Date('2015', '02', '1'))).to.equal(1);
      expect(date()(new Date('2015', '02', '1'), new Date('2015', '01', '31'))).to.equal(-1);
      expect(date()(new Date('2015', '02', '1'), new Date('2015', '02', '1'))).to.equal(0);
      expect(desc(date())(new Date('2015', '02', '1'), new Date('2015', '01', '31'))).to.equal(1);
    });
  });

  describe('#caseInsensitive', function() {
    it('should return -1, 0 or 1', function() {
      expect(caseInsensitive()).to.be.a('function');
      expect(caseInsensitive().length).to.equal(2);

      expect(caseInsensitive()('a', 'A')).to.equal(0);
      expect(caseInsensitive()('A', 'a')).to.equal(0);
      expect(caseInsensitive()('a', 'B')).to.equal(-1);
      expect(caseInsensitive()('A', 'b')).to.equal(-1);
      expect(caseInsensitive()('B', 'a')).to.equal(1);
      expect(caseInsensitive()('b', 'A')).to.equal(1);

      expect(caseInsensitive(desc())('a', 'B')).to.equal(1);
      expect(caseInsensitive(desc())('A', 'b')).to.equal(1);
      expect(caseInsensitive(desc())('B', 'a')).to.equal(-1);
      expect(caseInsensitive(desc())('b', 'A')).to.equal(-1);
    });
  });
});
