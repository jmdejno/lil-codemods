import { JSCodeshift, ObjectProperty, ObjectMethod, File, ASTPath, ImportDeclaration, ImportSpecifier } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";

export class ImportTransformer {

  public static build(j: JSCodeshift, root: Collection<File>) {
    this.j = j;
    return new ImportTransformer(root);
  }

  public static findImports(j: JSCodeshift, root: Collection<any>) {
    return root.find(j.ImportDeclaration);
  }

  private static _maybeRemoveImport(j: JSCodeshift, root: Collection<File>, importDeclaration: ASTPath<ImportDeclaration>) {
    const specifiers = importDeclaration.get("specifiers") as ASTPath<ImportSpecifier>;

  }

  private static  j: JSCodeshift;

  private _root: Collection<File>;
  private _imports: Collection<ImportDeclaration>;

  private constructor(root: Collection<File>) {
    this._root = root;
    this._findImports(root);
  }

  public removeUnused() {
    const j = ImportTransformer.j;

    this._root.find(j.ImportSpecifier).forEach(specifier => {
      const name = specifier.node.local.name;
      const ids = this._root.find(j.Identifier, {name}).filter(p => !j.ImportSpecifier.check(p.parent.node))
      if (!ids.size()) {
        specifier.replace();
      }
    })
    this._root.find(j.ImportDeclaration).filter(i => !i.node.specifiers.length).remove()
  }

  private _findImports(root: Collection<File>) {
    const j = ImportTransformer.j;
    this._imports = ImportTransformer.findImports(j, root);
  }
}

