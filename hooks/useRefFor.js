"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useRefFor(Component) {
    var ref = React.useRef(null);
    var EnhancedComponent = React.useCallback(function (props) { return (React.createElement(Component, __assign({ ref: ref, inputRef: ref }, props))); }, []);
    EnhancedComponent.displayName = Component.displayName + "WithRef";
    return [ref, EnhancedComponent];
}
exports.default = useRefFor;
//# sourceMappingURL=useRefFor.js.map