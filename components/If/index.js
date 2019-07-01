"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../../utils");
// tslint:disable-next-line: function-name
exports.Then = function (_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null, utils_1.renderChildren(children)));
};
// tslint:disable-next-line: function-name
exports.Else = function (_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null, utils_1.renderChildren(children)));
};
// tslint:disable-next-line: function-name
function If(_a) {
    var condition = _a.condition, children = _a.children;
    if (!children || children === null) {
        return null;
    }
    if (typeof children === 'function') {
        return utils_1._(condition) ? React.createElement(React.Fragment, null, children()) : null;
    }
    if (typeof children === 'string'
        || typeof children === 'number'
        || typeof children === 'boolean'
        || (!Array.isArray(children) && children.type !== (React.createElement(exports.Else, null)).type)) {
        return utils_1._(condition) ? React.createElement(React.Fragment, null, children) : null;
    }
    var options = (Array.isArray(children) ? children : [children]);
    if (utils_1._(condition)) {
        return (React.createElement(React.Fragment, null, options.find(function (child) { return (child.type === (React.createElement(exports.Then, null)).type); }) || null));
    }
    return (React.createElement(React.Fragment, null, options.find(function (child) { return (child.type === (React.createElement(exports.Else, null)).type); }) || null));
}
exports.If = If;
exports.default = { If: If, Then: exports.Then, Else: exports.Else };
//# sourceMappingURL=index.js.map