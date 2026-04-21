// constants/config.ts
import AksClusterNodeType from "../nodesTypes/aksCluster.nodeType";

import AppInsightsNodeType from "../nodesTypes/appInsights.nodeType";
import CosmosDbNodeType from "../nodesTypes/cosmosDb.nodeType";
import LogAnalyticsNodeType from "../nodesTypes/logAnalytics.nodeType";
import NicNodeType from "../nodesTypes/nic.nodeType";
import NsgNodeType from "../nodesTypes/nsg.nodeType";
import PublicIpNodeType from "../nodesTypes/publicIp.nodeType";
import RgNodeType from "../nodesTypes/rg.nodeType";
import RouteTableNodeType from "../nodesTypes/routeTable.nodeType";
import SqlDatabaseNodeType from "../nodesTypes/sqlDatabase.nodeType";
import SqlServerNodeType from "../nodesTypes/sqlServer.nodeType";
import StorageNodeType from "../nodesTypes/storage.nodeType";
import StorageContainerNodeType from "../nodesTypes/storageContainer.nodeType";
import SubnetNodeType from "../nodesTypes/subnet.nodeType";
import VmNodeType from "../nodesTypes/vm.nodeType";
import VmScaleSetNodeType from "../nodesTypes/vmScaleSet.nodeType";
import VnetNodeType from "../nodesTypes/Vnet.nodeType";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // Containers
    azurerm_resource_group: RgNodeType,
    azurerm_virtual_network: VnetNodeType,
    azurerm_subnet: SubnetNodeType,
    azurerm_kubernetes_cluster: AksClusterNodeType,

    // Compute
    azurerm_linux_virtual_machine: VmNodeType,
    azurerm_windows_virtual_machine: VmNodeType,
    azurerm_linux_virtual_machine_scale_set: VmScaleSetNodeType,
    azurerm_windows_virtual_machine_scale_set: VmScaleSetNodeType,

    // Networking
    azurerm_network_interface: NicNodeType,
    azurerm_public_ip: PublicIpNodeType,
    azurerm_network_security_group: NsgNodeType,
    azurerm_route_table: RouteTableNodeType,

    // Storage
    azurerm_storage_account: StorageNodeType,
    azurerm_storage_container: StorageContainerNodeType,

    // Databases
    azurerm_sql_server: SqlServerNodeType,
    azurerm_sql_database: SqlDatabaseNodeType,
    azurerm_cosmosdb_account: CosmosDbNodeType,

    // Monitoring
    azurerm_log_analytics_workspace: LogAnalyticsNodeType,
    azurerm_application_insights: AppInsightsNodeType,
  } as Record<string, any>,
};
