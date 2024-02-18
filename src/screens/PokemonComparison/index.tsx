import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import {Comparison} from './Comparison';

type StackParamList = {
  Comparison: undefined;
};
export type ComparisonProps = NativeStackScreenProps<
  StackParamList,
  'Comparison'
>;

const Stack = createNativeStackNavigator<StackParamList>();

export function PokemonComparison() {
  const {colors} = useTheme();
  return (
    <Stack.Navigator screenOptions={{navigationBarColor: colors.card}}>
      <Stack.Screen name="Comparison" component={Comparison} />
    </Stack.Navigator>
  );
}
