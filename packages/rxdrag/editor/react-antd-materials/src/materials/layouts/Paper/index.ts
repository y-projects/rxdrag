import { Paper } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { paperIcon } from "./icon";
import { paperLocales, paperResourceLocales } from "./locales";
import { paperSchema } from "./schema";

const name = "Paper"
export const PaperMaterial: IComponentMaterial = {
  componentName: name,
  component: Paper,
  designer: Paper,
  designerLocales: paperLocales,
  propsSchema: paperSchema,
  resource: {
    name: name,
    icon: paperIcon,
    color: "#dfa324",
    resourceLocales: paperResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  }
}
