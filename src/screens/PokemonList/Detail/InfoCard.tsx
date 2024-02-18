import {Card} from 'react-native-paper';
import {uppercase} from '../../../helper';
import {InfoItem} from './InfoItem';
import {Pokemon} from '../../../api/types';
import {memo} from 'react';
import _ from 'lodash';

export const InfoCard = memo(
  ({data}: {data: Pokemon | undefined}) => {
    return (
      <Card>
        <Card.Title title="Information" />
        <Card.Content>
          {data?.name ? (
            <InfoItem title="Name" value={uppercase(data.name)} />
          ) : null}
          {data?.height ? (
            <InfoItem
              title="Height"
              value={data.height.toString() + ' decimeter'}
            />
          ) : null}
          {data?.weight ? (
            <InfoItem
              title="Weight"
              value={data.weight.toString() + ' hectogram'}
            />
          ) : null}
          {data?.types ? (
            <InfoItem
              title="Types"
              value={data.types
                .map(data => {
                  return uppercase(data.type.name);
                })
                .join(', ')}
            />
          ) : null}
        </Card.Content>
      </Card>
    );
  },
  (prev, next) => _.isEqual(prev.data, next.data),
);
