"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = (function (value, limit) {
    if (limit === void 0) { limit = 100; }
    var _a = react_1.useState(value), throttledValue = _a[0], setThrottledValue = _a[1];
    var lastRan = react_1.useRef(Date.now());
    react_1.useEffect(function () {
        var handler = setTimeout(function () {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));
        return function () {
            clearTimeout(handler);
        };
    }, [value, limit]);
    return throttledValue;
});
//# sourceMappingURL=useThrottle.js.map