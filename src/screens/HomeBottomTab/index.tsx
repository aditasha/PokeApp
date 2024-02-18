import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PokemonList} from '../PokemonList';
import {PokemonComparison} from '../PokemonComparison';

const Tab = createMaterialBottomTabNavigator();

export function HomeBottomTab() {
  return (
    <Tab.Navigator initialRouteName="PokemonList">
      <Tab.Screen
        name="PokemonList"
        component={PokemonList}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PokemonComparison"
        component={PokemonComparison}
        options={{
          tabBarLabel: 'Compare',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="compare-horizontal"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
