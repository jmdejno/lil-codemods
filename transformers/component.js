"use strict";
var constants_1 = require("../utils/constants");
var helpers_1 = require("../utils/helpers");
module.exports = /** @class */ (function () {
    // #endregion
    function Component(root) {
        this._foundObjectProps = new Set();
        this._component = Component._getComponent(root);
        this._isComponent = !!this._component.size();
        if (this._isComponent) {
            this._findObjectProps(this._component);
        }
    }
    //#region public statics
    Component.build = function (j, root) {
        Component.jscodeshift = j;
        return new Component(root);
    };
    Component.isEmberComponentProp = function (j, path) {
        var node = path.node;
        var key = node && j.Identifier.check(node.key) && node.key;
        return !!(Component.isComponentObjectProperty(j, path) &&
            key &&
            key.name &&
            Object.values(constants_1.emberComponentProps).some(function (emberProp) { return emberProp === key.name; }));
    };
    Component.isEmberLifecycleHook = function (j, path) {
        var node = path.node;
        var key = node && j.Identifier.check(node.key) && node.key;
        return !!(Component.isComponentObjectProperty(j, path) &&
            key &&
            key.name &&
            Object.values(constants_1.emberLifecycleHooks).some(function (emberProp) { return emberProp === key.name; }));
    };
    Component.isComponentObjectProperty = function (j, path) {
        return helpers_1.isPropertyOf(j, path, constants_1.emberObjectTypes.COMPONENT);
    };
    // #endregion
    //#region private statics
    Component._getComponent = function (root) {
        var j = Component.jscodeshift;
        return root.find(j.ExportDefaultDeclaration, {
            declaration: { callee: { object: { name: constants_1.emberObjectTypes.COMPONENT } } }
        });
    };
    Component._findServices = function (component) {
        var j = Component.jscodeshift;
        return component
            .find(j.ObjectProperty, {
            value: { callee: { name: "service" } }
        })
            .filter(function (path) { return Component.isComponentObjectProperty(j, path); });
    };
    Component._findEmberLifecycleHooks = function (component) {
        var _this = this;
        var j = this.jscodeshift;
        var props = component
            .find(j.ObjectProperty)
            .filter(function (path) { return _this.isEmberLifecycleHook(j, path); });
        var methods = component
            .find(j.ObjectMethod)
            .filter(function (path) { return _this.isEmberLifecycleHook(j, path); });
        return { props: props, methods: methods };
    };
    Component._findEmberProps = function (component) {
        var _this = this;
        var j = this.jscodeshift;
        return component
            .find(j.ObjectProperty)
            .filter(function (path) { return _this.isEmberComponentProp(j, path); });
    };
    Component._findComponentActions = function (component) {
        var j = this.jscodeshift;
        return component
            .find(j.ObjectProperty)
            .filter(function (p) {
            return helpers_1.isNamedObjectPropertyOf(j, p, "actions", constants_1.emberObjectTypes.COMPONENT);
        });
    };
    Component._findNonEmberProps = function (component, foundProps) {
        var _this = this;
        var j = Component.jscodeshift;
        var nonEmberProps = component
            .find(j.ObjectProperty)
            .filter(function (p) { return !foundProps.has(p.node) && _this.isComponentObjectProperty(j, p); });
        var publicProps = nonEmberProps.filter(function (p) { return !helpers_1.isPrivateProperty(j, p); });
        var privateProps = nonEmberProps.filter(function (p) { return helpers_1.isPrivateProperty(j, p); });
        var nonEmberMethods = component
            .find(j.ObjectMethod)
            .filter(function (p) { return !foundProps.has(p.node) && _this.isComponentObjectProperty(j, p); });
        var privateMethods = nonEmberMethods.filter(function (p) { return helpers_1.isPrivateProperty(j, p); });
        var publicMethods = nonEmberMethods.filter(function (p) { return !helpers_1.isPrivateProperty(j, p); });
        return { publicProps: publicProps, privateProps: privateProps, privateMethods: privateMethods, publicMethods: publicMethods };
    };
    Component.prototype.reorder = function () {
        if (!this._isComponent) {
            return;
        }
        var j = Component.jscodeshift;
        var originalObj = this._component.get("declaration", "arguments", 0);
        var props = [
            this._services,
            this._emberProps,
            this._publicProps,
            this._privateProps,
            this._singleLineComputedProps,
            this._mutliLineComputeProps,
            this._lifecycleHooksProps,
            this._lifecycleHooksMethods,
            this._actions,
            this._publicMethods,
            this._privateMethods
        ];
        var obj = j.objectExpression(helpers_1.getNodes.apply(void 0, props));
        originalObj.replace(obj);
        // insertLineBeforeObjectProps(j, ...props);
    };
    Component.prototype._findObjectProps = function (component) {
        var j = Component.jscodeshift;
        this._services = Component._findServices(component);
        this._emberProps = Component._findEmberProps(component);
        var _a = Component._findEmberLifecycleHooks(component), props = _a.props, methods = _a.methods;
        this._lifecycleHooksProps = props;
        this._lifecycleHooksMethods = methods;
        this._actions = Component._findComponentActions(component);
        this._singleLineComputedProps = helpers_1.findObjectPropsBy(j, component, helpers_1.isSingleLineProperty, constants_1.emberObjectTypes.COMPONENT);
        this._mutliLineComputeProps = helpers_1.findObjectPropsBy(j, component, helpers_1.isMultilineProperty, constants_1.emberObjectTypes.COMPONENT);
        this._addToFoundObjectProps(this._services, this._lifecycleHooksProps, this._lifecycleHooksMethods, this._emberProps, this._actions, this._singleLineComputedProps, this._mutliLineComputeProps);
        var _b = Component._findNonEmberProps(component, this._foundObjectProps), publicProps = _b.publicProps, privateProps = _b.privateProps, publicMethods = _b.publicMethods, privateMethods = _b.privateMethods;
        this._publicProps = publicProps;
        this._privateProps = privateProps;
        this._publicMethods = publicMethods;
        this._privateMethods = privateMethods;
        this._addToFoundObjectProps(publicProps, privateProps, publicMethods, privateMethods);
    };
    Component.prototype._addToFoundObjectProps = function () {
        var _this = this;
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        props.forEach(function (path) {
            return path.nodes().forEach(function (node) { return _this._foundObjectProps.add(node); });
        });
    };
    return Component;
}());
//# sourceMappingURL=component.js.map