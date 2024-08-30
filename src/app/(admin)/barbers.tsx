import barbers from '@/assets/data/barbers';
import BarberListItem from '@/src/components/BarberListItem';
import React from 'react';
import { FlatList, View } from 'react-native';

export default function NewsScreen() {
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