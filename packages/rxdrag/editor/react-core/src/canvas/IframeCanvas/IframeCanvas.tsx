/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { useMemo, useRef } from "react"
import { memo, useCallback } from "react"
import { useDesignerEngine } from "../../hooks";
import { IDocument, IFrameCanvasImpl } from "@rxdrag/core";
import { CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, MouseClickDriver, MouseMoveDriver } from "@rxdrag/core";
import { MouseOverOutDriver, DragOverDriver, MouseUpDriver } from "@rxdrag/core";
import { useDocumentViewTypeState } from "../../hooks/useDocumentViewTypeState";
import { CanvasShell } from "../CanvasShell";
import { EVENT_DOC_CHANGE, EVENT_IFRAME_READY } from "./consts";

export const IframeCanvas = memo((
  props: {
    doc: IDocument
    renderUrl: string,
  }
) => {
  const { doc, renderUrl } = props;
  const ref = useRef<HTMLIFrameElement>(null)
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const [loaded, setLoaded] = useState(false);

  console.log("IframeCanvas 刷新", doc.id)

  const engine = useDesignerEngine()

  const handleLoaded = useCallback(() => {
    if (ref.current && engine && ref.current.contentWindow) {
      (ref.current.contentWindow as any)["engine"] = engine;
      // 需要确认 iframe 加载完毕以后再渲染，实际顺序无法保证，所以通过 postMessage 来通知子窗口
      ref.current.contentWindow.postMessage({ name: EVENT_IFRAME_READY });
      setLoaded(true)
    }
  }, [engine])

  useEffect(() => {
    const shell = engine?.getShell()
    if (loaded && engine && ref.current) {
      const canvasImpl = new IFrameCanvasImpl(
        engine,
        ref.current,
        doc.id,
        [
          DragDropDriver,
          DragOverDriver,
          MouseClickDriver,
          MouseMoveDriver,
          MouseOverOutDriver,
          CanvasResizeDriver,
          CanvasScrollDriver,
          MouseUpDriver
        ]
      )

      shell?.addCanvas(canvasImpl)
      ref.current?.contentWindow?.postMessage({ name: EVENT_DOC_CHANGE, payload: doc.id });

      return () => {
        shell?.removeCanvas(doc.id)
      }
    }
  }, [doc.id, engine, loaded])

  const key = useMemo(() => `canvas-${doc.id}`, [doc.id])

  return (
    <CanvasShell display={viewType === "design"} >
      <iframe
        ref={ref}
        title={key}
        style={{ border: "0", width: "100%", height: "100%" }}
        src={engine ? renderUrl : undefined}
        onLoad={handleLoaded}
      >
      </iframe>
    </CanvasShell>
  )
})