import { Collection } from "jscodeshift/src/Collection";
import { JSCodeshift, CallExpression, ASTPath } from "jscodeshift";
import { ensureImport } from "../utils/imports";

export = class MethodTransformer {

  public static transform(j: JSCodeshift, root: Collection<any>, method: string, importSource: string) {
    ensureImport(j, root, method, importSource);
    const gets = root
      .find(j.CallExpression)
      .filter(p => this.isThisMethodExpression(j, p, method));
    gets.replaceWith(p => this.replaceWithFunction(j, p, method));
  }

  public static isThisMethodExpression(
    j: JSCodeshift,
    path: ASTPath<CallExpression>,
    method: string
  ): boolean {
    const { node } = path;
    let curr = j.CallExpression.check(node) && node.callee;
    const [object, property] = curr &&
      j.MemberExpression.check(curr) && [curr.object, curr.property];
    return (
      j.ThisExpression.check(object) &&
      j.Identifier.check(property) &&
      property.name === method
    );
  }

  private static replaceWithFunction(j: JSCodeshift, path: ASTPath<CallExpression>, method: string) {
    const args = path.node.arguments;
    return j.callExpression(j.identifier(method), [j.thisExpression(), ...args]);
  }
};
