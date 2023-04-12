import { GetAllPokemonsParams } from 'declarations';

export function createGetParams({ limit, offset, name }: GetAllPokemonsParams) {
  if (name || name !== '') {
    return `/${name}`;
  }

  return `?limit=${limit}&offset=${offset}`;
}
