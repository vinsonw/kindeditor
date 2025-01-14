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
  _json
} from './helper'

export {
  _INLINE_TAG_MAP,
  _BLOCK_TAG_MAP,
  _SINGLE_TAG_MAP,
  _STYLE_TAG_MAP,
  _CONTROL_TAG_MAP,
  _PRE_TAG_MAP,
  _NOSPLIT_TAG_MAP,
  _AUTOCLOSE_TAG_MAP,
  _FILL_ATTR_MAP,
  _VALUE_TAG_MAP
}

var _INLINE_TAG_MAP = _toMap(
    'a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'
  ),
  _BLOCK_TAG_MAP = _toMap(
    'address,applet,blockquote,body,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul'
  ),
  _SINGLE_TAG_MAP = _toMap(
    'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed'
  ),
  _STYLE_TAG_MAP = _toMap('b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u'),
  _CONTROL_TAG_MAP = _toMap('img,table,input,textarea,button'),
  _PRE_TAG_MAP = _toMap('pre,style,script'),
  _NOSPLIT_TAG_MAP = _toMap('html,head,body,td,tr,table,ol,ul,li'),
  _AUTOCLOSE_TAG_MAP = _toMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'),
  _FILL_ATTR_MAP = _toMap(
    'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'
  ),
  _VALUE_TAG_MAP = _toMap('input,button,textarea,select')
