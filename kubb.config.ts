import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginZod } from '@kubb/plugin-zod';
import { pluginReactQuery } from '@kubb/plugin-react-query';
import { env } from './src/env';

export default defineConfig({
  input: {
    path: '../axon-backend/swagger.json',
  },
  output: {
    path: './src/kubb',
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginZod(),

    pluginReactQuery({
      output: {
        path: './src/kubb/hooks',
      },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
      client: {
        dataReturnType: 'full',
        baseURL: 'http://localhost:3333',
      },

      query: {
        methods: ['get'],
        importPath: '@tanstack/react-query',
      },
      mutation: {
        methods: ['post', 'put', 'delete'],
      },
      infinite: {
        queryParam: 'next_page',
        initialPageParam: 0,
        cursorParam: 'nextCursor',
      },
      suspense: {},
      parser: 'client',
    }),
  ],
});
