import {
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
} from './core/helper'
import { _getBasePath, options } from './config'
import { _ctrl, _ready } from './event/helper'

import {
  _getCssList,
  _getAttrList,
  _addClassToTag,
  _formatCss,
  _formatUrl,
  _formatHtml,
  _clearMsWord,
  _mediaType,
  _mediaClass,
  _mediaAttrs,
  _mediaEmbed,
  _mediaImg,
  _tmpl
} from './html/helper'
import { _query, _queryAll } from './selector/selector'
import { kFn, KNode } from './node/node'
import {
  KRange,
  _range,
  _START_TO_START,
  _START_TO_END,
  _END_TO_END,
  _END_TO_START
} from './range/range'
import { _cmd, KCmd } from './cmd/cmd'
import { KWidget, _widget } from './widget/widget'
import { KEdit, _edit } from './edit/edit'
import { _iframeDoc } from './edit/helper'
import { KToolbar, _toolbar } from './toolbar'
import { KMenu, _menu } from './menu'
import { KColorPicker, _colorpicker } from './colorpicker'
import { KUploadButton, _uploadbutton } from './uploadbutton'
import { KDialog, _dialog } from './dialog'
import { _tabs } from './tabs'
import { _ajax, _chopQuery, _loadScript, _loadStyle } from './ajax'
import {
  KEditor,
  _create,
  _editor,
  _instances,
  _lang,
  _plugin,
  appendHtml,
  html,
  insertHtml,
  remove,
  sync
} from './main'

// initial
var K = {
  DEBUG: false,
  VERSION: _VERSION,
  IE: _IE,
  GECKO: _GECKO,
  WEBKIT: _WEBKIT,
  OPERA: _OPERA,
  V: _V,
  TIME: _TIME,
  each: _each,
  isArray: _isArray,
  isFunction: _isFunction,
  inArray: _inArray,
  inString: _inString,
  trim: _trim,
  addUnit: _addUnit,
  removeUnit: _removeUnit,
  escape: _escape,
  unescape: _unescape,
  toCamel: _toCamel,
  toHex: _toHex,
  toMap: _toMap,
  toArray: _toArray,
  undef: _undef,
  invalidUrl: _invalidUrl,
  addParam: _addParam,
  extend: _extend,
  json: _json
}

// config
K.basePath = _getBasePath()
K.options = options

// event
K.ctrl = _ctrl
K.ready = _ready

// html
K.formatUrl = _formatUrl
K.formatHtml = _formatHtml
K.getCssList = _getCssList
K.getAttrList = _getAttrList
K.mediaType = _mediaType
K.mediaAttrs = _mediaAttrs
K.mediaEmbed = _mediaEmbed
K.mediaImg = _mediaImg
K.clearMsWord = _clearMsWord
K.tmpl = _tmpl

// selector
K.query = _query
K.queryAll = _queryAll

// node
const _K = K
K = kFn
_each(_K, function (key, val) {
  K[key] = val
})
K.NodeClass = KNode
window.KindEditor = K

// range
K.RangeClass = KRange
K.range = _range
K.START_TO_START = _START_TO_START
K.START_TO_END = _START_TO_END
K.END_TO_END = _END_TO_END
K.END_TO_START = _END_TO_START

// cmd
K.CmdClass = KCmd
K.cmd = _cmd

// widget
K.WidgetClass = KWidget
K.widget = _widget

// edit
K.EditClass = KEdit
K.edit = _edit
K.iframeDoc = _iframeDoc

// toolbar
K.ToolbarClass = KToolbar
K.toolbar = _toolbar

// menu
K.MenuClass = KMenu
K.menu = _menu

// colorpicker
K.ColorPickerClass = KColorPicker
K.colorpicker = _colorpicker

// uploadbutton
K.UploadButtonClass = KUploadButton
K.uploadbutton = _uploadbutton

// dialog
K.DialogClass = KDialog
K.dialog = _dialog

// tabs
K.tabs = _tabs

// ajax
K.loadScript = _loadScript
K.loadStyle = _loadStyle
K.ajax = _ajax

// main
K.EditorClass = KEditor
K.editor = _editor
K.create = _create
K.instances = _instances
K.plugin = _plugin
K.lang = _lang
K.appendHtml = appendHtml
K.html = html
K.insertHtml = insertHtml
K.remove = remove
K.sync = sync

export { K }
export default K
