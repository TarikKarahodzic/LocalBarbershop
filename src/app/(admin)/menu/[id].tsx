import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultBarberImage } from '@/src/components/BarberListItem';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useBarber } from '@/src/api/services';

const BarberDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    const { data: barber, error, isLoading } = useBarber(id);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch barbers</Text>;
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

            <Text style={styles.title}>{barber.fullName}</Text>
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