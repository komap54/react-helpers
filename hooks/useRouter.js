"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Router = require("react-router");
exports.default = (function () {
    var _a = react_1.useState(Symbol('__')), __ = _a[0], forceUpdate = _a[1];
    // eslint-disable-next-line no-underscore-dangle
    var routerContext = react_1.useContext(Router.__RouterContext);
    react_1.useEffect(function () { return routerContext.history.listen(function (arg0) { return forceUpdate(Symbol('__')); }); }, [routerContext]);
    return routerContext;
});
//# sourceMappingURL=useRouter.js.map