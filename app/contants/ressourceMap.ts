const universalResourceMap: Record<string, string> = {
  // ========================
  // COMPUTE
  // ========================

  // AWS
  aws_instance: "compute",
  aws_lambda_function: "compute",
  aws_ecs_cluster: "compute",
  aws_ecs_service: "compute",
  aws_eks_cluster: "compute",

  // Azure
  azurerm_linux_virtual_machine: "compute",
  azurerm_windows_virtual_machine: "compute",
  azurerm_virtual_machine: "compute",
  azurerm_function_app: "compute",
  azurerm_kubernetes_cluster: "compute",

  // GCP
  google_compute_instance: "compute",
  google_cloudfunctions_function: "compute",
  google_container_cluster: "compute",

  // ========================
  // NETWORK
  // ========================

  // AWS
  aws_vpc: "network",
  aws_subnet: "network",
  aws_internet_gateway: "network",
  aws_nat_gateway: "network",
  aws_lb: "network",
  aws_security_group: "network",

  // Azure
  azurerm_virtual_network: "network",
  azurerm_subnet: "network",
  azurerm_network_interface: "network",
  azurerm_public_ip: "network",
  azurerm_lb: "network",
  azurerm_network_security_group: "network",

  // GCP
  google_compute_network: "network",
  google_compute_subnetwork: "network",
  google_compute_firewall: "network",
  google_compute_forwarding_rule: "network",

  // ========================
  // STORAGE
  // ========================

  // AWS
  aws_s3_bucket: "storage",
  aws_ebs_volume: "storage",
  aws_efs_file_system: "storage",

  // Azure
  azurerm_storage_account: "storage",
  azurerm_storage_container: "storage",
  azurerm_managed_disk: "storage",

  // GCP
  google_storage_bucket: "storage",
  google_compute_disk: "storage",

  // ========================
  // DATABASE
  // ========================

  // AWS
  aws_rds_instance: "database",
  aws_dynamodb_table: "database",
  aws_docdb_cluster: "database",
  aws_elasticache_cluster: "database",

  // Azure
  azurerm_sql_server: "database",
  azurerm_sql_database: "database",
  azurerm_cosmosdb_account: "database",
  azurerm_mysql_server: "database",
  azurerm_postgresql_server: "database",

  // GCP
  google_sql_database_instance: "database",
  google_firestore_database: "database",
  google_bigtable_instance: "database",

  // ========================
  // SECURITY / IDENTITY
  // ========================

  // AWS
  aws_iam_role: "security",
  aws_iam_user: "security",
  aws_key_pair: "security",

  // Azure
  azurerm_key_vault: "security",
  azurerm_key_vault_secret: "security",
  azurerm_role_assignment: "security",

  // GCP
  google_service_account: "security",
  google_kms_key_ring: "security",

  // ========================
  // APPLICATION / MESSAGING
  // ========================

  // AWS
  aws_sqs_queue: "application",
  aws_sns_topic: "application",
  aws_api_gateway_rest_api: "application",

  // Azure
  azurerm_service_bus_namespace: "application",
  azurerm_eventgrid_topic: "application",
  azurerm_logic_app_workflow: "application",

  // GCP
  google_pubsub_topic: "application",
  google_pubsub_subscription: "application",

  // ========================
  // OBSERVABILITY
  // ========================

  // AWS
  aws_cloudwatch_log_group: "observability",

  // Azure
  azurerm_application_insights: "observability",
  azurerm_log_analytics_workspace: "observability",

  // GCP
  google_monitoring_workspace: "observability",
};

export function getCategoryResource(resource: string) {
  return universalResourceMap[resource] || "unknown";
}
