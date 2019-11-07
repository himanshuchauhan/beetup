import React from 'react';
import { useGlobal } from 'reactn';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
// import AsyncStorage from '../utils/AsyncStorage';

const img = require('../../assets/background.jpg');

export default function Login({ navigation }) {
  const [userName, setUserName] = useGlobal('userName');

  const onSignInPress = async () => {
    try {
      navigation.replace('App');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ImageBackground source={img} resizeMode="cover" style={styles.bgImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hello </Text>
        <TextInput
          style={styles.input}
          placeholder="NAME PLEASE"
          onChangeText={text => setUserName(text)}
          value={userName}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: !userName ? '#bbb' : 'cyan',
          }}
          disabled={!userName}
          onPress={onSignInPress}>
          <Text style={styles.buttonTitle}>Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 72,
  },
  input: {
    width: '90%',
    fontSize: 20,
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'cyan',
    width: '90%',
    padding: 16,
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 20,
  },
});
