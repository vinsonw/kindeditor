import {K} from '../K'
export { _queryAll} from './helper'


export function _query(expr, root) {
	var arr = _queryAll(expr, root);
	return arr.length > 0 ? arr[0] : null;
}

