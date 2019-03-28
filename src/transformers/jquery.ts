import { JSCodeshift, File, ASTPath, CallExpression, MemberExpression } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import {
  isThis$CallExpression,
  getThis$Expression,
  getExpressionChainedMethods
} from "../utils/jquery";
import {
  jQueryToNativeDomMap,
  jQueryToNativeDomProp
} from "../utils/constants";

interface IJqueryTransformerOptions {
  include: string[];
}

export = class JqueryTransformer {
  public static transform(
    j: JSCodeshift,
    root: Collection<File>,
  ) {
    this.j = j;
    return new JqueryTransformer(root);
  }

  private static j: JSCodeshift;

  private static replaceThis$Method(
    j: JSCodeshift,
    method: ASTPath<CallExpression>
  ) {
    const { node } = method;
    const name = this._getMethodName(j, method);
    if (name && jQueryToNativeDomMap[name]) {
      const domName = jQueryToNativeDomMap[name];
      if (name === "is") {
        const arg = node.arguments[0];
        const prop = j.Literal.check(arg) && arg.value;
        const callee = j.MemberExpression.check(node.callee) && node.callee;
        method.replace(
          j.memberExpression(callee.object, j.identifier(`${prop}`))
        );
      } else if (jQueryToNativeDomProp[name]) {
        const callee = j.MemberExpression.check(node.callee) && node.callee;
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
    path: ASTPath<CallExpression>,
  ) {
    const methods = getExpressionChainedMethods(j, path);
    methods.forEach(method => this.replaceThis$Method(j, method));
    return path.node;
  }

  private static _getMethodName(j: JSCodeshift ,method: ASTPath<CallExpression>) {
    const { node } = method;
    const callee = j.MemberExpression.check(node.callee) && node.callee;
    return j.Identifier.check(callee.property) && callee.property.name;
  }

  private _$: Collection<any>;

  private constructor(
    root: Collection<File>,
  ) {
    this._transform(root);
  }

  private _transform(root: Collection<File>) {
    const j = JqueryTransformer.j;
    this._$ = root
      .find(j.CallExpression)
      .filter(path => isThis$CallExpression(j, path.node));
    if (this._$.size()) {
      this._$.replaceWith(path => JqueryTransformer.buildThisElement(j, path));
      this._$.replaceWith(path =>
        JqueryTransformer.replaceWithNativeDom(j, path)
      );
    }
  }
};
