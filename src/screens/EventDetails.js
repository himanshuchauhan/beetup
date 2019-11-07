import React from 'react';
import { useGlobal } from 'reactn';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '../utils/AsyncStorage';

const img = require('../../assets/mettalica.jpg');

export default function EventDetails(props) {
  const [userEvents, setUserEvents] = useGlobal('userEvents');
  const [userName] = useGlobal('userName');

  const setFav = async id => {
    if (userEvents.includes(id)) {
      let arr = userEvents.filter(item => item !== id);
      setUserEvents(arr);
      try {
        await AsyncStorage.setItem(userName, arr);
      } catch (e) {
        console.warn(e);
      }
    } else {
      setUserEvents([...userEvents, id]);
      try {
        await AsyncStorage.setItem(userName, [...userEvents, id]);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const event = props.navigation.state.params;
  return (
    <>
      <Image source={img} style={styles.img} />
      <SafeAreaView style={styles.container}>
        <Animatable.View
          animation="fadeInUp"
          useNativeDriver={true}
          style={styles.card}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.location}>{event.location}, Bengaluru</Text>
          <View style={styles.row}>
            <Text
              style={{
                ...styles.fees,
                color: event.paid ? '#FF3D71' : '#0095FF',
              }}>
              {event.paid ? 'Paid' : 'Free'}
            </Text>
            <TouchableOpacity onPress={() => setFav(event.id)}>
              <Icon
                name={userEvents.includes(event.id) ? 'star' : 'star-outline'}
                width={48}
                height={48}
                fill="orange"
              />
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={150}
          useNativeDriver={true}>
          <Text style={styles.subtitle}>About</Text>
          <Text style={styles.lorem}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </Animatable.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF1F7',
    alignItems: 'center',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    height: 300,
    width: '100%',
  },
  title: {
    fontSize: 28,
    color: '#1A2138',
  },
  card: {
    width: '90%',
    height: 300,
    borderRadius: 16,
    marginTop: -80,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-around',
  },
  location: {
    fontSize: 24,
    color: '#1A2138',
  },
  fees: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    color: '#333',
    alignSelf: 'flex-start',
  },
  lorem: {
    fontSize: 16,
    color: '#999',
    alignSelf: 'flex-start',
    margin: 20,
  },
});
