import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const img = require('../../assets/mettalica.jpg');

export default function EventCard({
  name,
  location,
  paid,
  imgSrc,
  onPress,
  id,
  grid,
}) {
  const dims = useWindowDimensions();

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={id * 100}
      useNativeDriver={true}>
      <View
        style={{
          ...styles.container,
          width: grid ? dims.width / 2 - 20 : dims.width - 20,
        }}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <ImageBackground
              source={img}
              resizeMode="cover"
              imageStyle={styles.border}
              style={styles.img}>
              <View style={styles.overlay}>
                <Text style={{ ...styles.title, fontSize: grid ? 24 : 36 }}>
                  {name}
                </Text>
              </View>
            </ImageBackground>
            <View
              style={
                grid ? styles.gridBottomContainer : styles.bottomContainer
              }>
              <Text style={{ ...styles.location, fontSize: grid ? 18 : 24 }}>
                {location}
              </Text>
              <Text
                style={{ ...styles.fees, color: paid ? '#FF3D71' : '#0095FF' }}>
                {paid ? 'Paid' : 'Free'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  gridBottomContainer: {
    height: 70,
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    margin: 16,
  },
  img: {
    // width: '100%',
    height: 200,
  },
  border: { borderRadius: 16 },
  overlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    borderRadius: 16,
  },
  location: {
    fontSize: 24,
    color: '#1A2138',
  },
  fees: {
    fontSize: 20,
  },
});
