export const nodeDefinitions: Record<
  string,
  {
    label: string;
    defaults: Record<string, any>;
    icon: string;
    gradient: string;
    textColor?: string;
    badge?: string;
    category:
      | "network"
      | "compute"
      | "storage"
      | "database"
      | "group"
      | "security"
      | "monitoring";
    isContainer?: boolean;
    docs?: string;
    color?: string;
    // 🔥 STYLES AJOUTÉS
    style?: {
      background?: string;
      border?: string;
      borderRadius?: string;
      boxShadow?: string;
      padding?: string;
      fontSize?: string;
      fontWeight?: string;
    };
  }
> = {
  // 🔥 GROUPES / CONTAINERS
  azurerm_resource_group: {
    label: "Resource Group",
    defaults: {
      name: "rg-prod-we",
      location: "West Europe",
    },
    isContainer: true,
    icon: "🏠",
    gradient: "from-blue-600 to-blue-800",
    textColor: "text-white",
    badge: "Container",
    category: "group",
    style: {
      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(59, 130, 246, 0.2)",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group",
  },

  // 🔥 RÉSEAUX
  azurerm_virtual_network: {
    label: "VNet",
    defaults: {
      name: "vnet-prod-we",
      address_space: ["10.0.0.0/16"],
      location: "West Europe",
      resource_group_name: "rg-prod-we",
    },
    isContainer: true,
    icon: "🌐",
    gradient: "from-emerald-500 to-emerald-700",
    textColor: "text-white",
    badge: "Container",
    category: "network",
    style: {
      background: "linear-gradient(135deg, #10b981, #047857)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(16, 185, 129, 0.2)",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  azurerm_subnet: {
    label: "Subnet",
    defaults: {
      name: "subnet-web",
      address_prefixes: ["10.0.1.0/24"],
      resource_group_name: "rg-prod-we",
      virtual_network_name: "vnet-prod-we",
    },
    icon: "📶",
    gradient: "from-green-400 to-green-600",
    textColor: "text-white",
    category: "network",
    style: {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      border: "1px solid rgba(34, 197, 94, 0.4)",
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(34, 197, 94, 0.15)",
      padding: "12px",
      fontSize: "13px",
      fontWeight: "500",
    },
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
    icon: "📡",
    gradient: "from-orange-500 to-orange-700",
    textColor: "text-white",
    category: "network",
    style: {
      background: "linear-gradient(135deg, #f97316, #ea580c)",
      border: "1px solid rgba(249, 115, 22, 0.4)",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(249, 115, 22, 0.25)",
      padding: "12px",
      fontSize: "13px",
      fontWeight: "500",
    },
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
          subnet_id: null, // Rempli par lien
          private_ip_address_allocation: "Dynamic",
          public_ip_address_id: null,
        },
      ],
    },
    icon: "🔌",
    gradient: "from-purple-500 to-purple-700",
    textColor: "text-white",
    category: "network",
    style: {
      background: "linear-gradient(135deg, #a855f7, #9333ea)",
      border: "1px solid rgba(168, 85, 247, 0.3)",
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(168, 85, 247, 0.2)",
      padding: "12px",
      fontSize: "13px",
      fontWeight: "500",
    },
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
    icon: "🛡️",
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
    icon: "🛣️",
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

  // 🔥 COMPUTE
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
    icon: "🖥️",
    gradient: "from-red-500 to-red-700",
    textColor: "text-white",
    category: "compute",
    style: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      border: "2px solid rgba(239, 68, 68, 0.4)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(239, 68, 68, 0.25)",
      padding: "16px",
      fontSize: "15px",
      fontWeight: "700",
    },
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
    icon: "💻",
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
      os_profile: {
        computer_name_prefix: "vmss-web",
        admin_username: "azureuser",
        admin_password: "P@ssw0rd123!",
      },
      network_profile: {
        health_probe: [{ name: "health-probe", protocol: "tcp", port: 80 }],
      },
    },
    icon: "📈",
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

  // 🔥 STORAGE
  azurerm_storage_account: {
    label: "Storage Account",
    defaults: {
      name: "storprodwe001",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      account_tier: "Standard",
      account_replication_type: "LRS",
    },
    icon: "💾",
    gradient: "from-indigo-500 to-indigo-700",
    textColor: "text-white",
    category: "storage",
    isContainer: true,
    style: {
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      border: "1px solid rgba(99, 102, 241, 0.3)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(99, 102, 241, 0.2)",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  azurerm_storage_container: {
    label: "Storage Container",
    defaults: {
      name: "webapp-blobs",
      storage_account_name: "storprodwe001",
      container_access_type: "private",
    },
    icon: "📦",
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

  // 🔥 DATABASE
  azurerm_mssql_database: {
    label: "SQL Database",
    defaults: {
      name: "db-webapp",
      server_name: "sql-prod-we",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      max_size_gb: 32,
    },
    icon: "🗄️",
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
      consistency_policy: {
        consistency_level: "Session",
      },
    },
    icon: "☁️",
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

  // 🔥 MONITORING
  azurerm_log_analytics_workspace: {
    label: "Log Analytics",
    defaults: {
      name: "log-ws-prod",
      resource_group_name: "rg-prod-we",
      location: "West Europe",
      sku: "PerGB2018",
      retention_in_days: 30,
    },
    icon: "📊",
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
    icon: "👁️",
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

  // 🔥 AKS
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
    icon: "🐳",
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
};
