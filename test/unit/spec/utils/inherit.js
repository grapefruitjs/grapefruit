describe('inherit', function() {
	var Parent,
		Child,
		child;

	beforeEach(function() {
		//parent
		Parent = function() {};
		gf.inherit(Parent, Object, {
			pConst: 100,
			pMethod: function() {}
		});

		//child
		Child = function() {
			Parent.call(this);
		};
		gf.inherit(Child, Parent, {
			pConst: 'string',
			cMethod: function() {}
		});
		Child.prototype.cMethod2 = function() {};

		//child instance
		child = new Child();
	});

	it('should set the child constructor', function() {
		child.constructor.should.equal(Child);
	});

	it('should have the proper prototypes', function() {
		Object.getPrototypeOf(child).should.equal(Child.prototype);
		Object.getPrototypeOf(Object.getPrototypeOf(child)).should.equal(Parent.prototype);
	});

	it('should be an instance of Child and Parent', function() {
		child.should.be.instanceOf(Child);
		child.should.be.instanceOf(Parent);
	});

	it('should have the proper methods', function() {
		child.pMethod.should.equal(Parent.prototype.pMethod);
		child.cMethod.should.equal(Child.prototype.cMethod);
		child.cMethod2.should.equal(Child.prototype.cMethod2);
	});

	it('should have the proper members', function() {
		child.pConst.should.equal('string');
	});
});
