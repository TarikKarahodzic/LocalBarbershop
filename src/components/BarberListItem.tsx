import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Barber } from '../types';
import { Link, useSegments } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

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

export default BarberListItem;

const mainStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#121212',
  },
  info: {
    fontSize: 14,
    color: '#121212',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 20, // Add space between the image and the text
  },
  textContainer: {
    flex: 1, // Take up the remaining space
  },
});

const barberStyles = StyleSheet.create({
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
