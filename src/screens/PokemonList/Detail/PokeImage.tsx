import _ from 'lodash';
import {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';

export const PokeImage = memo(
  ({
    imageFront,
    imageDW,
  }: {
    imageFront: string | null | undefined;
    imageDW: string | null | undefined;
  }) => {
    return (
      <View style={styles.root}>
        {imageFront ? (
          <Card style={styles.card}>
            <Card.Cover
              source={{uri: imageFront}}
              style={{
                backgroundColor: 'transparent',
              }}
            />
            <Card.Title title="Original version" />
          </Card>
        ) : null}
        {imageDW ? (
          <Card style={styles.card}>
            <View style={styles.svgContainer}>
              <SvgUri height={'70%'} width={'70%'} uri={imageDW} />
            </View>
            <Card.Title title="Dream World version" />
          </Card>
        ) : null}
      </View>
    );
  },
  (prev, next) =>
    _.isEqual(prev.imageFront, next.imageFront) &&
    _.isEqual(prev.imageDW, next.imageDW),
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  card: {flex: 1, marginEnd: 8},
  svgContainer: {
    height: 194,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
