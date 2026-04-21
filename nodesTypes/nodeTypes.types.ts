// app/nodesTypes/nodeTypes.types.ts

export interface BaseNodeData {
  name: string;
  label?: string;
  location?: string;
  position: { x: number; y: number };
}

export interface VmData extends BaseNodeData {
  size: string;
  admin_username: string;
  os?: "linux" | "windows";
  status?: "running" | "stopped" | "deallocated";
}

export interface NicData extends BaseNodeData {
  private_ip?: string;
  enable_accelerated_networking?: boolean;
}

export interface PublicIpData extends BaseNodeData {
  allocation_method: "Static" | "Dynamic";
  ip_address?: string;
  sku?: { name: string };
}

export interface StorageData extends BaseNodeData {
  account_tier: "Standard" | "Premium";
  account_replication_type?: string;
  access_tier?: string;
}

export interface SubnetData extends BaseNodeData {
  address_prefixes: string;
}

export interface VnetData extends BaseNodeData {
  address_space?: string;
}

export interface RgData extends BaseNodeData {
  location: string;
}

export interface NsgData extends BaseNodeData {
  security_rules?: unknown[];
}

export interface SqlServerData extends BaseNodeData {
  administrator_login?: string;
  version?: string;
}

export interface SqlDatabaseData extends BaseNodeData {
  sku_name?: string;
  max_size_gb?: number;
  collation?: string;
}

export interface CosmosDbData extends BaseNodeData {
  offer_type?: string;
  kind?: string;
  consistency_level?: string;
}

export interface StorageContainerData extends BaseNodeData {
  container_access_type?: string;
  storage_account_name?: string;
}

export interface AksClusterData extends BaseNodeData {
  kubernetes_version?: string;
  node_count?: number;
  vm_size?: string;
  dns_prefix?: string;
}

export interface VmScaleSetData extends BaseNodeData {
  sku?: string;
  capacity?: number;
  admin_username?: string;
}

export interface LogAnalyticsData extends BaseNodeData {
  sku?: string;
  retention_in_days?: number;
}

export interface AppInsightsData extends BaseNodeData {
  application_type?: string;
  workspace_id?: string;
}

export interface RouteTableData extends BaseNodeData {
  routes?: unknown[];
}
