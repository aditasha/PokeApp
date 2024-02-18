import {useRef, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Subheading} from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLazyGetPokemonListQuery} from '../../api/pokemon';
import {PokemonItem, Stat} from '../../api/types';
import {ComparisonProps} from '.';
import {BottomSheetComp} from './BottomSheetComp';
import {PokemonSelection} from './PokemonSelection';
import {Chart} from './Chart';

export function Comparison({navigation}: ComparisonProps) {
  const [trigger, result, lastPromiseInfo] = useLazyGetPokemonListQuery();
  const {data, isError, isLoading, isFetching, isSuccess} = result;

  const [firstPokemon, setFirstPokemon] = useState<{
    item: PokemonItem;
    pokeId: number;
  }>();
  const [secondPokemon, setSecondPokemon] = useState<{
    item: PokemonItem;
    pokeId: number;
  }>();
  const [selectFirst, setSelectFirst] = useState<boolean>();

  const [firstStat, setFirstStat] = useState<Array<Stat>>();
  const [secondStat, setSecondStat] = useState<Array<Stat>>();

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
    if (selectFirst != undefined) {
      if (selectFirst == true) setFirstPokemon({item, pokeId});
      else setSecondPokemon({item, pokeId});
      handleClosePress();
    }
  };

  const sheetRef = useRef<BottomSheet>(null);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, [sheetRef.current]);

  const Header = useCallback(() => {
    return (
      <View style={styles.header}>
        <Subheading>Choose Pokemon</Subheading>
        <Button onPress={handleClosePress}>Close</Button>
      </View>
    );
  }, [handleClosePress]);

  const Footer = useCallback(() => {
    if (isFetching && !isLoading)
      return <ActivityIndicator style={styles.loading} size="large" />;
    return <View style={{height: 100}} />;
  }, [isFetching, isLoading]);

  return (
    <>
      <ScrollView style={{padding: 8}}>
        <View style={styles.selection}>
          <PokemonSelection
            title="Select First Pokemon"
            pokemon={firstPokemon}
            onPressList={data => {
              sheetRef.current?.expand();
              setSelectFirst(true);
            }}
            onPressCard={() => {
              sheetRef.current?.expand();
              setSelectFirst(true);
            }}
            setStat={setFirstStat}
          />

          <PokemonSelection
            title="Select Second Pokemon"
            pokemon={secondPokemon}
            onPressList={data => {
              sheetRef.current?.expand();
              setSelectFirst(false);
            }}
            onPressCard={() => {
              sheetRef.current?.expand();
              setSelectFirst(false);
            }}
            setStat={setSecondStat}
          />
        </View>

        {firstPokemon && secondPokemon ? (
          <Button
            mode="contained-tonal"
            style={{alignSelf: 'center'}}
            onPress={() => {
              setFirstPokemon(undefined);
              setSecondPokemon(undefined);
              setFirstStat(undefined);
              setSecondStat(undefined);
            }}>
            Clear selection
          </Button>
        ) : null}

        {firstStat && secondStat ? (
          <Chart
            firstPokemon={firstPokemon}
            secondPokemon={secondPokemon}
            firstStat={firstStat}
            secondStat={secondStat}
          />
        ) : null}

        <View style={{height: 100}} />
      </ScrollView>

      <BottomSheetComp
        sheetRef={sheetRef}
        onPressCard={onPressCard}
        Header={Header}
        Footer={Footer}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        results={data?.results}
        isLoading={isLoading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
  },
  loading: {marginTop: 16, marginBottom: 32},
  header: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
});
