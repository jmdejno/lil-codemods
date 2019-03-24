"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
exports.lifecycleHookOrder = [
    constants_1.emberLifecycleHooks.INIT,
    constants_1.emberLifecycleHooks.SETUP_CONTROLLER,
    constants_1.emberLifecycleHooks.DID_RECIECE_ATTRS,
    constants_1.emberLifecycleHooks.WILL_RENDER,
    constants_1.emberLifecycleHooks.DID_INSERT_ELEMENT,
    constants_1.emberLifecycleHooks.DID_RENDER,
    constants_1.emberLifecycleHooks.DID_UPDATE_ATTRS,
    constants_1.emberLifecycleHooks.WILL_UPDATE,
    constants_1.emberLifecycleHooks.WILL_DESTORY,
    constants_1.emberLifecycleHooks.WILL_DESTROY_ELEMENT,
    constants_1.emberLifecycleHooks.WILL_CLEAR_RENDER,
    constants_1.emberLifecycleHooks.DID_DESTROY_ELEMENT,
    constants_1.emberLifecycleHooks.RESET_CONTROLLER
];
function isPropertyOf(j, path, name) {
    if (j.ObjectProperty.check(path.node) || j.ObjectMethod.check(path.node)) {
        var obj = path.parent;
        var callExpression = j.CallExpression.check(obj.parent.node) && obj.parent.node;
        var id = callExpression &&
            j.MemberExpression.check(callExpression.callee) &&
            callExpression.callee.object;
        return id && id.name === name;
    }
    return false;
}
exports.isPropertyOf = isPropertyOf;
function isNamedObjectPropertyOf(j, path, propName, objName) {
    var node = path.node;
    var key = node && j.Identifier.check(node.key) && node.key;
    return !!(isPropertyOf(j, path, objName) &&
        key &&
        key.name &&
        key.name === propName);
}
exports.isNamedObjectPropertyOf = isNamedObjectPropertyOf;
function isObjectWithFunctionValue(j, path) {
    var node = path.node;
    return j.ObjectProperty.check(node) && j.CallExpression.check(node.value);
}
exports.isObjectWithFunctionValue = isObjectWithFunctionValue;
function getObjectPropertyValueName(j, path) {
    var node = path.node;
    var callExpression = isObjectWithFunctionValue(j, path) && node.value;
    var callee = callExpression && callExpression.callee;
    return callee && j.Identifier.check(callee)
        ? callee.name
        : j.MemberExpression.check(callee) &&
            j.CallExpression.check(callee.object) &&
            j.Identifier.check(callee.object.callee) &&
            callee.object.callee.name;
}
exports.getObjectPropertyValueName = getObjectPropertyValueName;
function isMultilineProperty(j, path) {
    var funcName = getObjectPropertyValueName(j, path);
    return (funcName &&
        Object.values(constants_1.emberMultiLineObjectMethods).some(function (method) { return funcName === method; }));
}
exports.isMultilineProperty = isMultilineProperty;
function isSingleLineProperty(j, path) {
    var funcName = getObjectPropertyValueName(j, path);
    return Object.values(constants_1.emberSingleLineObjectMethods).some(function (method) { return funcName === method; });
}
exports.isSingleLineProperty = isSingleLineProperty;
function findObjectPropsBy(j, obj, filter, objName) {
    return obj
        .find(j.ObjectProperty)
        .filter(function (p) { return filter(j, p) && (objName ? isPropertyOf(j, p, objName) : true); });
}
exports.findObjectPropsBy = findObjectPropsBy;
function isPrivateProperty(j, path) {
    var node = path.node;
    var id = node && j.Identifier.check(node.key) && node.key;
    return !!(id && id.name && id.name.startsWith("_"));
}
exports.isPrivateProperty = isPrivateProperty;
function getNodes() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return paths.reduce(function (nodes, path) {
        return nodes.concat(path.nodes());
    }, []);
}
exports.getNodes = getNodes;
function insertLineBeforeObjectProps(j) {
    var collections = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        collections[_i - 1] = arguments[_i];
    }
    collections.forEach(function (collection) {
        var ids = collection.find(j.Identifier);
    });
}
exports.insertLineBeforeObjectProps = insertLineBeforeObjectProps;
//# sourceMappingURL=helpers.js.map