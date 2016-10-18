# O-Plus

O-plus is a library that enables Javascript objects to register and execute middleware functions and validations.

### Installation

Clone the repo and install dependencies.

```bash
$ cd o-plus
$ npm install
```

To experiment with the library, run npm start inside the directory and edit the demonstration.js file.

### Usage

O-plus should be used as a constructor function to create a new enhanced object or to clone, enhance, and return an already-existing object.

```js
const Oplus = require('./o-plus.js');

let obj1 = new Oplus();
    // or 
let obj2 = {sample: 'data'};
let obj3 = new Oplus(obj2);
```
Enhanced objects have five primary methods to register and/or bypass middleware:
##### .hook(type, key, cb)
An enhanced object's hook method takes three parameters:
- type: &nbsp;&nbsp;&nbsp; either 'set' or 'get'
- key:
    - a string (execute callback when an object's property matches string directly)
    - an array (execute callback when an object's property matches an element in the array directly)
    - a regular expression (execute callback when an object's property matches regex)
    - a function (execute callback when an object's property makes function evaluate to true)
- callback: &nbsp;&nbsp;&nbsp; function to execute when hook is triggered
    - the callback function for a get hook is passed the key as a parameter
    - the callback function for a set hook is passed the key and value as parameters

Example:
```js
let obj1 = new Oplus();

obj1
    .hook('set', ['name', 'age'], function(key, value) {console.log('The ' + key + ' property was set to ' + value + '.')})
    .hook('get', 'name', function(key) {'The value for ' + key + ' was retrieved.'});
    
obj1.name = 'Bob';
// 'The name property was set to Bob.'
obj1.age = 25;
// 'The age property was set to 25.'
obj1.name
// 'The value for name was retrieved.'
```
##### .validate(key, validators)
An enhanced object's validate method takes two parameters:
- key:
    - a string (execute callback when an object's property matches string directly)
    - an array (execute callback when an object's property matches an element in the array directly)
    - a regular expression (execute callback when an object's property matches regex)
    - a function (execute callback when an object's property makes function evaluate to true)
- validators: &nbsp;&nbsp;&nbsp; an object containing built-in validations and/or custom validation functions 
    - the following validators are built in:
        -   matchRegExp
        -   isNull
        -   isAlpha
        -   isAlphanumeric
        -   isString
        -   isNumber
        -   isArray
        -   isFunction
        -   isObject
        -   isBoolean
        -   isInteger
        -   isFloat
        -   isLowercase
        -   isUppercase
        -   equals
        -   contains
        -   notContains
        -   minLength
        -   maxLength
        -   min
        -   max
    -  alternatively, a user may create their own validation function
Example:
```js
let obj1 = new Oplus();
obj1
    .validate('age', {
        isInteger: true,
        isEven: function(value){return value%2===0}
    });
    
obj1.age = 'Bob';
// 'Error: value 'Bob' failed validation: isInteger: true'
obj1.age = 25;
// 'Error: value '25' failed validation: isEven'
obj1.age = 24;
console.log(obj1.age);
// 24
```
##### .getter(key, cb)
An enhanced object's getter method takes two parameters:
- key: &nbsp;&nbsp;&nbsp; a string
- callback: &nbsp;&nbsp;&nbsp; function to execute when object property matching key is retrieved
    - while an enhanced object can have an unlimited number of hooks, it can only have one getter per property

Example:
```js
let obj1 = new Oplus();

obj1
    .getter('name', function() {return this.name.slice(0, 5)});

obj1.name = 'Christopher';
console.log(obj1.name);
// 'Chris'
```
##### .setter(key, cb)
An enhanced object's setter method takes two parameters:
- key: &nbsp;&nbsp;&nbsp; a string
- callback: &nbsp;&nbsp;&nbsp; function to execute when object property matching key is set
    - while an enhanced object can have an unlimited number of hooks, it can only have one setter per property

Example:
```js
let obj1 = new Oplus();

obj1
    .setter('name', function(value) {this.name = 'Hello my name is ' + value});

obj1.name = 'Bob';
console.log(obj1.name);
// 'Hello my name is Bob'
```
##### .bypass(key[, value])
Enhanced objects are also provided with a bypass method, which takes up to two parameters.  

If called with a single parameter, O-plus interprets the call as a get, and will bypass any getter or get hooks to retrieve the requested property.

If called with two parameters, O-plus interprets the call as a set, and will bypass any setter, validations, or set hooks to set the requested property.

License
----

MIT