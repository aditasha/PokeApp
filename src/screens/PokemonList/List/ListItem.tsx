import _ from 'lodash';
import {memo} from 'react';
import {Card, MD3Colors, Icon} from 'react-native-paper';
import {PokemonItem} from '../../../api/types';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const ListItem = memo(
  function ListItem({
    item,
    pokeId,
    index,
    onPress,
    isCompare = false,
  }: {
    item: PokemonItem;
    pokeId: number;
    index?: number;
    onPress: (item: PokemonItem, pokeId: number) => void;
    isCompare?: boolean;
  }) {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            marginBottom: isCompare ? 0 : 10,
            marginTop: index == 0 || index == 1 ? 10 : undefined,
          },
        ]}
        onPress={() => {
          onPress(item, pokeId);
        }}>
        <Card mode="contained">
          <Card.Cover
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`,
            }}
            resizeMode="contain"
            style={styles.cover}
          />
          <Card.Title
            title={item.name}
            titleStyle={{textTransform: 'capitalize'}}
            right={
              isCompare
                ? undefined
                : ({size}) => <Icon source="chevron-right-circle" size={size} />
            }
            rightStyle={{marginEnd: 16}}
          />
        </Card>
      </TouchableOpacity>
    );
  },
  (prev, next) =>
    _.isEqual(prev.item, next.item) &&
    _.isEqual(prev.pokeId, next.pokeId) &&
    _.isEqual(prev.index, next.index) &&
    _.isEqual(prev.onPress, next.onPress) &&
    _.isEqual(prev.isCompare, next.isCompare),
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    flex: 1,
  },
  cover: {
    backgroundColor: 'transparent',
    borderColor: MD3Colors.neutralVariant80,
    borderBottomWidth: 1,
  },
});
