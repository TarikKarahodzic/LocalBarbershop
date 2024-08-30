import { View, Text, StyleSheet, Image } from 'react-native';
import { Service } from '../types';
import Colors from '../constants/Colors';

export const defaultServiceImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ServiceListItemProps = {
    service: Service;
}

const ServiceListItem = ({ service }: ServiceListItemProps) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: service.image || defaultServiceImage }} 
                style={styles.image}
                resizeMode='contain'
            />

            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.price}>${service.price}</Text>
        </View>
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
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});
