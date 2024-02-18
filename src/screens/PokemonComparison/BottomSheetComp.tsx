import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useCallback, useMemo} from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {RefreshControl} from 'react-native';
import {useTheme} from 'react-native-paper';
import {PokemonItem} from '../../api/types';
import {fetchIdFromUrl} from '../../helper';
import {ListItem} from '../PokemonList/List/ListItem';

export function BottomSheetComp({
  sheetRef,
  onPressCard,
  Header,
  Footer,
  onRefresh,
  onEndReached,
  results,
  isLoading,
}: {
  sheetRef: React.RefObject<BottomSheetMethods>;
  onPressCard: (item: PokemonItem, pokeId: number) => void;
  Header: () => React.JSX.Element;
  Footer: () => React.JSX.Element;
  onRefresh: () => void;
  onEndReached: () => void;
  results: Array<PokemonItem> | undefined;
  isLoading: boolean;
}) {
  const {colors} = useTheme();
  const snapPoints = useMemo(() => ['75%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
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
    [onPressCard],
  );
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      index={-1}
      backgroundStyle={{backgroundColor: colors.background}}
      handleStyle={{backgroundColor: colors.surfaceVariant}}
      handleIndicatorStyle={{backgroundColor: colors.onSurfaceVariant}}>
      <Header />
      <BottomSheetFlatList
        numColumns={2}
        columnWrapperStyle={[styles.row, {backgroundColor: colors.background}]}
        data={results}
        renderItem={renderListItem}
        ListFooterComponent={Footer}
        refreshControl={<RefreshControl refreshing={isLoading} />}
        refreshing={isLoading}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
  },
  loading: {marginTop: 16, marginBottom: 32},
});
