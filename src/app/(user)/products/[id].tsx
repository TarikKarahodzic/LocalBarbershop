import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useProduct } from '@/src/api/services';
import { defaultProductImage } from '@/src/components/ProductListItem';
import RemoteImage from '@/src/components/RemoteImage';

const UserServiceDetails = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    const { data: product, error, isLoading } = useProduct(id);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch services</Text>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product?.name }} />

            <RemoteImage
                path={product?.image}
                fallback={defaultProductImage}
                style={[styles.image, { borderRadius: 10 }]}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{product?.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{product?.price}.00 KM</Text>
                </View>
                <Text style={styles.description}>{product?.description}</Text>
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
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003972',
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default UserServiceDetails;