import AsyncStorage from '@react-native-community/async-storage';

export default {
  setItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    return AsyncStorage.getItem(key).then(data =>
      data ? JSON.parse(data) : undefined,
    );
  },
  removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
};
