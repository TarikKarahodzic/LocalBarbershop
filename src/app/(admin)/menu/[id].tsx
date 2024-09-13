import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultBarberImage } from '@/src/components/BarberListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useBarber } from '@/src/api/services';
import RemoteImage from '@/src/components/RemoteImage';

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
                                        color={'#003972'}
                                        style={{ marginRight: 15, opacity: pressed ? 0.6 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />

            <RemoteImage
                path={barber?.image}
                fallback={defaultBarberImage}
                style={[styles.image, { borderRadius: 10 }]}
            />


            <View style={styles.content}>
                <Text style={styles.title}>{barber?.name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>{barber?.email}</Text>
                </View>
                <Text style={styles.info}>{barber?.phoneNumber}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    content: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default BarberDetailsScreen;