import { Text, View, StyleSheet } from 'react-native';
import { Appointment } from '../types';

type AppointmentListItemProps = {
    appointment: Appointment;
};

const AppointmentListItem = ({ appointment }: AppointmentListItemProps) => {
    return (
        <View style={mainStyles.barberContainer}>
            <View style={mainStyles.textContainer}>
                <Text style={mainStyles.name}>Appointment ID: {appointment.id}</Text>
                <View style={mainStyles.additionalInfo}>
                    <View style={mainStyles.infoContainer}>
                        <Text style={mainStyles.infoText}>Barber: {appointment.barber.name}</Text>
                    </View>
                    <View style={mainStyles.infoContainer}>
                        <Text style={mainStyles.infoText}>Services: {appointment.services.map(service => service.name).join(', ')}</Text>
                    </View>
                    <View style={mainStyles.infoContainer}>
                        <Text style={mainStyles.infoText}>Customer: {appointment.profile.full_name}</Text>
                    </View>
                    <View style={mainStyles.infoContainer}>
                        <Text style={mainStyles.infoText}>Time: {appointment.time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AppointmentListItem;


const mainStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#121212',
    },
    info: {
        fontSize: 14,
        color: '#121212',
    },
    imageContainer: {
        width: '20%',
        aspectRatio: 1,
        overflow: 'hidden',
    },
    image: {
        width: '90%',
        height: '90%',
        borderRadius: 40,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    barberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    additionalInfo: {
        margin: 10
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        marginRight: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#888',
    },
});