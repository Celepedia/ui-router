import {abstractKey} from "../common/common"
import {IState, IStateDeclaration, IStateOrName} from "./interface"

import {IRawParams, IParamsOrArray} from "../params/interface"
import ParamValues from "../params/paramValues"

import {IParamsPath, IParamsNode} from "../path/interface"
import Path from "../path/path"
import PathFactory from "../path/pathFactory"

import {ITransitionOptions} from "../transition/interface"
/**
 * @ngdoc object
 * @name ui.router.state.type:TargetState
 *
 * @description
 * Encapsulate the desired target of a transition.
 * Wraps an identifier for a state, a set of parameters, and transition options with the definition of the state.
 *
 * @param {IStateOrName} _identifier  An identifier for a state. Either a fully-qualified path, or the object
 *            used to define the state.
 * @param {IState} _definition The `State` object definition.
 * @param {IParamsOrArray} _params Parameters for the target state
 * @param {ITransitionOptions} _options Transition options.
 */
export default class TargetState {
  constructor(
    private _identifier: IStateOrName, 
    private _definition?: IState,
    private _params: IParamsOrArray = {},
    private _options: ITransitionOptions = {}) {
  }

  name() {
    return this._definition && this._definition.name || this._identifier;
  }

  identifier(): IStateOrName {
    return this._identifier;
  }

  params(): IParamsOrArray {
    return this._params;
  }

  $state(): IState {
    return this._definition;
  }

  state(): IStateDeclaration {
    return this._definition && this._definition.self;
  }

  options() {
    return this._options;
  }

  exists(): boolean {
    return !!(this._definition && this._definition.self);
  }

  valid(): boolean {
    return !this.error();
  }

  error(): string {
    let base = <any> this.options().relative;
    if (!this._definition && !!base) {
      let stateName = base.name ? base.name : base;
      return `Could not resolve '${this.name()}' from state '${stateName}'`;
    }
    if (!this._definition)
      return `No such state '${this.name()}'`;
    if (!this._definition.self)
      return `State '${this.name()}' has an invalid definition`;
  }
}