import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Barber } from '../types';
import { Link, useSegments } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

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
        <View style={mainStyles.barberContainer}>
          <View style={mainStyles.imageContainer}>
            <Image
              source={{ uri: barber.image || defaultBarberImage }}
              style={mainStyles.image}
              resizeMode='cover'
            />
          </View>
          <View style={mainStyles.textContainer}>
            <Text style={mainStyles.name}>{barber.name}</Text>
            <View style={mainStyles.additionalInfo}>
              <View style={mainStyles.infoContainer}>
                <Entypo name="phone" size={16} color="#888" style={mainStyles.icon} />
                <Text style={mainStyles.infoText}>{barber.phoneNumber}</Text>
              </View>
            </View>
            <View style={mainStyles.infoContainer}>
              <Entypo name="email" size={16} color="#888" style={mainStyles.icon} />
              <Text style={mainStyles.infoText}>{barber.email}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
  info: {
    fontSize: 14,
    color: '#121212',
  },
  imageContainer: {
    width: '20%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  barberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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