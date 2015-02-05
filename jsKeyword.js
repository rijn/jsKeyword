/* jsKeyword
 * Rijn
 * Copyright pixelnfinite.com, 2015.
 */

;
function jsKeyword(opts) {
    this.version = '1.0';
    this.author = 'Rijn';
    this.tree = {};
    this.list = [];
    this.content = [];
};
jsKeyword.fn = jsKeyword.prototype = {
    init: function() {
        "use strict";
        this.tree = {};
        this.list = [];
    },
    viewTree: function() {
        console.log(this.tree);
        console.log(this.list);
    },
    autoComplete: function(_text) {
        var _target = [];
        for (var i = 0; i < _text.length; i++) {
            _target.push(_text.charAt(i));
        };
        var _list = this.list,
            _content = this.content,
            _length = this.list.length,
            _comp_length = _target.length,
            _res_array = [];
        for (var i = 0; i < _length; i++) {
            var _count = 0;
            for (var j = 0; j < _comp_length; j++) {
                if (_list[i].hasOwnProperty(_target[j])) {
                    _count++;
                };
            };
            if (_count > 0) {
                var _calc = parseInt(_count * 20 / (_comp_length + _list[i].length));
                if (typeof _res_array[_calc] === "undefined") {
                    _res_array[_calc] = [];
                };
                _res_array[_calc].push(_content[i]);
            };
        };
        var _result = [];
        for (var i = 10; i > 0; i--) {
            if (typeof _res_array[i] !== "undefined") {
                var _length = _res_array[i].length;
                var _temp = _res_array[i];
                for (var k = 0; k < _length; k++) {
                    _result.push(_temp[k]);
                };
            };
        };
        return _result;
    },
    search: function(_text) {
        var _probe,
            _root = this.tree,
            p_star = 0,
            n = _text.length,
            p_end,
            p_flag = 0,
            match,
            match_key,
            match_str,
            _arr_match = [];

        while (p_star < n) {
            _probe = _root;
            p_star = (p_flag++);
            p_end = p_star;
            match_str = "";
            _match = false;
            do {
                match_key = _text.charAt(p_end);
                if (!(_probe = _probe[match_key])) {
                    p_star += 1;
                    break;
                } else {
                    match_str += match_key;
                };
                p_end += 1;
                if (_probe.leaf === true) {
                    _match = true;
                };
            } while (true);

            if (_match === true) {
                _arr_match.push({
                    keyword: match_str,
                    position: {
                        begin: p_star - 1,
                        end: p_end
                    },
                });
                p_star = p_end;
            };
        };
        return _arr_match;
    },
    check: function() {
        var _result = [];
        if (typeof arguments[0] === "object") {
            var _argu = arguments[0];
        } else {
            var _argu = arguments;
        };
        for (var j = 0; j < _argu.length; j++) {
            var _match = false;
            var _temp = _argu[j];
            var _length = _temp.length;
            var _pointer = 0;
            var _probe = this.tree;
            do {
                var _key = _temp.charAt(_pointer);
                if (!(_probe = _probe[_key])) {
                    break;
                }
                _pointer++;
                if (_probe.leaf === true && _pointer == _length) {
                    _match = true;
                }
            } while (true);

            _result.push(_match);
        };
        return _result;
    },
    push: function() {
        var _e = [];
        var _count = 0;
        var _tree = this.tree;
        var _root = _tree;
        if (typeof arguments[0] === "object") {
            _argu = arguments[0];
        } else {
            _argu = arguments;
        };
        for (var j = 0; j < _argu.length; j++) {
            var _temp = _argu[j];
            var _length = _temp.length;
            var _list_temp = [];
            for (var i = 0; i < _length; i += 1) {
                _key = _temp.charAt(i);
                _list_temp[_key] = 1;
                _list_temp.length++;
                if (_tree.hasOwnProperty(_key)) {
                    _tree = _tree[_key];
                } else {
                    _tree = _tree[_key] = {};
                };
            };
            _tree.leaf = true;
            this.list.push(_list_temp);
            this.content.push(_temp);
            _count++;
            _tree = _root;
        };
        this.tree = _tree;
        return {
            count: _count,
        };
    },
    remove: function() {
        var _e = [];

        var _call = function(_subTree, _str) {
            if (_str.length > 0) {
                var _key = _str.charAt(0);
                if (_subTree.hasOwnProperty(_key)) {
                    var _judge = _call(_subTree[_key], _str.substr(1));
                };
                if (_judge == true) {
                    delete _subTree[_key];
                    var _count = 0;
                    for (var k in _subTree) {
                        _count++;
                    };
                    if (_count <= 1) {
                        return true;
                    } else {
                        return false;
                    };
                } else {
                    return false;
                };
            } else {
                _subTree.leaf = false;
                return true;
            };
        };

        var _tree = this.tree;
        if (typeof arguments[0] === "object") {
            _argu = arguments[0];
        } else {
            _argu = arguments;
        };
        for (var j = 0; j < _argu.length; j++) {
            var _temp = _argu[j];
            _call(_tree, _temp);
        };
        this.tree = _tree;
        return true;
    },
};
