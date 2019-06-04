"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function If(props) {
    var condition = props.condition;
    if (condition) {
        return (React.createElement(React.Fragment, null,
            props.then ? props.then() : null,
            props.children || null));
    }
    return props.else ? props.else() : null;
}
;
exports.default = If;
//# sourceMappingURL=index.js.map