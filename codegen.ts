import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema: import.meta.env.VITE_GITHUB_GQL_ENDPOINT, // this should be the URL to your GraphQL schema',
  schema: "src/shared/api/graphql/github-schema.docs.graphql", // this should be the URL to your GraphQL schema',
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/shared/api/graphql/__codegen__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;