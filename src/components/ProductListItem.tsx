import { Text, StyleSheet, Image, Pressable } from 'react-native';
import { Tables } from '../types';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultProductImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/products/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <RemoteImage
                    path={product.image}
                    fallback={defaultProductImage}
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.price} KM</Text>
            </Pressable>
        </Link>
    );
};

export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        maxWidth: '50%',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});
