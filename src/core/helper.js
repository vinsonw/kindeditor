// /**/ var undefined

if (!window.console) {
  window.console = {}
}
if (!console.log) {
  console.log = function () {}
}

export {
  _VERSION,
  _ua,
  _IE,
  _NEWIE,
  _GECKO,
  _WEBKIT,
  _OPERA,
  _MOBILE,
  _IOS,
  _QUIRKS,
  _IERANGE,
  _matches,
  _V,
  _TIME,
  _isArray,
  _isFunction,
  _inArray,
  _each,
  _trim,
  _inString,
  _addUnit,
  _removeUnit,
  _escape,
  _unescape,
  _toCamel,
  _toHex,
  _toMap,
  _toArray,
  _undef,
  _invalidUrl,
  _addParam,
  _extend,
  _json,
  _round
}

var _VERSION = '${VERSION}',
  _ua = navigator.userAgent.toLowerCase(),
  _IE = _ua.indexOf('msie') > -1 && _ua.indexOf('opera') == -1,
  _NEWIE = _ua.indexOf('msie') == -1 && _ua.indexOf('trident') > -1,
  _GECKO = _ua.indexOf('gecko') > -1 && _ua.indexOf('khtml') == -1,
  _WEBKIT = _ua.indexOf('applewebkit') > -1,
  _OPERA = _ua.indexOf('opera') > -1,
  _MOBILE = _ua.indexOf('mobile') > -1,
  _IOS = /ipad|iphone|ipod/.test(_ua),
  _QUIRKS = document.compatMode != 'CSS1Compat',
  _IERANGE = !window.getSelection,
  _matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(_ua),
  _V = _matches ? _matches[1] : '0',
  _TIME = new Date().getTime()

function _isArray(val) {
  if (!val) {
    return false
  }
  return Object.prototype.toString.call(val) === '[object Array]'
}

function _isFunction(val) {
  if (!val) {
    return false
  }
  return Object.prototype.toString.call(val) === '[object Function]'
}

function _inArray(val, arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (val === arr[i]) {
      return i
    }
  }
  return -1
}

function _each(obj, fn) {
  if (_isArray(obj)) {
    for (var i = 0, len = obj.length; i < len; i++) {
      if (fn.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (fn.call(obj[key], key, obj[key]) === false) {
          break
        }
      }
    }
  }
}

function _trim(str) {
  // Forgive various special whitespaces, e.g. &nbsp;(\xa0).
  return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '')
}

function _inString(val, str, delimiter) {
  delimiter = delimiter === undefined ? ',' : delimiter
  return (delimiter + str + delimiter).indexOf(delimiter + val + delimiter) >= 0
}

function _addUnit(val, unit) {
  unit = unit || 'px'
  return val && /^-?\d+(?:\.\d+)?$/.test(val) ? val + unit : val
}

function _removeUnit(val) {
  var match
  return val && (match = /(\d+)/.exec(val)) ? parseInt(match[1], 10) : 0
}

function _escape(val) {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function _unescape(val) {
  return val
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}

function _toCamel(str) {
  var arr = str.split('-')
  str = ''
  _each(arr, function (key, val) {
    str += key > 0 ? val.charAt(0).toUpperCase() + val.substr(1) : val
  })
  return str
}

function _toHex(val) {
  function hex(d) {
    var s = parseInt(d, 10).toString(16).toUpperCase()
    return s.length > 1 ? s : '0' + s
  }
  return val.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi, function ($0, $1, $2, $3) {
    return '#' + hex($1) + hex($2) + hex($3)
  })
}

function _toMap(val, delimiter) {
  delimiter = delimiter === undefined ? ',' : delimiter
  var map = {},
    arr = _isArray(val) ? val : val.split(delimiter),
    match
  _each(arr, function (key, val) {
    if ((match = /^(\d+)\.\.(\d+)$/.exec(val))) {
      for (var i = parseInt(match[1], 10); i <= parseInt(match[2], 10); i++) {
        map[i.toString()] = true
      }
    } else {
      map[val] = true
    }
  })
  return map
}

function _toArray(obj, offset) {
  return Array.prototype.slice.call(obj, offset || 0)
}

function _undef(val, defaultVal) {
  return val === undefined ? defaultVal : val
}

function _invalidUrl(url) {
  return !url || /[<>"]/.test(url)
}

function _addParam(url, param) {
  return url.indexOf('?') >= 0 ? url + '&' + param : url + '?' + param
}

function _extend(child, parent, proto) {
  if (!proto) {
    proto = parent
    parent = null
  }
  var childProto
  if (parent) {
    var fn = function () {}
    fn.prototype = parent.prototype
    childProto = new fn()
    _each(proto, function (key, val) {
      childProto[key] = val
    })
  } else {
    childProto = proto
  }
  childProto.constructor = child
  child.prototype = childProto
  child.parent = parent ? parent.prototype : null
}

//From http://www.json.org/json2.js
function _json(text) {
  var match
  if ((match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text))) {
    text = match[0]
  }
  var cx =
    /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
  cx.lastIndex = 0
  if (cx.test(text)) {
    text = text.replace(cx, function (a) {
      return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
    })
  }
  if (
    /^[\],:{}\s]*$/.test(
      text
        .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    )
  ) {
    return eval('(' + text + ')')
  }
  throw 'JSON parse error'
}

var _round = Math.round
