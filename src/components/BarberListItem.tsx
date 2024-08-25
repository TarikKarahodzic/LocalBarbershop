import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Barber } from '../types';
import { Link, useSegments } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export const defaultBarberImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type BarberListItemProps = {
  barber: Barber;
}

const BarberListItem = ({ barber }: BarberListItemProps) => {
  const segments = useSegments();
  
  return (
    <Link href={`/${segments[0]}/menu/${barber.id}`} asChild>
      <Pressable style={mainStyles.container}>
        <Image
          source={{ uri: barber.image || defaultBarberImage }}
          style={mainStyles.image}
        />
        <View style={mainStyles.textContainer}>
          <Text style={mainStyles.name}>{barber.name}</Text>
          <View style={barberStyles.additionalInfo}>
            <View style={barberStyles.infoContainer}>
              <Text style={barberStyles.infoText}>{barber.email}</Text>
            </View>
            <View style={barberStyles.infoContainer}>
              <FontAwesome name="star" size={16} color="#FFD700" style={barberStyles.icon} />
              <Text style={mainStyles.info}>4.2</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
// This bit makes a skelet for some part of the screen
// or a whole part. For example ill use this for the barbers section on the app
// Can make another one for top part (services) and bottom part (products)

export default BarberListItem;

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#121212'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#121212'
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

const barberStyles = StyleSheet.create({
  barberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
  },
});