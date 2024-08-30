import React from 'react';
import { FlatList, View } from 'react-native';
import services from '@/assets/data/services';
import ServiceListItem from '@/src/components/ServiceListItem';

export default function ServiceScreen() {
    return (
        <View>
            <FlatList
                data={services}
                renderItem={({ item }) => <ServiceListItem service={item} />}
                numColumns={2}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                columnWrapperStyle={{ gap: 10 }}
            />
        </View>
    );
};
