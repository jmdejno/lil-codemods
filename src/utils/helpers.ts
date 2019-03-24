import {
  emberLifecycleHooks,
  emberMultiLineObjectMethods,
  emberSingleLineObjectMethods
} from "./constants";
import { NodePath } from "recast";
import {
  JSCodeshift,
  Property,
  Identifier,
  ObjectProperty,
  CallExpression,
  ObjectMethod
} from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";

export const lifecycleHookOrder: emberLifecycleHooks[] = [
  emberLifecycleHooks.INIT,
  emberLifecycleHooks.SETUP_CONTROLLER,
  emberLifecycleHooks.DID_RECIECE_ATTRS,
  emberLifecycleHooks.WILL_RENDER,
  emberLifecycleHooks.DID_INSERT_ELEMENT,
  emberLifecycleHooks.DID_RENDER,
  emberLifecycleHooks.DID_UPDATE_ATTRS,
  emberLifecycleHooks.WILL_UPDATE,
  emberLifecycleHooks.WILL_DESTORY,
  emberLifecycleHooks.WILL_DESTROY_ELEMENT,
  emberLifecycleHooks.WILL_CLEAR_RENDER,
  emberLifecycleHooks.DID_DESTROY_ELEMENT,
  emberLifecycleHooks.RESET_CONTROLLER
];

export function isPropertyOf(
  j: JSCodeshift,
  path: NodePath<Property | ObjectProperty | ObjectMethod>,
  name: string
): boolean {
  if (j.ObjectProperty.check(path.node) || j.ObjectMethod.check(path.node)) {
    const obj = path.parent;
    const callExpression =
      j.CallExpression.check(obj.parent.node) && obj.parent.node;
    const id =
      callExpression &&
      j.MemberExpression.check(callExpression.callee) &&
      (callExpression.callee.object as Identifier);
    return id && id.name === name;
  }
  return false;
}

export function isNamedObjectPropertyOf(
  j: JSCodeshift,
  path: NodePath<ObjectProperty>,
  propName: string,
  objName: string
) {
  const { node } = path;
  const key = node && j.Identifier.check(node.key) && node.key;
  return !!(
    isPropertyOf(j, path, objName) &&
    key &&
    key.name &&
    key.name === propName
  );
}

export function isObjectWithFunctionValue(
  j: JSCodeshift,
  path: NodePath<ObjectProperty>
) {
  const { node } = path;
  return j.ObjectProperty.check(node) && j.CallExpression.check(node.value);
}

export function getObjectPropertyValueName(
  j: JSCodeshift,
  path: NodePath<ObjectProperty>
) {
  const { node } = path;
  const callExpression =
    isObjectWithFunctionValue(j, path) && (node.value as CallExpression);
  const callee = callExpression && callExpression.callee;
  return callee && j.Identifier.check(callee)
    ? callee.name
    : j.MemberExpression.check(callee) &&
        j.CallExpression.check(callee.object) &&
        j.Identifier.check(callee.object.callee) &&
        callee.object.callee.name;
}

export function isMultilineProperty(
  j: JSCodeshift,
  path: NodePath<ObjectProperty>
): boolean {
  const funcName = getObjectPropertyValueName(j, path);
  return (
    funcName &&
    Object.values(emberMultiLineObjectMethods).some(
      method => funcName === method
    )
  );
}

export function isSingleLineProperty(
  j: JSCodeshift,
  path: NodePath<ObjectProperty>
): boolean {
  const funcName = getObjectPropertyValueName(j, path);
  return Object.values(emberSingleLineObjectMethods).some(
    method => funcName === method
  );
}

export function findObjectPropsBy(
  j: JSCodeshift,
  obj: Collection<any>,
  filter: (j: JSCodeshift, value: NodePath<ObjectProperty>) => boolean,
  objName?: string
) {
  return obj
    .find(j.ObjectProperty)
    .filter(
      p => filter(j, p) && (objName ? isPropertyOf(j, p, objName) : true)
    );
}

export function isPrivateProperty(
  j: JSCodeshift,
  path: NodePath<Property | ObjectProperty | ObjectMethod>
): boolean {
  const { node } = path;
  const id = node && j.Identifier.check(node.key) && (node.key as Identifier);
  return !!(id && id.name && id.name.startsWith("_"));
}

export function getNodes(...paths: Collection<any>[]) {
  return paths.reduce((nodes: any[], path) => {
    return nodes.concat(path.nodes());
  }, []);
}

export function insertLineBeforeObjectProps(
  j: JSCodeshift,
  ...collections: Collection<ObjectMethod | ObjectProperty>[]
) {
  collections.forEach(collection => {
    const ids = collection.find(j.Identifier);
  });
}
