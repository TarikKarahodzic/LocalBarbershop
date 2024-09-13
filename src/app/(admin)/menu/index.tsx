import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';

import BarberListItem from '@/src/components/BarberListItem';
import { useBarberList } from '@/src/api/services';

export default function TabOneScreen() {
  const { data: barbers, error, isLoading } = useBarberList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch services</Text>;
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={mainStyles.sectionTitle}>Popular Services</Text>
        <View style={serviceStyles.servicesContainer}>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/beard.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Beard trim</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/hairdye.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair dye</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/haircut.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Haircut</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/hairwash.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair wash</Text>
          </View>
        </View>
        <Text style={mainStyles.sectionTitle}>Barbers</Text>
        <View style={mainStyles.barbersList}>
          {barbers?.length ? (
            barbers.map((barber) => (
              <BarberListItem key={barber.id} barber={barber} />
            ))
          ) : (
            <Text>No barbers available</Text>
          )}
        </View>
        <Text style={mainStyles.sectionTitle}>Our Products</Text>
        <View style={serviceStyles.servicesContainer}>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/hair-gel.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair gel</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/hair-spray.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair spray</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/beard-oil.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Beard oil</Text>
          </View>
          <View style={serviceStyles.serviceBox}>
            <Image source={require('../../img/shampoo.png')} style={serviceStyles.serviceImage} />
            <Text style={serviceStyles.serviceTitle}>Hair shampoo</Text>
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
  barbersList: {
    marginBottom: 10,
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
