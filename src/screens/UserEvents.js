import React from 'react';
import { useGlobal, useEffect } from 'reactn';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '../utils/AsyncStorage';

// SIDEBAR
export default function UserEvents({ navigation }) {
  const [userEvents, setUserEvents] = useGlobal('userEvents');
  const [userName] = useGlobal('userName');
  const [mockData] = useGlobal('mockData');
  // Get User Events Data from All events data
  useEffect(() => {
    restore();
    // eslint-disable-next-line
  }, []);

  let userData = [];
  userEvents.map(id =>
    mockData.filter(item => item.id === id && userData.push(item)),
  );

  // read from AsyncStorage
  const restore = async () => {
    try {
      let storedEvents = await AsyncStorage.getItem(userName);

      if (storedEvents) {
        setUserEvents(storedEvents);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const onPressEvent = i => {
    navigation.navigate({
      routeName: 'EventDetailsScreen',
      params: i,
    });
    navigation.closeDrawer();
  };

  const reorderList = d => {
    let arr = d.map(item => item.id);
    setUserEvents(arr);
    AsyncStorage.setItem(userName, arr);
  };

  const deleteItem = i => {
    let arr = userEvents.filter(item => item !== i);
    setUserEvents(arr);
    AsyncStorage.setItem(userName, arr);
  };

  const renderItem = ({ item, index, move, moveEnd, isActive }) => (
    <TouchableOpacity
      style={{ backgroundColor: isActive ? 'cyan' : '#fff' }}
      onPress={() => onPressEvent(item)}
      onLongPress={move}
      onPressOut={moveEnd}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Icon name="trash-outline" width={24} height={24} fill="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        scrollPercent={5}
        onMoveEnd={({ data }) => reorderList(data)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF1F7',
    height: '100%',
    padding: 10,
  },
  name: {
    fontSize: 20,
  },
  row: {
    width: '100%',
    height: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
