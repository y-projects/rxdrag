import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";
import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { useCallback } from "react";

export function useExtractReferencedLogicFlowMetas() {
  const extract = useCallback((controllerMetas: ILogicFlowControllerMeta[]) => {
    const logicFlowMetas: ILogicFlowDefine[] = []
    for (const ctrlMeta of controllerMetas) {
      logicFlowMetas.push(...ctrlMeta.reactions || [])
    }

    return logicFlowMetas
  }, [])

  return extract
}