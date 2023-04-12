import { Button, Descriptions, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Container from 'components/layout/container';
import { useViewPokemon } from 'hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getRandomColor } from 'utils';
import Spinner from 'components/spinner';

export function ViewPokemon() {
  const { name } = useParams();
  const { pokemon, loading } = useViewPokemon(name);
  const navigation = useNavigate();

  return (
    <Container className="items-start justify-start">
      <Button
        onClick={() => navigation('/')}
        size="large"
        style={{ width: '100px', display: 'grid', placeItems: 'center' }}
      >
        <ArrowLeftOutlined />
      </Button>

      {loading ? (
        <Spinner />
      ) : (
        <Descriptions title="Pokemon Info" column={1} bordered>
          <Descriptions.Item label="Name">{pokemon?.name}</Descriptions.Item>
          <Descriptions.Item label="Avatar">
            <img src={pokemon?.imageUrl} alt="pokemon" />
          </Descriptions.Item>
          <Descriptions.Item label="Height">
            {pokemon?.height}
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            {pokemon?.types?.map((type) => (
              <Tag key={type?.name} color={getRandomColor()}>
                {type?.name}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Base Experience">
            {pokemon?.base_experience}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Container>
  );
}
