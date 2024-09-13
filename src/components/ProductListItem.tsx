import { Text, StyleSheet, Pressable } from 'react-native';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultProductImage =
    'https://kuysmwqkgvbbdobnncfc.supabase.co/storage/v1/object/sign/default-image/product-default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0LWltYWdlL3Byb2R1Y3QtZGVmYXVsdC5wbmciLCJpYXQiOjE3MjYxNzg1OTcsImV4cCI6MTcyODc3MDU5N30.YLRLzHeqD68wqcSI6NQI2AqrxAGcoZ8-HYvc9-HRIik&t=2024-09-12T22%3A03%3A17.846Z';

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
                <Text style={styles.price}>{product.price}.00 KM</Text>
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
        color: '#003972',
        fontWeight: 'bold',
    },
});
