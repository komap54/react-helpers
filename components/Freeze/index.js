"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Freeze = function (_a) {
    var enabled = _a.enabled, children = _a.children;
    // tslint:disable-next-line: no-boolean-literal-compare
    var shouldUpdate = enabled === false ? Symbol('yes') : 'no';
    return React.useMemo(function () { return React.createElement(React.Fragment, null, children); }, [shouldUpdate]);
};
exports.default = Freeze;
//# sourceMappingURL=index.js.map