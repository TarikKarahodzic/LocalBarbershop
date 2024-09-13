import { Text, StyleSheet, Image, Pressable } from 'react-native';
import { Tables } from '../types';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';

export const defaultServiceImage =
    'https://kuysmwqkgvbbdobnncfc.supabase.co/storage/v1/object/sign/default-image/service-default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0LWltYWdlL3NlcnZpY2UtZGVmYXVsdC5wbmciLCJpYXQiOjE3MjYxNzg5NDgsImV4cCI6MTcyODc3MDk0OH0.zm9Tc3UYFBMITDnw5UL5WjZK7sUX-YsLhwsDiZX6Zyw&t=2024-09-12T22%3A09%3A08.878Z';
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
                <Text style={styles.price}>{service.price}.00 KM</Text>
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
        color: '#003972',
        fontWeight: 'bold',
    },
});
