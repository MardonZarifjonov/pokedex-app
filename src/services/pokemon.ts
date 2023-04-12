import {
  GetAllPokemonsParams,
  PokemonEntity,
  PokemonFilteredByType,
  PokemonRawEntity,
  PokemonResult,
} from 'declarations';
import { createGetParams } from 'utils';
import { baseApi } from './api';

export const pokemonTags = { GET_ALL: 'GET_ALL' };

export const pokemonApi = baseApi
  .enhanceEndpoints({ addTagTypes: Object.values(pokemonTags) })
  .injectEndpoints({
    endpoints: (build) => ({
      getAll: build.query<PokemonResult, GetAllPokemonsParams>({
        query: (params) => {
          const url = createGetParams(params);

          return { url: `/pokemon${url}` };
        },
        providesTags: [pokemonTags.GET_ALL],
        transformResponse: (response: PokemonResult | PokemonRawEntity) => {
          if ('id' in response) {
            return {
              count: undefined,
              previous: undefined,
              next: undefined,
              results: [{ name: response.name, url: response?.name }],
            };
          }

          return response as PokemonResult;
        },
      }),
      getTypes: build.query({
        query: () => ({ url: '/type' }),
        transformResponse: (response: PokemonResult) => {
          if (!response) {
            return;
          }

          const types = response?.results?.map((type) => ({
            value: type?.name,
            label: type?.name?.toUpperCase(),
          }));

          return types;
        },
      }),
      getPokemonType: build.query<PokemonResult, string>({
        query: (type) => ({ url: `/type/${type}` }),
        transformResponse: (response: PokemonFilteredByType) => {
          const filteredPokemons = response.pokemon?.map(
            (type) => type?.pokemon
          );

          return { results: filteredPokemons } as PokemonResult;
        },
      }),
      getPokemon: build.query<PokemonEntity | undefined, string | undefined>({
        query: (name) => ({ url: `/pokemon/${name}` }),
        transformResponse: (response: PokemonRawEntity) => {
          if (!response) return;

          return {
            id: response?.id,
            name: response?.name,
            base_experience: response?.base_experience,
            imageUrl: response?.sprites?.front_default,
            height: response?.height,
            types: response?.types?.map((type) => type?.type),
          };
        },
      }),
    }),
  });
