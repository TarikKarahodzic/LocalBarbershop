import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/services';
import RemoteImage from '@/src/components/RemoteImage';

export const defaultProductImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';


const ProductDetailsScreen = () => {
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
            <Stack.Screen
                options={{
                    title: product?.name || 'Product Details',
                    headerRight: () => (
                        <Link href={`/(admin)/createProduct?id=${id}`} asChild>
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

            <RemoteImage
                path={product.image}
                fallback={defaultProductImage}
                style={styles.image}
            />

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.info}>{product.price}</Text>
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

export default ProductDetailsScreen;