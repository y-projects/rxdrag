import { Graph } from "@antv/x6";
import { IControllerMeta, ILogicMetas } from "@rxdrag/schema";
import { createContext } from "react";
import { EditorStore } from "./classes/EditorStore";
import { IState } from "./interfaces/state";


export interface IReactionsEditorParams extends IState {
  graph?: Graph
  dispatch: React.Dispatch<any>
}

export const initialState: IState = {
  changeFlag: 0,
  undoList: [],
  redoList: [],
  metas: {
    reactions: [],
    invokes: [],
  },
  selected: undefined,
  zoom: 1,
}

export const ReacionsEditorStoreContext = createContext<EditorStore | undefined>(undefined)

export const GraphContext = createContext<Graph | undefined>(undefined)
export const ControllerContext = createContext<IControllerMeta | undefined>(undefined)
export const ControllersContext = createContext<IControllerMeta[]>([])
