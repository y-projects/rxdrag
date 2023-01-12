import React, { memo } from "react"
import { Reaction } from "reaction"
import { IReactionsMeta } from "reaction/interfaces"

export const ComponentReaction = memo((
  props: {
    reactionsMeta?: IReactionsMeta,
    children?: React.ReactNode
  }
) => {
  const { reactionsMeta, children } = props

  return (
    reactionsMeta
      ? <Reaction>{children}</Reaction>
      : <>{children}</>
  )
})