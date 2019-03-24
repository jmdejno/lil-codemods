import { Node } from "jscodeshift";

export function sortNodesByAccessLevel(
  nodes: Node[],
  selector: (node: any) => string
) {
  const sorter = (a: string, b: string) =>
    a.startsWith("_") ? 1 : b.startsWith("_") ? -1 : 0;
  return sortNodesBy(nodes, selector, sorter);
}

export function sortNodesByArray(
  nodes: Node[],
  selector: (node: any) => string,
  order: string[]
) {
  const nodeMap = nodes.reduce((acc, node) => {
    const key = selector(node);
    if (key) {
      acc[key] = node;
    }
    return acc;
  }, {});
  return order.reduce((ordered: Node[], match: string) => {
    const target = nodeMap[match];
    if (target) {
      ordered.push(target);
    }
    return ordered;
  }, []);
}

function sortNodesBy(
  nodes: any[],
  selector: (node: Node) => string,
  sorter: (a: string, b: string) => number
) {
  return nodes.sort((a, b) => {
    return sorter(selector(a), selector(b));
  });
}
