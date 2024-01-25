import { K } from '../K'
import {
  _IERANGE,
  _SINGLE_TAG_MAP,
  _BLOCK_TAG_MAP,
  _isArray,
  _toCamel,
  _inString,
  _each,
  _addUnit,
  _round,
  _trim,
  _toArray,
  _extend,
  _STYLE_TAG_MAP,
  _INLINE_TAG_MAP
} from '../core'
import { _bind } from '../event/helper'
import { _getAttr } from '../selector/helper'

import {
  _get,
  _getDoc,
  _getWin,
  _setHtml,
  _hasClass,
  _setAttr,
  _removeAttr,
  _getNodeName,
  _computedCss,
  _hasVal,
  _docElement,
  _docHeight,
  _docWidth,
  _getScrollPos
} from './helper'

import { _getCssList, _formatHtml } from '../html/helper'
import { _unbind } from '../event/helper'
import { _contains, _queryAll } from '../selector/helper'

// create KNode class
export function KNode(node) {
  this.init(node)
}
_extend(KNode, {
  init: function (node) {
    var self = this
    node = _isArray(node) ? node : [node]
    var length = 0
    for (var i = 0, len = node.length; i < len; i++) {
      if (node[i]) {
        self[i] = node[i].constructor === KNode ? node[i][0] : node[i]
        length++
      }
    }
    self.length = length
    self.doc = _getDoc(self[0])
    self.name = _getNodeName(self[0])
    self.type = self.length > 0 ? self[0].nodeType : null
    self.win = _getWin(self[0])
  },
  each: function (fn) {
    var self = this
    for (var i = 0; i < self.length; i++) {
      if (fn.call(self[i], i, self[i]) === false) {
        return self
      }
    }
    return self
  },
  bind: function (type, fn) {
    this.each(function () {
      _bind(this, type, fn)
    })
    return this
  },
  unbind: function (type, fn) {
    this.each(function () {
      _unbind(this, type, fn)
    })
    return this
  },
  fire: function (type) {
    if (this.length < 1) {
      return this
    }
    _fire(this[0], type)
    return this
  },
  hasAttr: function (key) {
    if (this.length < 1) {
      return false
    }
    return !!_getAttr(this[0], key)
  },
  attr: function (key, val) {
    var self = this
    if (key === undefined) {
      return _getAttrList(self.outer())
    }
    if (typeof key === 'object') {
      _each(key, function (k, v) {
        self.attr(k, v)
      })
      return self
    }
    if (val === undefined) {
      val = self.length < 1 ? null : _getAttr(self[0], key)
      return val === null ? '' : val
    }
    self.each(function () {
      _setAttr(this, key, val)
    })
    return self
  },
  removeAttr: function (key) {
    this.each(function () {
      _removeAttr(this, key)
    })
    return this
  },
  get: function (i) {
    if (this.length < 1) {
      return null
    }
    return this[i || 0]
  },
  eq: function (i) {
    if (this.length < 1) {
      return null
    }
    return this[i] ? new KNode(this[i]) : null
  },
  hasClass: function (cls) {
    if (this.length < 1) {
      return false
    }
    return _hasClass(this[0], cls)
  },
  addClass: function (cls) {
    this.each(function () {
      if (!_hasClass(this, cls)) {
        this.className = _trim(this.className + ' ' + cls)
      }
    })
    return this
  },
  removeClass: function (cls) {
    this.each(function () {
      if (_hasClass(this, cls)) {
        this.className = _trim(this.className.replace(new RegExp('(^|\\s)' + cls + '(\\s|$)'), ' '))
      }
    })
    return this
  },
  html: function (val) {
    var self = this
    if (val === undefined) {
      if (self.length < 1 || self.type != 1) {
        return ''
      }
      return _formatHtml(self[0].innerHTML)
    }
    self.each(function () {
      _setHtml(this, val)
    })
    return self
  },
  text: function () {
    var self = this
    if (self.length < 1) {
      return ''
    }
    return _IE ? self[0].innerText : self[0].textContent
  },
  hasVal: function () {
    if (this.length < 1) {
      return false
    }
    return _hasVal(this[0])
  },
  val: function (val) {
    var self = this
    if (val === undefined) {
      if (self.length < 1) {
        return ''
      }
      return self.hasVal() ? self[0].value : self.attr('value')
    } else {
      self.each(function () {
        if (_hasVal(this)) {
          this.value = val
        } else {
          _setAttr(this, 'value', val)
        }
      })
      return self
    }
  },
  css: function (key, val) {
    var self = this
    if (key === undefined) {
      return _getCssList(self.attr('style'))
    }
    if (typeof key === 'object') {
      _each(key, function (k, v) {
        self.css(k, v)
      })
      return self
    }
    if (val === undefined) {
      if (self.length < 1) {
        return ''
      }
      return self[0].style[_toCamel(key)] || _computedCss(self[0], key) || ''
    }
    self.each(function () {
      this.style[_toCamel(key)] = val
    })
    return self
  },
  width: function (val) {
    var self = this
    if (val === undefined) {
      if (self.length < 1) {
        return 0
      }
      return self[0].offsetWidth
    }
    return self.css('width', _addUnit(val))
  },
  height: function (val) {
    var self = this
    if (val === undefined) {
      if (self.length < 1) {
        return 0
      }
      return self[0].offsetHeight
    }
    return self.css('height', _addUnit(val))
  },
  opacity: function (val) {
    this.each(function () {
      if (this.style.opacity === undefined) {
        this.style.filter = val == 1 ? '' : 'alpha(opacity=' + val * 100 + ')'
      } else {
        this.style.opacity = val == 1 ? '' : val
      }
    })
    return this
  },
  data: function (key, val) {
    var self = this
    key = 'kindeditor_data_' + key
    if (val === undefined) {
      if (self.length < 1) {
        return null
      }
      return self[0][key]
    }
    this.each(function () {
      this[key] = val
    })
    return self
  },
  pos: function () {
    var self = this,
      node = self[0],
      x = 0,
      y = 0
    if (node) {
      if (node.getBoundingClientRect) {
        var box = node.getBoundingClientRect(),
          pos = _getScrollPos(self.doc)
        x = box.left + pos.x
        y = box.top + pos.y
      } else {
        while (node) {
          x += node.offsetLeft
          y += node.offsetTop
          node = node.offsetParent
        }
      }
    }
    return { x: _round(x), y: _round(y) }
  },
  clone: function (bool) {
    if (this.length < 1) {
      return new KNode([])
    }
    return new KNode(this[0].cloneNode(bool))
  },
  append: function (expr) {
    this.each(function () {
      if (this.appendChild) {
        this.appendChild(_get(expr))
      }
    })
    return this
  },
  appendTo: function (expr) {
    this.each(function () {
      _get(expr).appendChild(this)
    })
    return this
  },
  before: function (expr) {
    this.each(function () {
      this.parentNode.insertBefore(_get(expr), this)
    })
    return this
  },
  after: function (expr) {
    this.each(function () {
      if (this.nextSibling) {
        this.parentNode.insertBefore(_get(expr), this.nextSibling)
      } else {
        this.parentNode.appendChild(_get(expr))
      }
    })
    return this
  },
  replaceWith: function (expr) {
    var nodes = []
    this.each(function (i, node) {
      _unbind(node)
      var newNode = _get(expr)
      node.parentNode.replaceChild(newNode, node)
      nodes.push(newNode)
    })
    return K(nodes)
  },
  empty: function () {
    var self = this
    self.each(function (i, node) {
      var child = node.firstChild
      while (child) {
        if (!node.parentNode) {
          return
        }
        var next = child.nextSibling
        child.parentNode.removeChild(child)
        child = next
      }
    })
    return self
  },
  remove: function (keepChilds) {
    var self = this
    self.each(function (i, node) {
      if (!node.parentNode) {
        return
      }
      _unbind(node)
      if (keepChilds) {
        var child = node.firstChild
        while (child) {
          var next = child.nextSibling
          node.parentNode.insertBefore(child, node)
          child = next
        }
      }
      node.parentNode.removeChild(node)
      delete self[i]
    })
    self.length = 0
    return self
  },
  show: function (val) {
    var self = this
    if (val === undefined) {
      val = self._originDisplay || ''
    }
    if (self.css('display') != 'none') {
      return self
    }
    return self.css('display', val)
  },
  hide: function () {
    var self = this
    if (self.length < 1) {
      return self
    }
    self._originDisplay = self[0].style.display
    return self.css('display', 'none')
  },
  outer: function () {
    var self = this
    if (self.length < 1) {
      return ''
    }
    var div = self.doc.createElement('div'),
      html
    div.appendChild(self[0].cloneNode(true))
    html = _formatHtml(div.innerHTML)
    div = null
    return html
  },
  isSingle: function () {
    return !!_SINGLE_TAG_MAP[this.name]
  },
  isInline: function () {
    return !!_INLINE_TAG_MAP[this.name]
  },
  isBlock: function () {
    return !!_BLOCK_TAG_MAP[this.name]
  },
  isStyle: function () {
    return !!_STYLE_TAG_MAP[this.name]
  },
  isControl: function () {
    return !!_CONTROL_TAG_MAP[this.name]
  },
  contains: function (otherNode) {
    if (this.length < 1) {
      return false
    }
    return _contains(this[0], _get(otherNode))
  },
  parent: function () {
    if (this.length < 1) {
      return null
    }
    var node = this[0].parentNode
    return node ? new KNode(node) : null
  },
  children: function () {
    if (this.length < 1) {
      return new KNode([])
    }
    var list = [],
      child = this[0].firstChild
    while (child) {
      if (child.nodeType != 3 || _trim(child.nodeValue) !== '') {
        list.push(child)
      }
      child = child.nextSibling
    }
    return new KNode(list)
  },
  first: function () {
    var list = this.children()
    return list.length > 0 ? list.eq(0) : null
  },
  last: function () {
    var list = this.children()
    return list.length > 0 ? list.eq(list.length - 1) : null
  },
  index: function () {
    if (this.length < 1) {
      return -1
    }
    var i = -1,
      sibling = this[0]
    while (sibling) {
      i++
      sibling = sibling.previousSibling
    }
    return i
  },
  prev: function () {
    if (this.length < 1) {
      return null
    }
    var node = this[0].previousSibling
    return node ? new KNode(node) : null
  },
  next: function () {
    if (this.length < 1) {
      return null
    }
    var node = this[0].nextSibling
    return node ? new KNode(node) : null
  },
  scan: function (fn, order) {
    if (this.length < 1) {
      return
    }
    order = order === undefined ? true : order
    function walk(node) {
      var n = order ? node.firstChild : node.lastChild
      while (n) {
        var next = order ? n.nextSibling : n.previousSibling
        if (fn(n) === false) {
          return false
        }
        if (walk(n) === false) {
          return false
        }
        n = next
      }
    }
    walk(this[0])
    return this
  }
})

_each(
  (
    'blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,' +
    'mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,' +
    'change,select,submit,keydown,keypress,keyup,error,contextmenu'
  ).split(','),
  function (i, type) {
    KNode.prototype[type] = function (fn) {
      return fn ? this.bind(type, fn) : this.fire(type)
    }
  }
)

export var kFn = function (expr, root) {
  if (expr === undefined || expr === null) {
    return
  }
  function newNode(node) {
    if (!node[0]) {
      node = []
    }
    return new KNode(node)
  }
  if (typeof expr === 'string') {
    if (root) {
      root = _get(root)
    }
    var length = expr.length
    if (expr.charAt(0) === '@') {
      expr = expr.substr(1)
    }
    // HTML
    // 包含HTML代码，或者第一个字符为"@"时当做HTML字符串
    if (expr.length !== length || /<.+>/.test(expr)) {
      var doc = root ? root.ownerDocument || root : document,
        div = doc.createElement('div'),
        list = []
      // HTML前添加IMG，防止IE抛出异常
      div.innerHTML =
        '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + expr
      for (var i = 0, len = div.childNodes.length; i < len; i++) {
        var child = div.childNodes[i]
        if (child.id == '__kindeditor_temp_tag__') {
          continue
        }
        list.push(child)
      }
      return newNode(list)
    }
    // selector
    return newNode(_queryAll(expr, root))
  }
  // KNode
  if (expr && expr.constructor === KNode) {
    return expr
  }
  // jQuery object
  if (expr.toArray) {
    expr = expr.toArray()
  }
  // Native NodeList
  if (_isArray(expr)) {
    return newNode(expr)
  }
  // Native Node
  return newNode(_toArray(arguments))
}

// _each(_K, function(key, val) {
// 	K[key] = val;
// });

// K.NodeClass = KNode;

// window.KindEditor = K;
