import { JSCodeshift, ObjectProperty, ObjectMethod, File, ASTPath, CallExpression } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import { isThis$CallExpression, getThis$ExpressionArguments, getThis$Expression } from "../utils/jquery";

export = class JqueryTransformer {
  public static transform(j: JSCodeshift, root: Collection<File>) {
    this.j = j;
    return new JqueryTransformer(root)
  }

  private static j: JSCodeshift;

  private static buildThisElement(j:  JSCodeshift ,path: ASTPath<CallExpression>) {
    const this$ = getThis$Expression(j, path);
    return j.memberExpression(j.thisExpression(), j.identifier('element'));

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
    if(this._$.size()) {
      if(this._empty$.size()) {
        this._empty$.replaceWith(path => JqueryTransformer.buildThisElement(j, path))
      }
    }
  }

  private _findThis$(root: Collection<File>) {
    const j = JqueryTransformer.j;
    this._$ = root.find(j.CallExpression).filter(path => isThis$CallExpression(j, path));
    if(this._$.size()) {
      this._empty$ = this._$.filter(path =>  !getThis$ExpressionArguments(j, path).length);
      this._selector$ = this._$.filter(path =>  !!getThis$ExpressionArguments(j, path).length);
    }
  }
}