import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useService } from '@/src/api/services';
import { defaultServiceImage } from '@/src/components/ServiceListItem';

const ServiceDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    
    const { data: service, error, isLoading } = useService(id);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch services</Text>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: service?.name || 'Service Details',
                    headerRight: () => (
                        <Link href={`/(admin)/createService?id=${id}`} asChild>
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
                source={{ uri: service?.image || defaultServiceImage }}
                style={styles.image}
            />

            <Text style={styles.title}>{service?.name}</Text>
            <Text style={styles.info}>{service?.price}</Text>
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

export default ServiceDetailsScreen;