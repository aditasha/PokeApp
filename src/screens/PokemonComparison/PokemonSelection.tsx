import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Title, Icon} from 'react-native-paper';
import {ListItem} from '../PokemonList/List/ListItem';
import {PokemonItem, Stat} from '../../api/types';
import {useLazyGetPokemonDetailQuery} from '../../api/pokemon';
import {useEffect} from 'react';

export function PokemonSelection({
  title,
  pokemon,
  onPressList,
  onPressCard,
  setStat,
}: {
  title: string;
  pokemon:
    | {
        item: PokemonItem;
        pokeId: number;
      }
    | undefined;
  onPressList: (item: PokemonItem, pokeId: number) => void;
  onPressCard: () => void;
  setStat: React.Dispatch<React.SetStateAction<Stat[] | undefined>>;
}) {
  const [trigger, result, lastPromiseInfo] = useLazyGetPokemonDetailQuery();
  const {data, isError, isLoading, isFetching, isSuccess} = result;

  useEffect(() => {
    if (pokemon) trigger({id: pokemon?.pokeId});
  }, [pokemon]);

  useEffect(() => {
    if (data?.stats) setStat(data?.stats);
  }, [data?.stats]);

  return (
    <>
      {pokemon ? (
        <ListItem
          item={pokemon.item}
          pokeId={pokemon.pokeId}
          onPress={onPressList}
          isCompare
        />
      ) : (
        <TouchableOpacity style={styles.root} onPress={onPressCard}>
          <Card>
            <Card.Content>
              <View style={styles.selection}>
                <Title>{title}</Title>
                <Icon source="chevron-right" size={16} />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, marginEnd: 8},
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
