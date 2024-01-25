import { K } from '../K'
import { _formatUrl } from '../html/helper'
import { _removeUnit } from '../core'
import { _getDoc } from '../node/helper'
import { _round } from '../core'

function _drag(options) {
  var moveEl = options.moveEl,
    moveFn = options.moveFn,
    clickEl = options.clickEl || moveEl,
    beforeDrag = options.beforeDrag,
    iframeFix = options.iframeFix === undefined ? true : options.iframeFix

  var docs = [document]

  if (iframeFix) {
    K('iframe').each(function () {
      // 判断是否跨域
      var src = _formatUrl(this.src || '', 'absolute')
      if (/^https?:\/\//.test(src)) {
        return
      }
      var doc
      try {
        doc = _iframeDoc(this)
      } catch (e) {}
      if (doc) {
        var pos = K(this).pos()
        K(doc).data('pos-x', pos.x)
        K(doc).data('pos-y', pos.y)
        docs.push(doc)
      }
    })
  }

  clickEl.mousedown(function (e) {
    // 不响应右键，否则可能导致点选右键菜单时无法取消拖拽
    if (e.button !== 0 && e.button !== 1) {
      return
    }

    e.stopPropagation()

    var self = clickEl.get(),
      x = _removeUnit(moveEl.css('left')),
      y = _removeUnit(moveEl.css('top')),
      width = moveEl.width(),
      height = moveEl.height(),
      pageX = e.pageX,
      pageY = e.pageY

    if (beforeDrag) {
      beforeDrag()
    }

    function moveListener(e) {
      e.preventDefault()
      var kdoc = K(_getDoc(e.target))
      var diffX = _round((kdoc.data('pos-x') || 0) + e.pageX - pageX)
      var diffY = _round((kdoc.data('pos-y') || 0) + e.pageY - pageY)
      moveFn.call(clickEl, x, y, width, height, diffX, diffY)
    }

    function selectListener(e) {
      e.preventDefault()
    }

    function upListener(e) {
      e.preventDefault()
      K(docs)
        .unbind('mousemove', moveListener)
        .unbind('mouseup', upListener)
        .unbind('selectstart', selectListener)
      if (self.releaseCapture) {
        self.releaseCapture()
      }
    }

    // bind event
    K(docs).mousemove(moveListener).mouseup(upListener).bind('selectstart', selectListener)

    if (self.setCapture) {
      self.setCapture()
    }
  })
}

export { _drag }
