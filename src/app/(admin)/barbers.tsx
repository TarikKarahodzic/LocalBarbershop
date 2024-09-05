import React from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { useBarberList } from '@/src/api/services';
import BarberListItem from '@/src/components/BarberListItem';

export default function BarberScreen() {
    const { data: barbers, error, isLoading } = useBarberList();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch services</Text>;
    }

    return (
        <View>
            <FlatList
                data={barbers}
                renderItem={({ item }) => <BarberListItem barber={item} />}
                contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            />
        </View>
    );
};