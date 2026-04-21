// contants/nodeDefinition.ts

import {
  MdOutlineStorage,
  MdOutlineCloud,
} from "react-icons/md";
import {
  FiHardDrive,
  FiDatabase,
  FiEye,
  FiWifi,
  FiShield,
  FiPackage,
  FiZap,
} from "react-icons/fi";
import { HiOutlineRectangleGroup, HiOutlineCpuChip } from "react-icons/hi2";
import { SiKubernetes, SiLinux } from "react-icons/si";
import {
  TbTopologyRing,
  TbChartLine,
  TbNetwork,
  TbWorldUpload,
  TbRoute,
} from "react-icons/tb";
import { RiSpeedUpLine } from "react-icons/ri";
import type { IconType } from "react-icons";
import { FaWindows } from "react-icons/fa";

/* ─────────────────────────────────────────────
   Type
───────────────────────────────────────────── */
export type NodeDefinition = {
  label: string;
  defaults?: Record<string, unknown>;
  isContainer?: boolean;
  isSku?: boolean;
  skuFor?: string[];
  color?: string;
  defaultSize?: { width: number; height: number };
  icon: IconType; // ← React Icon component
  iconColor?: string; // Tailwind text color
  gradient: string;
  textColor?: string;
  badge?: string;
  category: string;
  style?: Record<string, string | number>;
};

/* ─────────────────────────────────────────────
   Definitions
───────────────────────────────────────────── */
export const nodeDefinitions: Record<string, NodeDefinition> = {
  // ── GROUPS ────────────────────────────────
  azurerm_resource_group: {
    label: "Resource Group",
    defaults: {
      name: "rg-prod-we",
      location: "West Europe",
    },
    isContainer: true,
    color: "#3b82f6",
    defaultSize: { width: 700, height: 450 },
    icon: HiOutlineRectangleGroup,
    iconColor: "text-blue-500",
    gradient: "from-blue-500 to-blue-700",
    textColor: "text-white",
    badge: "Container",
    category: "group",
  },

  // ── NETWORK ───────────────────────────────
  azurerm_virtual_network: {
    label: "VNet",
    defaults: {
      name: "vnet-prod-we",
      address_space: ["10.0.0.0/16"],
      location: "West Europe",
      resource_group_name: "rg-prod-we",
    },
    isContainer: true,
    color: "#10b981",
    defaultSize: { width: 500, height: 300 },
    icon: TbNetwork,
    iconColor: "text-emerald-500",
    gradient: "from-emerald-500 to-emerald-700",
    textColor: "text-white",
    badge: "Container",
    category: "network",
  },

  azurerm_subnet: {
    label: "Subnet",
    defaults: {
      name: "subnet-web",
      address_prefixes: ["10.0.1.0/24"],
      resource_group_name: "rg-prod-we",
      virtual_network_name: "vnet-prod-we",
    },
    isContainer: true,
    color: "#22c55e",
    defaultSize: { width: 400, height: 200 },
    icon: TbTopologyRing,
    iconColor: "text-green-500",
    gradient: "from-green-400 to-green-600",
    textColor: "text-white",
    category: "network",
  },

  azurerm_public_ip: {
    label: "Public IP",
    defaults: {
      name: "pip-vm-001",
      location: "West Europe",
      resource_group_name: "rg-prod-we",
      allocation_method: "Static",
      sku: { name: "Standard", tier: "Standard" },
    },
    color: "#f97316",
    icon: TbWorldUpload,
    iconColor: "text-orange-500",
    gradient: "from-orange-500 to-orange-700",
    textColor: "text-white",
    category: "network",
  },

  azurerm_network_interface: {
    label: "NIC",
    defaults: {
      name: "nic-vm-001",
      location: "West Europe",
      resource_group_name: "rg-prod-we",
      ip_configuration: [
        {
          name: "ipconfig1",
          subnet_id: null,
          private_ip_address_allocation: "Dynamic",
          public_ip_address_id: null,
        },
      ],
    },
    color: "#a855f7",
    icon: FiWifi,
    iconColor: "text-purple-500",
    gradient: "from-purple-500 to-purple-700",
    textColor: "text-white",
    category: "network",
  },

  azurerm_network_security_group: {
    label: "NSG",
    defaults: {
      name: "nsg-web-prod",
      location: "West Europe",
      resource_group_name: "rg-prod-we",
      security_rule: [
        {
          name: "SSH",
          priority: 1001,
          direction: "Inbound",
          access: "Allow",
          protocol: "Tcp",
          source_port_range: "*",
          destination_port_range: "22",
          source_address_prefix: "*",
          destination_address_prefix: "*",
        },
      ],
    },
    icon: FiShield,
    iconColor: "text-yellow-500",
    gradient: "from-yellow-500 to-yellow-700",
    textColor: "text-white",
    category: "security",
    style: {
      background: "linear-gradient(135deg, #eab308, #ca8a04)",
      border: "2px solid rgba(234, 179, 8, 0.5)",
      borderRadius: "10px",
      boxShadow: "0 6px 24px rgba(234, 179, 8, 0.3)",
      padding: "14px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },

  azurerm_route_table: {
    label: "Route Table",
    defaults: {
      name: "rt-web-prod",
      location: "West Europe",
      resource_group_name: "rg-prod-we",
      route: [
        {
          name: "default-internet",
          address_prefix: "0.0.0.0/0",
          next_hop_type: "Internet",
        },
      ],
    },
    icon: TbRoute,
    iconColor: "text-amber-500",
    gradient: "from-amber-500 to-amber-700",
    textColor: "text-white",
    category: "network",
    style: {
      background: "linear-gradient(135deg, #f59e0b, #d97706)",
      border: "1px solid rgba(245, 158, 11, 0.4)",
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(245, 158, 11, 0.2)",
      padding: "12px",
      fontSize: "13px",
      fontWeight: "500",
    },
  },

  // ── COMPUTE ───────────────────────────────
  azurerm_linux_virtual_machine: {
    label: "Linux VM",
    defaults: {
      name: "vm-web-001",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      size: "Standard_B2s",
      admin_username: "azureuser",
      disable_password_authentication: false,
      network_interface_ids: [null],
      os_disk: {
        name: "osdisk-vm-web-001",
        caching: "ReadWrite",
        storage_account_type: "Standard_LRS",
        create_option: "FromImage",
      },
      source_image_reference: {
        publisher: "Canonical",
        offer: "0001-com-ubuntu-server-jammy",
        sku: "22_04-lts-gen2",
        version: "latest",
      },
    },
    color: "#ef4444",
    icon: SiLinux,
    iconColor: "text-red-500",
    gradient: "from-red-500 to-red-700",
    textColor: "text-white",
    category: "compute",
  },

  azurerm_windows_virtual_machine: {
    label: "Windows VM",
    defaults: {
      name: "vm-app-001",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      size: "Standard_B2s",
      admin_username: "azureadmin",
      admin_password: "P@ssw0rd123!",
      network_interface_ids: [null],
      os_disk: {
        caching: "ReadWrite",
        storage_account_type: "Standard_LRS",
        create_option: "FromImage",
      },
      source_image_reference: {
        publisher: "MicrosoftWindowsServer",
        offer: "WindowsServer",
        sku: "2022-Datacenter",
        version: "latest",
      },
    },
    icon: FaWindows,
    iconColor: "text-pink-500",
    gradient: "from-pink-500 to-pink-700",
    textColor: "text-white",
    category: "compute",
    style: {
      background: "linear-gradient(135deg, #ec4899, #db2777)",
      border: "2px solid rgba(236, 72, 153, 0.4)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(236, 72, 153, 0.25)",
      padding: "16px",
      fontSize: "15px",
      fontWeight: "700",
    },
  },

  azurerm_virtual_machine_scale_set: {
    label: "VM Scale Set",
    defaults: {
      name: "vmss-web",
      location: "West Europe",
      resource_group_name: "rg-prod-we",
      sku: { name: "Standard_B2s", capacity: 2 },
      upgrade_policy_mode: "Automatic",
    },
    icon: RiSpeedUpLine,
    iconColor: "text-cyan-500",
    gradient: "from-cyan-500 to-cyan-700",
    textColor: "text-white",
    category: "compute",
    style: {
      background: "linear-gradient(135deg, #06b6d4, #0891b2)",
      border: "2px solid rgba(6, 182, 212, 0.4)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(6, 182, 212, 0.25)",
      padding: "16px",
      fontSize: "15px",
      fontWeight: "700",
    },
  },

  azurerm_kubernetes_cluster: {
    label: "AKS Cluster",
    defaults: {
      name: "aks-prod-we",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      dns_prefix: "aksprodwe",
      default_node_pool: {
        name: "default",
        node_count: 2,
        vm_size: "Standard_B2s",
      },
      identity: { type: "SystemAssigned" },
    },
    icon: SiKubernetes,
    iconColor: "text-sky-500",
    gradient: "from-sky-500 to-sky-700",
    textColor: "text-white",
    category: "compute",
    isContainer: true,
    style: {
      background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
      border: "2px solid rgba(14, 165, 233, 0.4)",
      borderRadius: "14px",
      boxShadow: "0 10px 40px rgba(14, 165, 233, 0.3)",
      padding: "18px",
      fontSize: "16px",
      fontWeight: "700",
    },
  },

  // ── STORAGE ───────────────────────────────
  azurerm_storage_account: {
    label: "Storage Account",
    defaults: {
      name: "storprodwe001",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      account_tier: "Standard",
      account_replication_type: "LRS",
    },
    isContainer: true,
    color: "#6366f1",
    defaultSize: { width: 350, height: 250 },
    icon: MdOutlineStorage,
    iconColor: "text-indigo-500",
    gradient: "from-indigo-500 to-indigo-700",
    textColor: "text-white",
    category: "storage",
  },

  azurerm_storage_container: {
    label: "Storage Container",
    defaults: {
      name: "webapp-blobs",
      storage_account_name: "storprodwe001",
      container_access_type: "private",
    },
    icon: FiPackage,
    iconColor: "text-violet-500",
    gradient: "from-purple-400 to-purple-600",
    textColor: "text-white",
    category: "storage",
    style: {
      background: "linear-gradient(135deg, #a78bfa, #9333ea)",
      border: "1px solid rgba(167, 139, 250, 0.4)",
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(167, 139, 250, 0.15)",
      padding: "12px",
      fontSize: "13px",
      fontWeight: "500",
    },
  },

  // ── DATABASE ──────────────────────────────
  azurerm_mssql_database: {
    label: "SQL Database",
    defaults: {
      name: "db-webapp",
      server_name: "sql-prod-we",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      max_size_gb: 32,
    },
    icon: FiDatabase,
    iconColor: "text-slate-500",
    gradient: "from-slate-500 to-slate-700",
    textColor: "text-white",
    category: "database",
    style: {
      background: "linear-gradient(135deg, #64748b, #475569)",
      border: "1px solid rgba(100, 116, 139, 0.4)",
      borderRadius: "10px",
      boxShadow: "0 6px 24px rgba(100, 116, 139, 0.2)",
      padding: "14px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },

  azurerm_cosmosdb_account: {
    label: "Cosmos DB",
    defaults: {
      name: "cosmos-prod-we",
      location: "West Europe",
      resource_group_name: "rg-prod-we",
      offer_type: "Standard",
      kind: "GlobalDocumentDB",
      enable_free_tier: true,
      consistency_policy: { consistency_level: "Session" },
    },
    icon: MdOutlineCloud,
    iconColor: "text-violet-500",
    gradient: "from-violet-500 to-violet-700",
    textColor: "text-white",
    category: "database",
    style: {
      background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      border: "1px solid rgba(139, 92, 246, 0.4)",
      borderRadius: "10px",
      boxShadow: "0 6px 24px rgba(139, 92, 246, 0.25)",
      padding: "14px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },

  // ── MONITORING ────────────────────────────
  azurerm_log_analytics_workspace: {
    label: "Log Analytics",
    defaults: {
      name: "log-ws-prod",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      sku: "PerGB2018",
      retention_in_days: 30,
    },
    icon: TbChartLine,
    iconColor: "text-lime-600",
    gradient: "from-lime-500 to-lime-700",
    textColor: "text-gray-900",
    category: "monitoring",
    style: {
      background: "linear-gradient(135deg, #84cc16, #65a30d)",
      border: "1px solid rgba(132, 204, 22, 0.4)",
      borderRadius: "10px",
      boxShadow: "0 6px 24px rgba(132, 204, 22, 0.2)",
      padding: "14px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },

  azurerm_application_insights: {
    label: "App Insights",
    defaults: {
      name: "appinsights-prod",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      application_type: "web",
      workspace_id: null,
    },
    icon: FiEye,
    iconColor: "text-teal-500",
    gradient: "from-teal-500 to-teal-700",
    textColor: "text-white",
    category: "monitoring",
    style: {
      background: "linear-gradient(135deg, #14b8a6, #0d9488)",
      border: "1px solid rgba(20, 184, 166, 0.4)",
      borderRadius: "10px",
      boxShadow: "0 6px 24px rgba(20, 184, 166, 0.25)",
      padding: "14px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },

  // ── SKUs ──────────────────────────────────
  sku_vm_b2s: {
    label: "Standard_B2s",
    isSku: true,
    skuFor: [
      "azurerm_linux_virtual_machine",
      "azurerm_windows_virtual_machine",
    ],
    defaults: { size: "Standard_B2s" },
    icon: FiZap,
    iconColor: "text-gray-400",
    gradient: "from-gray-700 to-gray-900",
    category: "compute",
  },

  sku_vm_d2s_v3: {
    label: "Standard_D2s_v3",
    isSku: true,
    skuFor: [
      "azurerm_linux_virtual_machine",
      "azurerm_windows_virtual_machine",
    ],
    defaults: { size: "Standard_D2s_v3" },
    icon: HiOutlineCpuChip,
    iconColor: "text-gray-400",
    gradient: "from-gray-700 to-gray-900",
    category: "compute",
  },

  sku_storage_grs: {
    label: "Standard GRS",
    isSku: true,
    skuFor: ["azurerm_storage_account"],
    defaults: { account_replication_type: "GRS" },
    icon: FiHardDrive,
    iconColor: "text-gray-400",
    gradient: "from-gray-700 to-gray-900",
    category: "storage",
  },
};
