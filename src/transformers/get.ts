import { Collection } from "jscodeshift/src/Collection";
import { JSCodeshift, CallExpression, ASTPath } from "jscodeshift";
import { ensureImport } from "../utils/imports";

export = class GetTransformer {

  public static transform(j: JSCodeshift, root: Collection<any>) {
    ensureImport(j, root, "get", "@ember/object/computed");
    const gets = root
      .find(j.CallExpression)
      .filter(p => this.isThisGetExpresion(j, p));
    gets.replaceWith(p => this.replaceWithGet(j, p));
  }

  public static isThisGetExpresion(
    j: JSCodeshift,
    path: ASTPath<CallExpression>
  ): boolean {
    const { node } = path;
    let curr = j.CallExpression.check(node) && node.callee;
    const [object, property] = curr &&
      j.MemberExpression.check(curr) && [curr.object, curr.property];
    return (
      j.ThisExpression.check(object) &&
      j.Identifier.check(property) &&
      property.name === "get"
    );
  }

  private static replaceWithGet(j: JSCodeshift, path: ASTPath<CallExpression>) {
    const args = path.node.arguments;
    return j.callExpression(j.identifier("get"), [j.thisExpression(), ...args]);
  }
};
