import { JSCodeshift } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";

export function ensureImport(
  j: JSCodeshift,
  root: Collection<any>,
  name: string,
  source: string,
  local?: string
) {
  const declaration = root.find(j.ImportDeclaration, {
    source: { value: source }
  });
  const specifer = j.importSpecifier(j.identifier(name), local ? j.identifier(local) : null);
  if (declaration.size()) {
    if (!declaration.find(j.ImportSpecifier, { imported: { name } }).size()) {
      declaration.get("specifiers").push(specifer);
    }
  } else if (root.find(j.ImportDeclaration).size()) {
    const newImport = j.importDeclaration([specifer], j.literal(source));
    root.find(j.ImportDeclaration).insertAfter(newImport);
  } else {
    const newImport = j.importDeclaration([specifer], j.literal(source));
    root.get("program").get("body").insertAt(0, newImport);
  }
}
