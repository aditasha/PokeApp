import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {AbilityDetail, Pagination, Pokemon, PokemonItem} from './types';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';

const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    any,
    unknown
  > =>
  async ({url, method, data, params, headers}) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const pokeApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: axiosBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
  endpoints: builder => ({
    getPokemonList: builder.query<Pagination<PokemonItem>, {limit: number}>({
      query: ({limit}) => ({
        url: 'pokemon',
        method: 'GET',
        params: {limit: limit},
      }),
    }),
    getPokemonDetail: builder.query<Pokemon, {id: number}>({
      query: ({id}) => ({
        url: `pokemon/${id}`,
        method: 'GET',
      }),
      transformResponse: val => {
        return {
          sprites: {
            front_default: val.sprites.front_default,
            dream_world: val.sprites.other.dream_world.front_default,
          },
          name: val.name,
          height: val.height,
          weight: val.weight,
          types: val.types,
          stats: val.stats,
          abilities: val.abilities,
        };
      },
    }),
    getAbility: builder.query<AbilityDetail, {id: string}>({
      query: ({id}) => ({
        url: 'ability/' + id,
        method: 'GET',
      }),
      transformResponse: val => {
        return {
          name: val.name,
          effect_entries: val.effect_entries,
        };
      },
    }),
  }),
});

export const {
  useLazyGetPokemonListQuery,
  useLazyGetPokemonDetailQuery,
  useLazyGetAbilityQuery,
} = pokeApi;
