import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  nominations: {
    from: {
      source: "url",
      url: "https://cube-academy-api.cubeapis.com/api/docs/openapi.json",
    },
    outputDir: "./src/api",
    to: async (context) => {
      const filenamePrefix = "nominations";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
