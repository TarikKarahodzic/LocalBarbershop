import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Service } from '../types';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export const defaultServiceImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ServiceListItemProps = {
    service: Service;
}

const ServiceListItem = ({ service }: ServiceListItemProps) => {
    return (
        <View style={mainStyles.container}>
            <View style={serviceStyles.serviceBox}>
                <Image
                    source={{ uri: service.image || defaultServiceImage }}
                    style={mainStyles.image}
                />
                <Text style={serviceStyles.serviceTitle}>{service.name}</Text>
            </View>
        </View>
    );
}
// This bit makes a skelet for some part of the screen
// or a whole part. For example ill use this for the barbers section on the app
// Can make another one for top part (services) and bottom part (products)

export default ServiceListItem;

const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#121212'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#121212'
    },
    info: {
        fontSize: 14,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const serviceStyles = StyleSheet.create({
    servicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    serviceBox: {
        width: '25%',
        alignItems: 'center',
        marginBottom: 20,
    },
    serviceImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
    },
    serviceTitle: {
        fontSize: 14,
        textAlign: 'center',
    }
});