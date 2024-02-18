import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {List} from './List';
import {useTheme} from '@react-navigation/native';
import {Detail} from './Detail';
import {uppercase} from '../../helper';

type StackParamList = {
  List: undefined;
  Detail: {pokeName: string; pokeId: number};
};
export type ListProps = NativeStackScreenProps<StackParamList, 'List'>;
export type DetailProps = NativeStackScreenProps<StackParamList, 'Detail'>;

const Stack = createNativeStackNavigator<StackParamList>();

export function PokemonList() {
  const {colors} = useTheme();
  return (
    <Stack.Navigator screenOptions={{navigationBarColor: colors.card}}>
      <Stack.Screen
        name="List"
        component={List}
        options={{title: 'PokeApp - Aditasha'}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={props => {
          const name = props.route.params?.pokeName;
          return {
            title: uppercase(name),
          };
        }}
      />
    </Stack.Navigator>
  );
}
