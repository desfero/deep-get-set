(function (global, factory) {
    'use strict';
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.deepli = factory()
}(this, (function () {
    'use strict';
    var hasOwnProp = Object.prototype.hasOwnProperty;

    function deep (obj, path, value) {
        return (arguments.length === 3) ? set.apply(null, arguments) : get.apply(null, arguments);
    }

    function get (obj, path) {
        var keys = prepareKeys(path)
                    .map(function (key) { return key.name });
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!obj || !hasOwnProp.call(obj, key)) {
                obj = undefined;
                break;
            }
            obj = obj[key];
        }
        return obj;
    }

    function set (obj, path, value) {
        var keys = prepareKeys(path);

        for(var i = 0; i < keys.length - 1; ++i) {
            var key = keys[i];
            var isOwnProperty = hasOwnProp.call(obj, key.name);

            if(!isOwnProperty || (isOwnProperty && obj[key.name] == null)) {
                obj[key.name] = (i < keys.length - 1) && keys[i+1].isArray ? [] : {};
            }

            obj = obj[key.name];
        }

        obj[keys[i].name] = value;
        return value;
    }

    function prepareKeys(path) {
        return path.split('.').reduce(function (p, c) {
            return p.concat(extractKey(c));
        }, []);
    }

    function extractKey(key) {
        var regExp = /([\d\w]*)\[(\d+)\]/g;
        var match = regExp.exec(key), subMatch;

        if (match !== null) {
            var matchArray = match.slice(2).map(function (key) {
                return {
                    name: key,
                    isArray: true
                }
            });

            while ((subMatch = regExp.exec(key)) !== null) {
                matchArray = matchArray.concat(subMatch.slice(2).map(function (key) {
                    return {
                        name: key,
                        isArray: true
                    }
                }));
            }

            if (match[1]) {
                matchArray.unshift({
                    name: match[1],
                    isArray: false
                });
            }

            return matchArray;
        }

        return {
            name: key,
            isArray: false
        };
    }

    return deep;
})));