import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import barbers from '@/assets/data/barbers';

const BarberDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const barber = barbers.find((p) => p.id.toString() === id)

    if(!barber) {
        return <Text>Barber not found</Text>
    }

    return (
        <View>
            <Stack.Screen options={{ title: barber?.name }} />

            <Text>BarberDetailsScreen for id: {id}</Text>
        </View>
    );
};

export default BarberDetailsScreen;