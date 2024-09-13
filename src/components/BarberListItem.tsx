import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

export const defaultBarberImage =
  'https://kuysmwqkgvbbdobnncfc.supabase.co/storage/v1/object/sign/default-image/barber-default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0LWltYWdlL2JhcmJlci1kZWZhdWx0LnBuZyIsImlhdCI6MTcyNjE3OTAzNywiZXhwIjoxNzI4NzcxMDM3fQ.RQNO3FPgaWsQw0SfLxuRWw1nnf5iyfNKGdTW5Ozvphc&t=2024-09-12T22%3A10%3A37.414Z';

type BarberListItemProps = {
  barber: Tables<'barbers'>;
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
                <Text style={mainStyles.infoText}>+{barber.phoneNumber}</Text>
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
    marginTop: 5
  },
  textContainer: {
    flex: 1,
  },
  barberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
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