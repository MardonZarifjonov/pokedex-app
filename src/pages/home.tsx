import { Button, Input, Pagination, Select, Spin } from 'antd';
import Container from 'components/layout/container';
import Spinner from 'components/spinner';
import { usePokemon } from 'hooks';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const {
    page,
    total,
    types,
    loading,
    pokemons,
    selectedType,
    searchPokemon,
    handleTypeSelect,
    handlePageChange,
    handlePokemonSearch,
  } = usePokemon();
  const navigate = useNavigate();

  return (
    <Container className="items-center">
      <Input
        placeholder="Enter Pokemon name"
        onChange={handlePokemonSearch}
        value={searchPokemon}
        size="large"
        disabled={loading || !!selectedType}
      />

      <Select
        placeholder="Select type"
        options={types}
        style={{ width: 150 }}
        value={selectedType}
        onSelect={handleTypeSelect}
        onClear={() => handleTypeSelect(undefined)}
        className="self-end"
        disabled={loading || searchPokemon !== ''}
        allowClear
      />

      {loading ? (
        <Spinner />
      ) : (
        pokemons?.results?.map(
          (pokemon) =>
            pokemon?.name && (
              <Button
                key={pokemon?.name}
                size="large"
                className="capitalize"
                onClick={() => navigate(`/pokemon/${pokemon?.name}`)}
                style={{ width: '100%', maxWidth: '500px' }}
              >
                {pokemon?.name}
              </Button>
            )
        )
      )}

      {!selectedType && (
        <Pagination
          current={page}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          className="mt-auto mb-4"
        />
      )}
    </Container>
  );
}
