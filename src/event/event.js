import { _each, _toMap, _inArray, _extend, _TIME } from '../core'
import {
  _bindEvent,
  _unbindEvent,
  _getId,
  _setId,
  _removeId,
  _bind,
  _unbind,
  _fire,
  _ctrl,
  _ready,
  _eventData
} from './helper'

/**
DOM_VK_BACK_SPACE : 8
DOM_VK_TAB : 9
DOM_VK_RETURN : 13
DOM_VK_SPACE : 32
DOM_VK_PAGE_UP : 33
DOM_VK_PAGE_DOWN : 34
DOM_VK_END : 35
DOM_VK_HOME : 36
DOM_VK_LEFT : 37
DOM_VK_UP : 38
DOM_VK_RIGHT : 39
DOM_VK_DOWN : 40
DOM_VK_DELETE : 46
DOM_VK_0 ~ DOM_VK_9 : 48 ~ 57
DOM_VK_SEMICOLON : 59 (;:)
DOM_VK_EQUALS : 61 (=+) (+)
DOM_VK_A ~ DOM_VK_Z : 65 ~ 90
DOM_VK_MULTIPLY : 106 (*)
DOM_VK_SUBTRACT : 109 (-_) (-)
DOM_VK_DECIMAL : 110 (.)
DOM_VK_DIVIDE : 111 (/)
DOM_VK_COMMA : 188 (,<)
DOM_VK_PERIOD : 190 (.>)
DOM_VK_SLASH : 191 (/?)
DOM_VK_BACK_QUOTE : 192 (`~)
DOM_VK_OPEN_BRACKET : 219 ([{)
DOM_VK_BACK_SLASH : 220 (\|)
DOM_VK_CLOSE_BRACKET : 221 (]})
DOM_VK_QUOTE : 222 ('")
*/
// 输入文字的键值
export var _INPUT_KEY_MAP = _toMap(
  '8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222'
)
// 移动光标的键值
var _CURSORMOVE_KEY_MAP = _toMap('33..40')
// 输入文字或移动光标的键值
var _CHANGE_KEY_MAP = {}
_each(_INPUT_KEY_MAP, function (key, val) {
  _CHANGE_KEY_MAP[key] = val
})
_each(_CURSORMOVE_KEY_MAP, function (key, val) {
  _CHANGE_KEY_MAP[key] = val
})

var _EVENT_PROPS = (
  'altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,' +
  'data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,' +
  'pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which'
).split(',')

// create KEvent class
export function KEvent(el, event) {
  this.init(el, event)
}
_extend(KEvent, {
  init: function (el, event) {
    var self = this,
      doc = el.ownerDocument || el.document || el
    self.event = event
    _each(_EVENT_PROPS, function (key, val) {
      self[val] = event[val]
    })
    if (!self.target) {
      self.target = self.srcElement || doc
    }
    if (self.target.nodeType === 3) {
      self.target = self.target.parentNode
    }
    if (!self.relatedTarget && self.fromElement) {
      self.relatedTarget = self.fromElement === self.target ? self.toElement : self.fromElement
    }
    if (self.pageX == null && self.clientX != null) {
      var d = doc.documentElement,
        body = doc.body
      self.pageX =
        self.clientX +
        ((d && d.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((d && d.clientLeft) || (body && body.clientLeft) || 0)
      self.pageY =
        self.clientY +
        ((d && d.scrollTop) || (body && body.scrollTop) || 0) -
        ((d && d.clientTop) || (body && body.clientTop) || 0)
    }
    if (!self.which && (self.charCode || self.charCode === 0 ? self.charCode : self.keyCode)) {
      self.which = self.charCode || self.keyCode
    }
    if (!self.metaKey && self.ctrlKey) {
      self.metaKey = self.ctrlKey
    }
    if (!self.which && self.button !== undefined) {
      self.which = self.button & 1 ? 1 : self.button & 2 ? 3 : self.button & 4 ? 2 : 0
    }
    /**
			DOM_VK_SEMICOLON : 59 (;:)
				- IE,WEBKIT: 186
				- GECKO,OPERA : 59
			DOM_VK_EQUALS : 61 (=+)
				- IE,WEBKIT : 187
				- GECKO : 107
				- OPERA : 61
			DOM_VK_NUMPAD0 ~ DOM_VK_NUMPAD9 : 96 ~ 105
				- IE、WEBKIT,GECKO : 96 ~ 105
				- OPERA : 48 ~ 57
			DOM_VK_MULTIPLY : 106 (*)
				- IE、WEBKIT,GECKO : 106
				- OPERA : 42
			DOM_VK_ADD : 107 (+)
				- IE、WEBKIT,GECKO : 107
				- OPERA : 43
			DOM_VK_SUBTRACT : 109 (-_) (-)
				- IE,WEBKIT : 189, 109
				- GECKO : 109, 109
				- OPERA : 109, 45
			DOM_VK_DECIMAL : 110 (.)
				- IE、WEBKIT,GECKO : 110
				- OPERA : 78
			DOM_VK_DIVIDE : 111 (/)
				- IE、WEBKIT,GECKO : 111
				- OPERA : 47

			Reference:
			https://developer.mozilla.org/en/DOM/Event/UIEvent/KeyEvent
			http://msdn.microsoft.com/en-us/library/ms536940(v=VS.85).aspx
		*/
    switch (self.which) {
      case 186:
        self.which = 59
        break
      case 187:
      case 107:
      case 43:
        self.which = 61
        break
      case 189:
      case 45:
        self.which = 109
        break
      case 42:
        self.which = 106
        break
      case 47:
        self.which = 111
        break
      case 78:
        self.which = 110
        break
    }
    if (self.which >= 96 && self.which <= 105) {
      self.which -= 48
    }
  },
  preventDefault: function () {
    var ev = this.event
    if (ev.preventDefault) {
      ev.preventDefault()
    } else {
      ev.returnValue = false
    }
  },
  stopPropagation: function () {
    var ev = this.event
    if (ev.stopPropagation) {
      ev.stopPropagation()
    } else {
      ev.cancelBubble = true
    }
  },
  stop: function () {
    this.preventDefault()
    this.stopPropagation()
  }
})

/**
	Note:
	发现绑定dbclick事件后移除element会有内存泄漏，以下代码也不起作用。
	Reference:
	http://isaacschlueter.com/2006/10/msie-memory-leaks/
	http://msdn.microsoft.com/en-us/library/bb250448.aspx
*/
if (window.attachEvent) {
  window.attachEvent('onunload', function () {
    _each(_eventData, function (key, events) {
      if (events.el) {
        _unbind(events.el)
      }
    })
  })
}

export { _CHANGE_KEY_MAP }
