import {RefreshControl, ScrollView} from 'react-native';
import {DetailProps} from '..';
import {Card} from 'react-native-paper';
import {useLazyGetPokemonDetailQuery} from '../../../api/pokemon';
import {useEffect, useCallback} from 'react';
import {fetchIdFromUrl} from '../../../helper';
import {PokeImage} from './PokeImage';
import {InfoCard} from './InfoCard';
import {Ability} from './Ability';
import {Chart} from './Chart';

export function Detail({navigation, route}: DetailProps) {
  const [trigger, result, lastPromiseInfo] = useLazyGetPokemonDetailQuery();
  const {data, isError, isLoading, isFetching, isSuccess} = result;
  const imageFront = data?.sprites.front_default;
  const imageDW = data?.sprites.dream_world;

  useEffect(() => {
    trigger({id: route.params.pokeId});
  }, []);

  const onRefresh = useCallback(() => {
    if (isSuccess) {
      trigger({id: route.params.pokeId});
    }
  }, [isSuccess]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      contentContainerStyle={{padding: 8}}>
      <PokeImage imageFront={imageFront} imageDW={imageDW} />

      <InfoCard data={data} />

      {data?.stats ? <Chart name={data?.name} stats={data?.stats} /> : null}

      <Card style={{marginTop: 16}}>
        <Card.Title title="Abilities" />
        <Card.Content>
          {data?.abilities
            ? data?.abilities.map((ability, index) => {
                return (
                  <Ability
                    key={index}
                    id={fetchIdFromUrl('ability/', ability.ability.url)}
                  />
                );
              })
            : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
