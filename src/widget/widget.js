import { K } from '../K'
import { _addUnit, _removeUnit, _undef, _round, _extend } from '../core'
import { _getWin } from '../node/helper'
import { _drag } from './helper'
import { _getScrollPos } from '../node/helper'
// create KWidget class
export function KWidget(options) {
  this.init(options)
}
_extend(KWidget, {
  init: function (options) {
    var self = this
    // public properties
    self.name = options.name || ''
    self.doc = options.doc || document
    self.win = _getWin(self.doc)
    self.x = _addUnit(options.x)
    self.y = _addUnit(options.y)
    self.z = options.z
    self.width = _addUnit(options.width)
    self.height = _addUnit(options.height)
    self.div = K('<div style="display:block;"></div>')
    self.options = options
    // pravate properties
    self._alignEl = options.alignEl
    if (self.width) {
      self.div.css('width', self.width)
    }
    if (self.height) {
      self.div.css('height', self.height)
    }
    if (self.z) {
      self.div.css({
        position: 'absolute',
        left: self.x,
        top: self.y,
        'z-index': self.z
      })
    }
    if (self.z && (self.x === undefined || self.y === undefined)) {
      self.autoPos(self.width, self.height)
    }
    if (options.cls) {
      self.div.addClass(options.cls)
    }
    if (options.shadowMode) {
      self.div.addClass('ke-shadow')
    }
    if (options.css) {
      self.div.css(options.css)
    }
    if (options.src) {
      K(options.src).replaceWith(self.div)
    } else {
      K(self.doc.body).append(self.div)
    }
    if (options.html) {
      self.div.html(options.html)
    }
    if (options.autoScroll) {
      if ((_IE && _V < 7) || _QUIRKS) {
        var scrollPos = _getScrollPos()
        K(self.win).bind('scroll', function (e) {
          var pos = _getScrollPos(),
            diffX = pos.x - scrollPos.x,
            diffY = pos.y - scrollPos.y
          self.pos(_removeUnit(self.x) + diffX, _removeUnit(self.y) + diffY, false)
        })
      } else {
        self.div.css('position', 'fixed')
      }
    }
  },
  pos: function (x, y, updateProp) {
    var self = this
    updateProp = _undef(updateProp, true)
    if (x !== null) {
      x = x < 0 ? 0 : _addUnit(x)
      self.div.css('left', x)
      if (updateProp) {
        self.x = x
      }
    }
    if (y !== null) {
      y = y < 0 ? 0 : _addUnit(y)
      self.div.css('top', y)
      if (updateProp) {
        self.y = y
      }
    }
    return self
  },
  autoPos: function (width, height) {
    var x,
      y,
      self = this,
      w = _removeUnit(width) || 0,
      h = _removeUnit(height) || 0,
      scrollPos = _getScrollPos()
    if (self._alignEl) {
      var knode = K(self._alignEl),
        pos = knode.pos(),
        diffX = _round(knode[0].clientWidth / 2 - w / 2),
        diffY = _round(knode[0].clientHeight / 2 - h / 2)
      x = diffX < 0 ? pos.x : pos.x + diffX
      y = diffY < 0 ? pos.y : pos.y + diffY
    } else {
      var docEl = _docElement(self.doc)
      x = _round(scrollPos.x + (docEl.clientWidth - w) / 2)
      y = _round(scrollPos.y + (docEl.clientHeight - h) / 2)
    }
    // 用position:fixed后不需要添加scroll坐标
    if (!((_IE && _V < 7) || _QUIRKS)) {
      x -= scrollPos.x
      y -= scrollPos.y
    }
    return self.pos(x, y)
  },
  remove: function () {
    var self = this
    if ((_IE && _V < 7) || _QUIRKS) {
      K(self.win).unbind('scroll')
    }
    self.div.remove()
    _each(self, function (i) {
      self[i] = null
    })
    return this
  },
  show: function () {
    this.div.show()
    return this
  },
  hide: function () {
    this.div.hide()
    return this
  },
  draggable: function (options) {
    var self = this
    options = options || {}
    options.moveEl = self.div
    options.moveFn = function (x, y, width, height, diffX, diffY) {
      if ((x = x + diffX) < 0) {
        x = 0
      }
      if ((y = y + diffY) < 0) {
        y = 0
      }
      self.pos(x, y)
    }
    _drag(options)
    return self
  }
})

export function _widget(options) {
  return new KWidget(options)
}
