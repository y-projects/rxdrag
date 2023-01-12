import { ID, INodeSchema } from "core"
import { memo, useMemo } from "react"
import { ComponentField } from "./ComponentField"
import { ComponentSchemaContext } from "./contexts"
import { usePreviewComponent } from "core-react/hooks/usePreviewComponent"
import { withControl } from "fieldy/components/withControl"
import { ComponentReaction } from "./ComponentReaction"

export interface IComponentRenderSchema extends INodeSchema {
  id: ID,
  children?: IComponentRenderSchema[]
  slots?: {
    [name: string]: IComponentRenderSchema | undefined
  }
}
export type ComponentViewProps = {
  node: IComponentRenderSchema,
}

export const ComponentView = memo((
  props: ComponentViewProps
) => {
  const { node, ...other } = props
  const com = usePreviewComponent(node.componentName)
  const Component = com && withControl(com, node?.["x-field"]);
  const slots = useMemo(() => {
    const slts: { [key: string]: React.ReactElement } = {}
    for (const name of Object.keys(node?.slots || {})) {
      const slot = node?.slots?.[name]
      if (slot) {
        slts[name] = <ComponentView node={slot} />
      }
    }

    return slts
  }, [node?.slots])

  return (
    <ComponentSchemaContext.Provider value={node}>
      <ComponentField fieldMeta={node?.["x-field"]}>
        <ComponentReaction reactionsMeta={node?.["x-reactions"]}>
          {
            Component &&
            (
              !!node.children?.length ?
                <Component {...node.props} {...slots} {...other}>
                  {
                    node.children?.map(child => {
                      return (<ComponentView key={child.id} node={child} />)
                    })
                  }
                </Component>
                : <Component {...node.props} {...slots} {...other} />
            )
          }
        </ComponentReaction>
      </ComponentField>
    </ComponentSchemaContext.Provider>
  )
})