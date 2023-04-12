import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pokemonApi } from 'services';
import { InputProps } from 'antd';
import { useDebounceValue } from './useDebounceValue';

export function usePokemon() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(
    parseInt(searchParams.get('limit') || '10', 10)
  );
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const [selectedType, setSelectedType] = useState<undefined | string>(
    searchParams.get('type') || undefined
  );

  const [searchPokemon, setSearchPokemon] = useState(
    searchParams.get('name') || ''
  );
  const debouncedPokemon = useDebounceValue(searchPokemon);

  const [getPokemons, pokemonQuery] = pokemonApi.useLazyGetAllQuery();
  const pokemonTypesQuery = pokemonApi.useGetTypesQuery(undefined);
  const [getPokemonType, getPokemonTypeQuery] =
    pokemonApi.useLazyGetPokemonTypeQuery();
  const pokemonCount = pokemonQuery?.data?.count || 1;
  const handlePageChange = (newPage: number, pageSize: number) => {
    setPage(newPage);
    setLimit(pageSize);
  };

  const handlePokemonSearch: InputProps['onChange'] = (event) => {
    setSearchPokemon(event.target.value);
  };

  const handleSearchParams = () => {
    if (debouncedPokemon || debouncedPokemon !== '') {
      setSearchParams({ name: debouncedPokemon });

      return;
    }

    if (selectedType) {
      setSearchParams({ type: selectedType });

      return;
    }
    setSearchParams({ limit: `${limit}`, page: `${page}` });
  };

  const handleTypeSelect = (newType: string | undefined) => {
    setSelectedType(newType);
  };

  useEffect(() => {
    if (!selectedType) {
      const newOffset = (page * limit) % pokemonCount;
      getPokemons({ limit, offset: newOffset, name: debouncedPokemon });
    }
    handleSearchParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, debouncedPokemon, selectedType]);

  useEffect(() => {
    if (selectedType) {
      getPokemonType(selectedType);
    }
  }, [selectedType]);

  return {
    page,
    handlePageChange,
    handlePokemonSearch,
    searchPokemon,
    total: pokemonCount,
    types: pokemonTypesQuery?.data,
    handleTypeSelect,
    selectedType,
    pokemonByTypes: getPokemonTypeQuery?.data,
    loading: pokemonQuery?.isLoading || pokemonQuery?.isFetching,
    pokemons: selectedType ? getPokemonTypeQuery?.data : pokemonQuery?.data,
    error: getPokemonTypeQuery?.error || pokemonQuery?.error,
  };
}
