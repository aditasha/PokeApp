import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useLazyGetPokemonListQuery} from '../../../api/pokemon';
import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {PokemonItem} from '../../../api/types';
import _ from 'lodash';
import {ListItem} from './ListItem';
import {ListProps} from '..';
import {fetchIdFromUrl} from '../../../helper';

export function List({navigation}: ListProps) {
  const [trigger, result, lastPromiseInfo] = useLazyGetPokemonListQuery();
  const {data, isError, isLoading, isFetching, isSuccess} = result;

  useEffect(() => {
    trigger({limit: 25});
  }, []);

  const onRefresh = useCallback(() => {
    if (isSuccess) {
      trigger({limit: 25});
    }
  }, [isSuccess]);

  const onEndReached = useCallback(() => {
    if (isSuccess && result.data.next) {
      trigger({limit: lastPromiseInfo.lastArg.limit + 25});
    }
  }, [isSuccess, result.data?.next]);

  const onPressCard = (item: PokemonItem, pokeId: number) => {
    navigation.navigate('Detail', {pokeId: pokeId, pokeName: item.name});
  };

  const renderListItem = useCallback(
    ({item, index}: ListRenderItemInfo<PokemonItem>) => {
      const pokeId = fetchIdFromUrl('pokemon/', item.url);
      return (
        <ListItem
          item={item}
          pokeId={parseInt(pokeId)}
          index={index}
          onPress={onPressCard}
        />
      );
    },
    [],
  );

  const Footer = useCallback(() => {
    if (isFetching && !isLoading)
      return <ActivityIndicator style={styles.loading} size="large" />;
    return <View style={{height: 100}} />;
  }, [isFetching, isLoading]);

  return (
    <FlatList
      numColumns={2}
      columnWrapperStyle={styles.row}
      data={data?.results}
      renderItem={renderListItem}
      ListFooterComponent={Footer}
      refreshControl={<RefreshControl refreshing={isLoading} />}
      refreshing={isLoading}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
  },
  loading: {marginTop: 16, marginBottom: 32},
});
