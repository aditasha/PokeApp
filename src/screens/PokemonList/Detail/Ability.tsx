import {useEffect} from 'react';
import {useLazyGetAbilityQuery} from '../../../api/pokemon';
import {InfoItem} from './InfoItem';
import {uppercase} from '../../../helper';
import {ActivityIndicator} from 'react-native-paper';

export const Ability = ({id}: {id: string}) => {
  const [trigger, result, lastPromiseInfo] = useLazyGetAbilityQuery();
  const {data, isError, isLoading, isFetching, isSuccess} = result;

  useEffect(() => {
    trigger({id: id});
  }, []);

  const engShortDesc = data?.effect_entries.find(
    ability => ability.language.name == 'en',
  );

  return (
    <>
      {isFetching ? <ActivityIndicator style={{marginBottom: 16}} /> : null}
      {data?.name && engShortDesc ? (
        <InfoItem
          title={uppercase(data.name)}
          value={engShortDesc.short_effect}
        />
      ) : null}
    </>
  );
};
