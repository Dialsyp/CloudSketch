// constants/config.ts
import NicNodeType from "../nodesTypes/nic.nodeType";
import PublicIpNodeType from "../nodesTypes/publicIp.nodeType";
import RgNodeType from "../nodesTypes/rg.nodeType";
import StorageNodeType from "../nodesTypes/storage.nodeType";
import SubnetNodeType from "../nodesTypes/subnet.nodeType";
import VmNodeType from "../nodesTypes/vm.nodeType";
import VnetNodeType from "../nodesTypes/Vnet.nodeType";
import { nodeDefinitions } from "./nodeDefinition";

export const config = {
  initialNodes: [
    // {
    //   id: "rg",
    //   type: "azurerm_resource_group",
    //   data: nodeDefinitions.azurerm_resource_group.defaults,
    //   position: { x: 100, y: 100 },
    //   style: {
    //     width: 1000,
    //     height: 600,
    //     background: "rgba(59, 130, 246, 0.1)",
    //     border: "3px dashed rgba(59, 130, 246, 0.5)",
    //   },
    // },
    // {
    //   id: "vnet",
    //   type: "azurerm_virtual_network",
    //   data: nodeDefinitions.azurerm_virtual_network.defaults,
    //   position: { x: 200, y: 200},
    //   parentId: "rg",
    //   extent: "parent",
    //   style: {
    //     width: 280,
    //     height: 180,
    //     background: "rgba(34, 197, 94, 0.15)",
    //     border: "2px solid rgba(34, 197, 94, 0.5)",
    //   },
    // },
  ],

  nodeTypes: {
    azurerm_resource_group: RgNodeType,
    azurerm_virtual_network: VnetNodeType,
    azurerm_subnet: SubnetNodeType,
    azurerm_public_ip: PublicIpNodeType,
    azurerm_network_interface: NicNodeType,
    azurerm_storage_account: StorageNodeType,
    azurerm_linux_virtual_machine: VmNodeType,
  } as Record<string, any>,
};
