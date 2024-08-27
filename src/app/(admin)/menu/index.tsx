import React, { useEffect } from 'react';
import { Text, FlatList, ScrollView, StyleSheet, Dimensions, View, Pressable, LayoutAnimation } from 'react-native';
import barbers from '@/assets/data/barbers';
import services from '@/assets/data/services';
import BarberListItem from '@/src/components/BarberListItem';
import ServiceListItem from '@/src/components/ServiceListItem';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const { width } = Dimensions.get('window'); // Get the width of the screen

export default function TabOneScreen() {
  const serviceItemWidth = width / 4; // Width of each item to fit 4 items on the screen

  return (
    <ScrollView style={styles.container}>
      {/* Popular Services Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <Link href="/">
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.6 : 2 }} />
            )}
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View key={item.id} style={[styles.serviceItem, { width: serviceItemWidth }]}>
            <ServiceListItem service={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesList}
      />

      {/* Popular Barbers Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Barbers</Text>
        <Link href="/">
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.6 : 2 }} />
            )}
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={barbers}
        renderItem={({ item }) => <BarberListItem barber={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.barbersList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  servicesList: {
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  barbersList: {
    marginBottom: 20,
  },
  serviceItem: {
    marginHorizontal: -1, // space between service elements
  },
});
