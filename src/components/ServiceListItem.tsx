import { Text, StyleSheet, Image, Pressable } from 'react-native';
import { Tables } from '../types';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';

export const defaultServiceImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ServiceListItemProps = {
    service: Tables<'services'>;
}

const ServiceListItem = ({ service }: ServiceListItemProps) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/services/${service.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: service.image || defaultServiceImage }}
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.title}>{service.name}</Text>
                <Text style={styles.price}>{service.price} KM</Text>
            </Pressable>
        </Link>
    );
};

export default ServiceListItem;

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
