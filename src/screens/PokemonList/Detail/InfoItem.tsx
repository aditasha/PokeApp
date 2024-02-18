import _ from 'lodash';
import {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Text} from 'react-native-paper';

export const InfoItem = memo(
  ({title, value}: {title: string; value?: string}) => {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
        {value ? <Paragraph style={{flex: 3}}>{value}</Paragraph> : null}
      </View>
    );
  },
  (prev, next) =>
    _.isEqual(prev.title, next.title) && _.isEqual(prev.value, next.value),
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  title: {flex: 1, fontWeight: '900'},
});
