// Déclaration pour hcl-to-json
declare module 'hcl-to-json' {
  export interface TerraformResource {
    type: string;
    name: string;
    [key: string]: any;
  }

  export interface TerraformConfig {
    resource?: Record<string, Record<string, TerraformResource>>;
    variable?: Record<string, any>;
    output?: Record<string, any>;
    [key: string]: any;
  }

  function hclToJson(input: string): TerraformConfig;
  export = hclToJson;
}
