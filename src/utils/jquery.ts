import {
  JSCodeshift,
  ASTPath,
  CallExpression,
  MemberExpression,
  ThisExpression
} from "jscodeshift";

/**
 * Recursively determine if this is a `this.$` CallExpression
 * @param j {JSCodeshift}
 * @param path
 */
export function isThis$CallExpression(
  j: JSCodeshift,
  path: ASTPath<CallExpression>
) {
  return !!getThis$Expression(j, path);
};

export function getThis$ExpressionArguments(j: JSCodeshift, path: ASTPath<CallExpression>) {
  const this$ = getThis$Expression(j, path);
  return this$.arguments || [];
}

export function getThis$ExpressionChainedMethods(j: JSCodeshift, path: ASTPath<CallExpression>) {
  const this$ = getThis$Expression(j, path);
}

export function getThis$Expression(j:JSCodeshift, path: ASTPath<CallExpression | MemberExpression>): CallExpression {
  const { node } = path;
  let curr = node;
  while (curr) {
    if (
      j.CallExpression.check(curr) &&
      j.MemberExpression.check(curr.callee) &&
      j.ThisExpression.check(curr.callee.object) &&
      j.Identifier.check(curr.callee.property) &&
      curr.callee.property.name === "$"
    ) {
      return curr
    }
    curr = j.MemberExpression.check(curr)
      ? j.CallExpression.check(curr.object) && curr.object
      : j.CallExpression.check(curr)
      ? j.MemberExpression.check(curr.callee) && curr.callee
      : null;
  }
}