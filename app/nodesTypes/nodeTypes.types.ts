// app/nodesTypes/nodeTypes.types.ts

export interface BaseNodeData {
  name: string;
  label?: string;
}

export interface VmData extends BaseNodeData {
  size: string;
  admin_username: string;
  os?: "linux" | "windows";
  status?: "running" | "stopped" | "deallocated";
}

export interface NicData extends BaseNodeData {
  private_ip?: string;
}

export interface PublicIpData extends BaseNodeData {
  allocation_method: "Static" | "Dynamic";
  ip_address?: string;
}

export interface StorageData extends BaseNodeData {
  account_tier: "Standard" | "Premium";
  replication_type?: string;
}

export interface SubnetData extends BaseNodeData {
  address_prefixes: string;
}

export interface VnetData extends BaseNodeData {
  location: string;
  address_space?: string;
}

export interface RgData extends BaseNodeData {
  location: string;
}
