import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import barbers from '@/assets/data/barbers';
import { defaultBarberImage } from '@/src/components/BarberListItem';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const BarberDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const barber = barbers.find((p) => p.id.toString() === id);

    if (!barber) {
        return <Text>Barber not found</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: barber?.name || 'Barber Details',
                    headerRight: () => (
                        <Link href={`/(admin)/addBarber?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.6 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />

            <Image
                source={{ uri: barber.image || defaultBarberImage }}
                style={styles.image}
            />

            <Text style={styles.title}>{barber.name}</Text>
            <Text style={styles.info}>{barber.email}</Text>
            <Text style={styles.info}>{barber.phoneNumber}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '80%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    info: {
        fontSize: 16,
    },
});

export default BarberDetailsScreen;