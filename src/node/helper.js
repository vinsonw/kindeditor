import {K} from '../K'
import {_isArray, _toCamel, _inString, _IE, _VALUE_TAG_MAP, _NEWIE, _OPERA} from '../core'
import {_QUIRKS} from '../core'

export {
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
}

function _get(val) {
	return K(val)[0];
}

function _getDoc(node) {
	if (!node) {
		return document;
	}
	return node.ownerDocument || node.document || node;
}

function _getWin(node) {
	if (!node) {
		return window;
	}
	var doc = _getDoc(node);
	return doc.parentWindow || doc.defaultView;
}

function _setHtml(el, html) {
	if (el.nodeType != 1) {
		return;
	}
	var doc = _getDoc(el);
	try {
		el.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + html;
		var temp = doc.getElementById('__kindeditor_temp_tag__');
		temp.parentNode.removeChild(temp);
	} catch(e) {
		// bugfix: 在IE上innerHTML有时候报错
		K(el).empty();
		K('@' + html, doc).each(function() {
			el.appendChild(this);
		});
	}
}

function _hasClass(el, cls) {
	return _inString(cls, el.className, ' ');
}

function _setAttr(el, key, val) {
	if (_IE && _V < 8 && key.toLowerCase() == 'class') {
		key = 'className';
	}
	el.setAttribute(key, '' + val);
}

function _removeAttr(el, key) {
	if (_IE && _V < 8 && key.toLowerCase() == 'class') {
		key = 'className';
	}
	_setAttr(el, key, '');
	el.removeAttribute(key);
}

function _getNodeName(node) {
	if (!node || !node.nodeName) {
		return '';
	}
	return node.nodeName.toLowerCase();
}

function _computedCss(el, key) {
	var self = this, win = _getWin(el), camelKey = _toCamel(key), val = '';
	if (win.getComputedStyle) {
		var style = win.getComputedStyle(el, null);
		val = style[camelKey] || style.getPropertyValue(key) || el.style[camelKey];
	} else if (el.currentStyle) {
		val = el.currentStyle[camelKey] || el.style[camelKey];
	}
	return val;
}

function _hasVal(node) {
	return !!_VALUE_TAG_MAP[_getNodeName(node)];
}

function _docElement(doc) {
	doc = doc || document;
	return _QUIRKS ? doc.body : doc.documentElement;
}

function _docHeight(doc) {
	var el = _docElement(doc);
	return Math.max(el.scrollHeight, el.clientHeight);
}

function _docWidth(doc) {
	var el = _docElement(doc);
	return Math.max(el.scrollWidth, el.clientWidth);
}

function _getScrollPos(doc) {
	doc = doc || document;
	var x, y;
	if (_IE || _NEWIE || _OPERA) {
		x = _docElement(doc).scrollLeft;
		y = _docElement(doc).scrollTop;
	} else {
		x = _getWin(doc).scrollX;
		y = _getWin(doc).scrollY;
	}
	return {x : x, y : y};
}
