module.exports = function(){

	var Oplus = function(obj = {}){

		Object.assign(this, obj);

		var $_$getHooks, $_$setHooks, $_$validations;

		if (obj.$_$getHooks) {
			$_$getHooks = obj.$_$getHooks.slice(0);
			$_$setHooks = obj.$_$setHooks.slice(0);
			$_$validations = obj.$_$validations.slice(0);
		} else {
			$_$getHooks = [];
			$_$setHooks = [];
			$_$validations = [];
		}

		// if passed-in object is not an Oplus instance, instantiate hook and validation arrays
		Object.defineProperty(this, '$_$getHooks', {
			enumerable: false,
			writable: true,
			configurable: true,
			value: $_$getHooks
		});

		Object.defineProperty(this, '$_$setHooks', {
			enumerable: false,
			writable: true,
			configurable: true,
			value: $_$setHooks
		});

		Object.defineProperty(this, '$_$validations', {
			enumerable: false,
			writable: true,
			configurable: true,
			value: $_$validations
		});

		var matchKey = function(key, hookKey){
			return (typeof hookKey === 'string' && key === hookKey) || (hookKey instanceof RegExp && hookKey.test(key)) || (typeof hookKey === 'function' && hookKey(key)) || (Array.isArray(hookKey) && hookKey.indexOf(key) > -1);
		};


		// create and return proxy wrapping 'this' to intercept gets and sets
		return new Proxy(this, {
			get: function(target, key){

				key = key.toString();

				if (key.indexOf('$_$bypass') === 0) {
					key = key.slice(9);
					return target[key];
				}

				// run through get hooks matching key
				target.$_$getHooks.forEach(function(hook) {
					var hookKey = hook[0];
					var hookCb = hook[1];
					if (matchKey(key, hookKey)) {
						hookCb.call(target, key);
					}
				});

				// execute and return result of primary getter (if one exists), or if none exists, returns value directly from object
				if (target['$_$get_' + key]) {
					return target['$_$get_' + key]();
				} else {
					return target[key];
				}
			},
			set: function(target, key, value){

				var passValidations = true;

				if (key.indexOf('$_$bypass') === 0) {
					key = key.slice(9);
					target[key] = value;
					return;
				}

				// run through validations

				target.$_$validations.forEach(function(validation) {
					var validationKey = validation[0];
					var chosenValidations = validation[1];

					// only run validations when key matches user-defined key for each set of validations
					if (matchKey(key, validationKey)) {
						// since multiple validations can be passed in through a single object, this loops through each one
						for (var val in chosenValidations) {
							if (chosenValidations.hasOwnProperty(val)) {
								// if validator name provided by user is built in, runs built-in validator
								if (builtInValidators[val]) {
									if (!builtInValidators[val](chosenValidations[val], value)) {
										console.log('Error: value \'' + value + '\' failed validation: ' + val + ': ' + chosenValidations[val])
										passValidations = false;
										return;
									}
								} 
								// if validator name provided by user is not built in, runs user-provided validator function
								else {
									if (!chosenValidations[val](value)) {
										console.log('Error: value \'' + value + '\' failed validation: ' + val)
										passValidations = false;
										return;
									}
								}
							}
						}
					}

				});

				if (passValidations) {
					// run through set hooks matching key
					target.$_$setHooks.forEach(function(hook) {
						var hookKey = hook[0];
						var hookCb = hook[1];
						if (matchKey(key, hookKey)) {
							hookCb.call(target, key, value);
						}
					});

					// execute and return result of primary setter (if one exists), or if none exists, sets value directly on object
					if (target['$_$set_' + key]) {
						target['$_$set_' + key](value);
					} else {
						target[key] = value;
					}
				}
			}
		});

	};

	Oplus.prototype.bypass = function(key, value = '$_$') {

		key = '$_$bypass' + key;

		if (value === '$_$') {
			return this[key];
		} else {
			this[key] = value;
		}

	};

	Oplus.prototype.hook = function(type, key, cb) {

		if (type.toLowerCase() === 'get') {
			this.$_$getHooks.push([key, cb]);
		} else if (type.toLowerCase() === 'set') {
			this.$_$setHooks.push([key, cb]);
		}

		return this;
	};

	Oplus.prototype.addGetHook = function(key, cb) {

		// push a hook onto the getHooks array

		this.$_$getHooks.push([key, cb]);

		return this;
	};

	Oplus.prototype.addSetHook = function(key, cb) {

		// push a hook onto the setHooks array

		this.$_$setHooks.push([key, cb]);

		return this;
	};

	Oplus.prototype.validate = function(key, validators) {

		// push a set of validations onto the validations array
			
		this.$_$validations.push([key, validators]);
		
		return this;
			
	};


	Oplus.prototype.getter = function(key, cb) {

		// set a property's primary getter method

		Object.defineProperty(this, '$_$get_' + key, {
			enumerable: false,
			writable: true,
			configurable: true,
			value: cb
		});
	};

	Oplus.prototype.setter = function(key, cb) {

		// set a property's primary setter method

		Object.defineProperty(this, '$_$set_' + key, {
			enumerable: false,
			writable: true,
			configurable: true,
			value: cb
		});

	};

	var builtInValidators = {
		matchRegExp: function(setting, value){return setting.test(value);},
		isNull: function(setting, value){return prop === null ? setting : !setting;},
		isAlpha: function(setting, value){return /^[a-zA-Z]+$/.test(value) === setting;},
		isAlphanumeric: function(setting, value){return /^[a-zA-Z0-9]+$/.test(value) === setting;},
		isString: function(setting, value){return typeof value === 'string' ? setting : !setting;},
		isNumber: function(setting, value){return typeof value === 'number' ? setting : !setting;},
		isArray: function(setting, value){return Array.isArray(value) ? setting : !setting;},
		isFunction: function(setting, value){return typeof value === 'function' ? setting : !setting;},
		isObject: function(setting, value){return typeof value === 'object' ? setting : !setting;},
		isBoolean: function(setting, value){return typeof value === 'boolean' ? setting : !setting;},
		isInteger: function(setting, value){return typeof value === 'number' && value === Math.floor(value) ? setting : !setting;},
		isFloat: function(setting, value){return typeof value === 'number' && value !== Math.floor(value) ? setting : !setting;},
		isLowercase: function(setting, value){return value === value.toLowerCase() ? setting : !setting;},
		isUppercase: function(setting, value){return value === value.toUpperCase() ? setting : !setting;},
		equals: function(setting, value){return value === setting;},
		contains: function(setting, value){return value.indexOf(setting) > -1;},
		notContains: function(setting, value){return value.indexOf(setting) === -1},
		minLength: function(setting, value){return value.length >= setting;},
		maxLength: function(setting, value){return value.length <= setting;},
		min: function(setting, value){return value >= setting},
		max: function(setting, value){return value <= setting}
	};

	return Oplus;

}();





