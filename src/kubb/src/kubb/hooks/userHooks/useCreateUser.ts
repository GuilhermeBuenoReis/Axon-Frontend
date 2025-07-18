/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type { CreateUserMutationRequest, CreateUserMutationResponse } from '../../../../types/CreateUser.ts'
import { useMutation } from '@tanstack/react-query'

export const createUserMutationKey = () => [{ url: '/api/user/create' }] as const

export type CreateUserMutationKey = ReturnType<typeof createUserMutationKey>

/**
 * @description Create new user
 * {@link /api/user/create}
 */
export async function createUser(data: CreateUserMutationRequest, config: Partial<RequestConfig<CreateUserMutationRequest>> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateUserMutationResponse, ResponseErrorConfig<Error>, CreateUserMutationRequest>({
    method: 'POST',
    url: `/api/user/create`,
    baseURL: 'http://localhost:3333',
    data,
    ...requestConfig,
  })
  return res
}

/**
 * @description Create new user
 * {@link /api/user/create}
 */
export function useCreateUser<TContext>(
  options: {
    mutation?: UseMutationOptions<ResponseConfig<CreateUserMutationResponse>, ResponseErrorConfig<Error>, { data: CreateUserMutationRequest }, TContext> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig<CreateUserMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation = {}, client: config = {} } = options ?? {}
  const { client: queryClient, ...mutationOptions } = mutation
  const mutationKey = mutationOptions.mutationKey ?? createUserMutationKey()

  return useMutation<ResponseConfig<CreateUserMutationResponse>, ResponseErrorConfig<Error>, { data: CreateUserMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return createUser(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}