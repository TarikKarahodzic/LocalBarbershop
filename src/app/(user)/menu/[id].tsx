import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import barbers from '@/assets/data/barbers';
import { useState } from 'react';

const BookingScreen = () => {
    const { id } = useLocalSearchParams();
    const barber = barbers.find((p) => p.id.toString() === id)

    if (!barber) {
        return <Text>Barber not found</Text>
    }

    const [selectedDate, setSelectedDate] = useState(getNextSevenDays()[0]);
    const [selectedTime, setSelectedTime] = useState('11:30Am');
    const [selectedService, setSelectedService] = useState('Hair cut');

    const dates = getNextSevenDays();
    const times = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
    const services = ['Hair cut', 'Head massage', 'Facial', 'Beard'];

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: barber?.name }} />
            <Text style={styles.title}>Book Appointment</Text>
            <Text style={styles.date}>{selectedDate.toDateString()}</Text>
            <View style={styles.dateContainer}>
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dateBox, selectedDate.toDateString() === date.toDateString() && styles.selectedDateBox]}
                        onPress={() => setSelectedDate(date)}
                    >
                        <Text style={[styles.dateText, selectedDate.toDateString() === date.toDateString() && styles.selectedText]}>
                            {date.getDate()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.timeContainer}>
                {times.map((time, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.timeBox, selectedTime === time && styles.selectedTimeBox]}
                        onPress={() => setSelectedTime(time)}
                    >
                        <Text style={[styles.timeText, selectedTime === time && styles.selectedText]}>{time}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.serviceTitle}>Choose your services</Text>
            <View style={styles.serviceContainer}>
                {services.map((service, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.serviceBox, selectedService === service && styles.selectedServiceBox]}
                        onPress={() => setSelectedService(service)}
                    >
                        <Text style={[styles.serviceText, selectedService === service && styles.selectedText]}>{service}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const getNextSevenDays = () => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        daysArray.push(date);
    }

    return daysArray;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#121212',
    },
    date: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateBox: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#888',
    },
    selectedDateBox: {
        backgroundColor: '#003972',
        borderColor: '#001f3f',
    },
    dateText: {
        color: '#121212',
    },
    selectedText: {
        color: '#FFF',
    },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    timeBox: {
        width: '30%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
        marginBottom: 10,
    },
    selectedTimeBox: {
        backgroundColor: '#003972',
        borderColor: '#001f3f',
    },
    timeText: {
        color: '#121212',
    },
    serviceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#121212',
    },
    serviceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    serviceBox: {
        width: '23%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
    },
    selectedServiceBox: {
        backgroundColor: '#003972',
        borderColor: '#001f3f',
    },
    serviceText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#121212',
    },
    bookButton: {
        backgroundColor: '#003972',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default BookingScreen;