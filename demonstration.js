var Oplus = require('./o-plus');

var superObj = new Oplus();

// console.log(superObj);

// superObj
// 	.hook('set', 'name', function() {console.log('setting name')})
// 	.hook('set', 'name', function() {console.log('set name hook #2')})
// 	.hook('get', 'name', function() {console.log('getting name')})
// 	.validate('name', {
// 		isString: true,
// 		minLength: 5,
// 		maxLength: 20,
// 		zekeChecker: function(value){return value.split(' ')[0] === 'Zeke'}
// 	})

// superObj.name = 'Zeke Nierenberg';
// superObj.name = 5;
// superObj.name = 'Zeke';
// superObj.name = 'String longer than twenty characters';
// superObj.name = 'Zek Nierenberg'
// console.log(superObj.name)

//**************************************************

// superObj.nameLog = [];

// superObj
// 	.hook('set', 'name', function() {console.log('setting name')})
// 	.hook('set', 'name', function(key, value){this.nameLog.push('Name set to ' + value + ' at ' + new Date())});

// superObj.name = 'Zeke Nierenberg';

// setTimeout(function(){ superObj.name = 'Nick Drane'; }, 2000)
// setTimeout(function(){ superObj.name = 'Belinda Lai'; }, 4000)
// setTimeout(function(){ console.log(superObj.nameLog) }, 5000)

//**************************************************

// superObj
// 	.hook('set', 'a', function(){console.log('fires when key is \'a\'')})
// 	.hook('set', ['b', 'c', 'd'], function(key){console.log('fires when key is \'b\', \'c\', or \'d\' -- ' + key)})
// 	.hook('set', /^data/, function(key){console.log('fires when key starts with \'data\' -- ' + key)})
// 	.hook('set', function(key){return +key > 10}, function(key){console.log('fires when key is a number greater than 10 -- ' + key)})

// superObj.a = 'hello'
// superObj.b = 'hello'
// superObj.c = 'hello'
// superObj.d = 'hello'
// superObj.e = 'hello'
// superObj.data_z = 'hello'
// superObj.zdata = 'hello'
// superObj[9] = 'hello'
// superObj[11] = 'hello'

//**************************************************

// superObj.setter('name', function(value){this.name = "My name is " + value})

// superObj.name = 'Zeke'

// console.log(superObj.name)

// superObj.getter('name', function(){return this.name.slice(0, 6)})

// console.log(superObj.name)

//**************************************************

// var validationObj = {
// 	isString: true,
// 	minLength: 5,
// 	maxLength: 20
// };

// superObj
// 	.validate('name', validationObj)

// var person1 = new Oplus(superObj);
// var person2 = new Oplus(superObj);

// person1
// 	.hook('set', 'name', function(){console.log('set hook for person1')});
// person2
// 	.hook('set', 'name', function(){console.log('set hook for person2')});

// person1.name = 'Zeke'
// person2.name = 'Nick'
// person1.name = 'Zeke Nierenberg'
// person2.name = 'Nick Drane'

// console.log(person1)
// console.log(person2)

// person1.bypass('name', 'Chris')
// console.log(person1.bypass('name'))

