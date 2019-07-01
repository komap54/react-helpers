"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Try = function (_a) {
    var _catch = _a.catch, children = _a.children;
    try {
        return React.createElement(React.Fragment, null, children);
    }
    catch (error) {
        if (_catch) {
            return React.createElement(React.Fragment, null, _catch(error));
        }
        return null;
    }
};
exports.default = Try;
//# sourceMappingURL=index.js.map