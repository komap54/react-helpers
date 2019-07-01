"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../../utils");
// tslint:disable-next-line: function-name
exports.Case = function (_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null, utils_1.renderChildren(children)));
};
// tslint:disable-next-line: function-name
exports.Default = function (_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null, utils_1.renderChildren(children)));
};
// tslint:disable-next-line: function-name
function Switch(_a) {
    var children = _a.children;
    if (!children || children === null) {
        return null;
    }
    if (typeof children === 'string'
        || typeof children === 'number'
        || typeof children === 'boolean') {
        return React.createElement(React.Fragment, null, children);
    }
    var result = { case: null, default: null };
    React.Children.forEach(children, function (child) {
        if (!result.case && child.type === exports.Case) {
            if (utils_1._(child.props.condition)) {
                result.case = child;
            }
        }
        else if (!result.default && child.type === exports.Default) {
            result.default = child;
        }
    });
    return result.case || result.default || null;
}
exports.Switch = Switch;
exports.default = { Switch: Switch, Case: exports.Case, Default: exports.Default };
//# sourceMappingURL=index.js.map