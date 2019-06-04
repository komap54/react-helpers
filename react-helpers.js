"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var If_1 = require("./components/If");
var Wait_1 = require("./helpers/Wait");
var useDebounce_1 = require("./hooks/useDebounce");
var useThrottle_1 = require("./hooks/useThrottle");
var useMounted_1 = require("./hooks/useMounted");
var useRouter_1 = require("./hooks/useRouter");
var useRefFor_1 = require("./hooks/useRefFor");
exports._export = {
    If: If_1.default,
    wait: Wait_1.default,
    useDebounce: useDebounce_1.default,
    useMounted: useMounted_1.default,
    useRouter: useRouter_1.default,
    useThrottle: useThrottle_1.default,
    useRefFor: useRefFor_1.default,
};
exports.default = exports._export;
//# sourceMappingURL=react-helpers.js.map