import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';

import EventCard from '../components/EventCard';

export default function EventList({ navigation }) {
  const [userName] = useGlobal('userName');
  const [mockData] = useGlobal('mockData');
  const [grid, setGrid] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi {userName}</Text>
        <TouchableOpacity onPress={() => setGrid(!grid)}>
          <Icon
            name={grid ? 'menu-outline' : 'grid-outline'}
            width={36}
            height={36}
            fill="#444"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        key={grid}
        style={styles.flatlist}
        data={mockData}
        renderItem={({ item }) => (
          <EventCard
            key={item.id.toString()}
            id={item.id}
            name={item.name}
            location={item.location}
            paid={item.paid}
            grid={grid}
            onPress={() =>
              navigation.navigate({
                routeName: 'EventDetailsScreen',
                params: item,
              })
            }
          />
        )}
        keyExtractor={(item, index) => `item-${item.id}`}
        numColumns={grid ? 2 : 1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF1F7',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  flatlist: {
    width: '100%',
    height: '90%',
  },
  title: {
    fontSize: 48,
    color: '#444',
    margin: 10,
  },
});
