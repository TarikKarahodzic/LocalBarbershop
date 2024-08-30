import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

import barbers from '@/assets/data/barbers';
import BarberListItem from '@/src/components/BarberListItem';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={mainStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <Text style={mainStyles.sectionTitle}>Popular Services</Text>
        <View style={serviceStyles.servicesContainer}>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/beard.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Beard trim</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/bearddye.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Beard coloring</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/dye.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair dye</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/haircut.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Haircut</Text>
          </View>
        </View>
        <Text style={mainStyles.sectionTitle}>Barbers</Text>
        <View>
          {barbers.map((barber) => (
            <BarberListItem key={barber.id} barber={barber} />
          ))}
        </View>
        <Text style={mainStyles.sectionTitle}>Our Products</Text>
        <View style={serviceStyles.servicesContainer}>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/product.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair paste</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/product.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair powder</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/product.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Beard gel</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/product.jpg')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Beard paste</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#121212',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#121212',
  },
  info: {
    fontSize: 14,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const serviceStyles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Ensures that items wrap to the next line if needed
  },
  serviceBox: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 14,
    textAlign: 'center',
  }
});
