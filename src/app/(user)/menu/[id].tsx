import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useAppointmentList, useBarber, useInsertAppointment, useServiceList } from '@/src/api/services';
import { supabase } from '@/src/lib/supabase';

const BookingScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: barber, error: barberError, isLoading: barberLoading } = useBarber(id);
    const { data: services, error: serviceError, isLoading: serviceLoading } = useServiceList();
    const { data: appointments, isLoading: appointmentsLoading } = useAppointmentList();

    const { mutate: insertAppointment } = useInsertAppointment();

    const [selectedDate, setSelectedDate] = useState(getNextSevenDays()[0]);
    const [selectedTime, setSelectedTime] = useState('11:30');
    const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
    const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
    const [selectedBarberId, setSelectedBarberId] = useState(id);

    const dates = getNextSevenDays();
    const times = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    useEffect(() => {
        const getCurrentUser = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
                return;
            }
            if (session?.user?.id) {
                setCurrentProfileId(session.user.id);
            }
        };

        getCurrentUser();
    }, []);

    const resetFields = () => {
        setSelectedDate(getNextSevenDays()[0]);
        setSelectedTime('08:00');
        setSelectedServiceIds([]);
    };

    const getSelectedDateTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(':').map(Number);

        const combinedDate = new Date(date);
        combinedDate.setUTCHours(hours, minutes, 0, 0);

        return combinedDate;
    };

    const isSlotUnavailable = (timeSlot: string) => {
        return appointments?.some(appointment => {
            // Check if the appointment is for the selected barber
            if (appointment.barber_id !== selectedBarberId) {
                return false;
            }

            const appointmentDate = new Date(appointment.time);
            const selectedDateTime = getSelectedDateTime(selectedDate, timeSlot);

            // Check if the time matches and the date matches
            return (
                appointmentDate.getUTCHours() === selectedDateTime.getUTCHours() &&
                appointmentDate.getUTCMinutes() === selectedDateTime.getUTCMinutes() &&
                appointmentDate.toDateString() === selectedDateTime.toDateString()
            );
        });
    };


    const handleBookAppointment = async () => {
        console.log("Selected Barber ID:", selectedBarberId);
        console.log("Selected Service IDs:", selectedServiceIds);
        console.log("Profile ID:", currentProfileId);
        console.log('Selected Time:', selectedTime);

        if (selectedBarberId === null || selectedServiceIds.length === 0 || currentProfileId === null) {
            console.error('Please select all required fields.');
            return;
        }

        try {
            const selectedDateTimeString = getSelectedDateTime(selectedDate, selectedTime).toISOString();

            const appointmentData = {
                barberId: selectedBarberId,
                serviceIds: selectedServiceIds,
                profileId: currentProfileId,
                time: selectedDateTimeString,
            };

            await insertAppointment(appointmentData, {
                onSuccess: () => {
                    console.log('Appointment booked successfully!');
                    resetFields();
                    router.back();
                },
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    const handleServicePress = (serviceId: number) => {
        setSelectedServiceIds(prevSelectedServices => {
            if (prevSelectedServices.includes(serviceId)) {
                return prevSelectedServices.filter(service => service !== serviceId);
            } else {
                return [...prevSelectedServices, serviceId];
            }
        });
    };

    if (barberLoading || serviceLoading) {
        return <ActivityIndicator />;
    }

    if (barberError || serviceError) {
        return <Text>Failed to fetch data</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: barber?.name }} />
            <Text style={styles.serviceTitle}>Choose your services</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.serviceContainer}
            >
                {services?.length ? (
                    services.map(service => (
                        <TouchableOpacity
                            key={service.id}
                            style={[styles.serviceBox, selectedServiceIds.includes(service.id) && styles.selectedServiceBox]}
                            onPress={() => handleServicePress(service.id)}
                        >
                            <Text style={[styles.serviceText, selectedServiceIds.includes(service.id) && styles.selectedText]}>
                                {service.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>No services available</Text>
                )}
            </ScrollView>

            <Text style={styles.serviceTitle}>Select a date</Text>
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
            <Text style={styles.serviceTitle}>Select a time slot</Text>
            <View style={styles.timeContainer}>
                {times.map((time, index) => {
                    const isUnavailable = isSlotUnavailable(time);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.timeBox, selectedTime === time && !isUnavailable && styles.selectedTimeBox, isUnavailable && styles.unavailableTimeBox]}
                            onPress={() => !isUnavailable && setSelectedTime(time)}
                            disabled={isUnavailable}  // Disable the button if the time slot is unavailable
                        >
                            <Text style={[styles.timeText, selectedTime === time && !isUnavailable && styles.selectedText, isUnavailable && styles.unavailableText]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
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
    unavailableTimeBox: {
        backgroundColor: '#d3d3d3',  // Gray out unavailable slots
        borderColor: '#a9a9a9',
    },
    unavailableText: {
        color: '#888',  // Light gray for unavailable text
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
        width: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
        marginRight: 5
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
        marginBottom: 50,
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default BookingScreen;