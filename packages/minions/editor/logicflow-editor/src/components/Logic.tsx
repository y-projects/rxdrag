import { memo, useEffect, useRef } from "react"
import { useEditEdge } from "../hooks/edit-meta/useEditEdge"
import { useAddNode } from "../hooks/edit-meta/useAddNode"
import { useMovedNode } from "../hooks/edit-meta/useMovedNode"
import { useArrowhead } from "../hooks/useArrowhead"
import { useShowCells } from "../hooks/useShowCells"
import { useSelection } from "../hooks/useSelection"
import { useChangeFlag } from "../hooks/useChangeFlag"
import { useMetas } from "../hooks/useMetas"
import { useSetZoom } from "../hooks/useSetZoom"
import { ILogicMetas } from "../interfaces"
import { useChildPositionChange } from "../hooks/edit-meta/useChildPositionChange"
import { useNodeEmbedded } from "../hooks/edit-meta/useNodeEmbedded"

export const Logic = memo((
  props: {
    onChange: (metas: ILogicMetas) => void,
  }
) => {
  const { onChange } = props;
  const { changeFlag } = useChangeFlag()
  const { metas } = useMetas()
  const metasRef = useRef(metas)
  metasRef.current = metas;
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useShowCells()
  useAddNode()
  useEditEdge()
  useMovedNode()
  useArrowhead()
  useSelection()
  useChildPositionChange();
  useNodeEmbedded();
  useSetZoom()
  useEffect(() => {
    if (changeFlag && metasRef.current) {
      onChangeRef.current(metasRef.current)
    }
  }, [changeFlag])

  return null
})