import { Sider } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { siderLocales } from "./locales";
import { siderSchema } from "./schema";

export const SiderMaterial: IComponentMaterial = {
  componentName: "Layout.Sider",
  component: Sider,
  designer: Sider,
  designerLocales: siderLocales,
  propsSchema: siderSchema,
  behaviorRule: {
    draggable:false,
    droppable: true,
    deletable: false,
    cloneable: false,
    noPlaceholder: true,
  },
  resource: {
    name: "Layout.Sider",
    elements: [
      {
        componentName: "Layout.Sider",
        props: {
        }
      }
    ]
  },
}
