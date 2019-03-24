import { JSCodeshift } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import { NodePath } from "recast";
declare const _default: {
    new (root: Collection<import("ast-types/gen/nodes").File>): {
        _isComponent: boolean;
        _component: Collection<any>;
        _services: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _emberProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _publicProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _privateProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _actions: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _singleLineComputedProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _mutliLineComputeProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _lifecycleHooksProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _lifecycleHooksMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        _privateMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        _publicMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        _foundObjectProps: Set<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod>;
        reorder(): void;
        _findObjectProps(component: Collection<any>): void;
        _addToFoundObjectProps(...props: Collection<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod>[]): void;
    };
    build(j: JSCodeshift, root: Collection<import("ast-types/gen/nodes").File>): {
        _isComponent: boolean;
        _component: Collection<any>;
        _services: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _emberProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _publicProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _privateProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _actions: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _singleLineComputedProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _mutliLineComputeProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _lifecycleHooksProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        _lifecycleHooksMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        _privateMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        _publicMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        _foundObjectProps: Set<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod>;
        reorder(): void;
        _findObjectProps(component: Collection<any>): void;
        _addToFoundObjectProps(...props: Collection<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod>[]): void;
    };
    isEmberComponentProp(j: JSCodeshift, path: NodePath<import("ast-types/gen/nodes").ObjectProperty, any>): boolean;
    isEmberLifecycleHook(j: JSCodeshift, path: NodePath<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod, any>): boolean;
    isComponentObjectProperty(j: JSCodeshift, path: NodePath<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod, any>): boolean;
    _getComponent(root: Collection<any>): Collection<any>;
    _findServices(component: Collection<any>): Collection<any>;
    _findEmberLifecycleHooks(component: Collection<any>): {
        props: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        methods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
    };
    _findEmberProps(component: Collection<any>): Collection<import("ast-types/gen/nodes").ObjectProperty>;
    _findComponentActions(component: Collection<any>): Collection<import("ast-types/gen/nodes").ObjectProperty>;
    _findNonEmberProps(component: Collection<any>, foundProps: WeakSet<import("ast-types/gen/nodes").ObjectProperty | import("ast-types/gen/nodes").ObjectMethod>): {
        publicProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        privateProps: Collection<import("ast-types/gen/nodes").ObjectProperty>;
        privateMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
        publicMethods: Collection<import("ast-types/gen/nodes").ObjectMethod>;
    };
    jscodeshift: JSCodeshift;
};
export = _default;