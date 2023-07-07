import { FieldActionPayload, INPUT_FIELD_VALUE, SET_FIELD_INITAL_VALUE, SET_FIELD_STATE, SetFieldStatePayload } from "../../../actions";
import { FieldState, IAction } from "../../../interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  switch (action.type) {
    case SET_FIELD_STATE:
      return {
        ...state,
        ...(action.payload as SetFieldStatePayload).fieldState
      }
    case INPUT_FIELD_VALUE:
      return {
        ...state,
        modified: true
      }
    case SET_FIELD_INITAL_VALUE:{
      return {
        ...state,
        modified: false
      }
    }
    default:
      return state
  }
}