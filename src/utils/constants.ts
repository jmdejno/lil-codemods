export enum emberLifecycleHooks {
  INIT = "init",
  SETUP_CONTROLLER = "setupController",
  DID_RECIECE_ATTRS = "didReceiveAttrs",
  WILL_RENDER = "willRender",
  DID_INSERT_ELEMENT = "didInsertElement",
  DID_RENDER = "didRender",
  DID_UPDATE_ATTRS = "didUpdateAttrs",
  WILL_UPDATE = "willUpdate",
  WILL_DESTORY = "willDestroy",
  WILL_DESTROY_ELEMENT = "willDestroyElement",
  WILL_CLEAR_RENDER = "willClearRender",
  DID_DESTROY_ELEMENT = "didDestroyElement",
  RESET_CONTROLLER = "resetController"
}

export enum emberComponentProps {
  CLASS_NAMES = "classNames",
  CLASS_NAME_BINDINGS = "classNameBindings",
  TAG_NAME = "tagName",
  ATTR_BINDINGS = "attributeBindings",
  LAYOUT = "layout"
}

export enum emberObjectTypes {
  COMPONENT = "Component",
  SERVIICE = "Service"
}

export enum emberMultiLineObjectMethods {
  COMPUTED = "computed",
  FILTER = "filter",
  FILTER_BY = "filterBy",
  MAP = "map",
  MAP_BY = "mapBy"
}

export enum emberSingleLineObjectMethods {
  OR = "or",
  AND = "and",
  NOT = "not",
  ALIAS = "alias",
  BOOL = "bool",
  COLLECT = "collect",
  EMPTY = "empty",
  EQUAL = "equal",
  GT = "gt",
  GTE = "gte",
  LT = "lt",
  LTE = "lte",
  INTERSECT = "intersect",
  MATCH = "max",
  MAX = "max",
  MIN = "min",
  NONE = "none",
  NOT_EMPTY = "notEmpty",
  ONE_WAY = "oneWay",
  READ_ONLY = "readOnly",
  READS = "reads",
  SORT = "sort",
  SUM = "sum",
  UNION = "union",
  UNION_BY = "unionBy",
  UNIQ = "uniq",
  UNIQ_BY = "uniqBy"
}

/**
 * Preferred order of lifecycle hooks
 */
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

export const jQueryToNativeDomMap = {
  find: "querySelector",
  text: "textContent",
  is: true
}

export const jQueryToNativeDomProp = {
  find: false,
  text: true,
  is: true
}

