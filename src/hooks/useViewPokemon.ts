import { pokemonApi } from 'services';

export function useViewPokemon(name: string | undefined) {
  const pokemonQuery = pokemonApi.useGetPokemonQuery(name, { skip: !name });

  return { pokemon: pokemonQuery.data, loading: pokemonQuery.isLoading };
}
