import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class DragStartEvent
  extends AbstractMouseEvent
  implements ICustomEvent
{
  type = 'drag:start'
}
