import {
  JSCodeshift,
  ASTPath,
  CallExpression,
  MemberExpression,
  ThisExpression,
  Identifier
} from "jscodeshift";

/**
 * Recursively determine if this is a `this.$` CallExpression
 * @param j {JSCodeshift}
 * @param path
 */
export function isThis$CallExpression(j: JSCodeshift, node: CallExpression) {
  return (
    j.CallExpression.check(node) &&
    j.MemberExpression.check(node.callee) &&
    j.ThisExpression.check(node.callee.object) &&
    j.Identifier.check(node.callee.property) &&
    node.callee.property.name === "$"
  );
}

export function getThis$ExpressionArguments(
  j: JSCodeshift,
  path: ASTPath<CallExpression>
) {
  const this$ = getThis$Expression(j, path.node);
  return (this$ && this$.arguments) || [];
}

export function getThis$ExpressionChainedMethodExpressions(
  j: JSCodeshift,
  path: ASTPath<CallExpression>
): ASTPath<CallExpression>[] {
  const expressions = [];
  let curr = path.parent;
  while (curr) {
    const { node } = curr;
    if (
      j.CallExpression.check(node) &&
      j.MemberExpression.check(node.callee) &&
      j.Identifier.check(node.callee.property)
    ) {
      expressions.push(curr);
    }
    const parent = curr.parent;
    curr =
      j.CallExpression.check(parent.node) ||
      j.MemberExpression.check(parent.node)
        ? parent
        : null;
  }
  return expressions;
}

export function getThis$Expression(
  j: JSCodeshift,
  node: CallExpression
): CallExpression {
  let curr = node as any;
  while (curr) {
    if (isThis$CallExpression(j, curr)) {
      return curr;
    }
    curr = j.MemberExpression.check(curr)
      ? curr.object
      : j.CallExpression.check(curr)
      ? curr.callee
      : null;
  }
}
