import {Node} from "./node"

export class Canvas extends Node{
  constructor(workspace) {
    super()
    this.activeState = this.normalState
    this.focusState = this.normalState
    this.parentViewDomElement = workspace;
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol','BSW100']
    this.heightDropMargin = 0;
    this.widthDropMargin = 0;
    this.padding = '30px';

    this.stateChanged = (oldState, newState)=>{}
  }

  getParentViewDomElement(){
    return this.parentViewDomElement
  }

  toViewModel(){
    let model = super.toViewModel()
    model.name = 'div'
    model.styles.width = "100%"
    model.styles['min-height'] = "calc(100vh)"
    model.styles.cursor = 'default'
    model.styles['padding'] = '2px'
    model.styles['padding-top'] = '25px'
    //model.styles['padding-right'] = '5px'
    model.classList.push('canvas')
    model.toolbar = ''
    model.label = ''
    return model
  }

}

