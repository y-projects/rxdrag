import { ID, NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME } from "../interfaces";
import { ILocalesManager } from "@rxdrag/locales";
import { makeRxId } from "@rxdrag/shared";
import { IResource, IResourceManager, IResourceNode } from "../interfaces/resource";

export class ResourceManager implements IResourceManager {

  private resources: {
    [name: string]: IResourceNode
  } = {}
  constructor(private locales: ILocalesManager) {

  }

  getResource(id: ID): IResourceNode | null {
    //判断id
    for (const key of Object.keys(this.resources)) {
      if (this.resources[key].id === id) {
        return this.resources[key]
      }
    }

    return null
  }

  getResourceByName(name: string): IResourceNode | null {
    return this.resources[name]
  }

  registerResources(...resources: IResource[]): IResourceNode[] {
    const convertedResources: IResourceNode[] = []
    for (const resource of resources) {

      const rxId = makeRxId()
      const node = {
        ...resource,
        id: rxId,
        title: this.locales.getResouceMessage(resource.name || resource.name) || undefined,
        rxProps: {
          [RXID_ATTR_NAME]: rxId,
          [RX_NODE_TYPE_ATTR_NAME]: NodeType.Resource
        },
      }
      this.resources[resource.name] = node
      convertedResources.push(node)
    }
    return convertedResources
  }
  clear(): void {
    this.resources = {}
  }

}