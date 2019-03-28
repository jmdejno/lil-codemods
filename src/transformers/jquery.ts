import {
  JSCodeshift,
  ObjectProperty,
  ObjectMethod,
  File,
  ASTPath,
  CallExpression,
  MemberExpression
} from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import {
  isThis$CallExpression,
  getThis$ExpressionArguments,
  getThis$Expression,
  getThis$ExpressionChainedMethodExpressions
} from "../utils/jquery";
import {
  jQueryToNativeDomMap,
  jQueryToNativeDomProp
} from "../utils/constants";

export = class JqueryTransformer {
  public static transform(j: JSCodeshift, root: Collection<File>) {
    this.j = j;
    return new JqueryTransformer(root);
  }

  private static j: JSCodeshift;

  private static replaceThis$Method(
    j: JSCodeshift,
    method: ASTPath<CallExpression>
  ) {
    const { node } = method;
    const callee = j.MemberExpression.check(node.callee) && node.callee;
    const name = j.Identifier.check(callee.property) && callee.property.name;
    if (name && jQueryToNativeDomMap[name]) {
      const domName = jQueryToNativeDomMap[name];
      if (jQueryToNativeDomProp[name]) {
        method.replace(
          j.memberExpression(callee.object, j.identifier(domName))
        );
      } else {
        method.get("callee", "property").replace(j.identifier(domName));
      }
    }
  }

  private static buildThisElement(
    j: JSCodeshift,
    path: ASTPath<CallExpression>
  ) {
    const this$ = getThis$Expression(j, path.node);
    const thisElement = j.memberExpression(
      j.thisExpression(),
      j.identifier("element")
    );
    return this$.arguments && this$.arguments.length
      ? j.callExpression(
          j.memberExpression(thisElement, j.identifier("querySelector")),
          this$.arguments
        )
      : thisElement;
  }

  private static replaceWithNativeDom(
    j: JSCodeshift,
    path: ASTPath<CallExpression>
  ) {
    const methods = getThis$ExpressionChainedMethodExpressions(j, path);
    methods.forEach(method => this.replaceThis$Method(j, method));
    return path.node;
  }

  private _$: Collection<any>;
  private _empty$: Collection<any>;
  private _selector$: Collection<any>;

  private constructor(root: Collection<File>) {
    this._findThis$(root);
    this._transform(root);
  }

  private _transform(root: Collection<File>) {
    const j = JqueryTransformer.j;
    if (this._$.size()) {
      this._$.replaceWith(path => JqueryTransformer.buildThisElement(j, path));
      this._$.replaceWith(path =>
        JqueryTransformer.replaceWithNativeDom(j, path)
      );
    }
  }

  private _findThis$(root: Collection<File>) {
    const j = JqueryTransformer.j;
    this._$ = root
      .find(j.CallExpression)
      .filter(path => isThis$CallExpression(j, path.node));
  }
};
