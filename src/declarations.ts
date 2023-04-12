type PokemonResultEntity = { name: string; url: string };

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type PokemonEntity = DeepPartial<{
  id: number;
  name: string;
  height: number;
  types: { name: string }[];
  base_experience: number;
  imageUrl: string;
}>;

export type PokemonRawEntity = DeepPartial<
  Pick<
    PokemonEntity,
    'id' | 'base_experience' | 'height' | 'imageUrl' | 'name'
  > & {
    types: { slot: number; type: { name: string } }[];
    sprites: { front_default: string };
  }
>;

export type PokemonResult = DeepPartial<{
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResultEntity[];
}>;

export type PokemonFilteredByType = DeepPartial<{
  pokemon: { pokemon: PokemonResultEntity }[];
}>;

export type GetAllPokemonsParams = {
  limit: number;
  offset: number;
  name?: string;
};
