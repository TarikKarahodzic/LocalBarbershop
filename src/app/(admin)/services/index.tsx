import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import ServiceListItem from '@/src/components/ServiceListItem';
import { useServiceList } from '@/src/api/services';

export default function ServiceScreen() {
    const { data: services, error, isLoading } = useServiceList();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch services</Text>;
    }

    return (
        <FlatList
            data={services}
            renderItem={({ item }) => <ServiceListItem service={item} />}
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            columnWrapperStyle={{ gap: 10 }}
        />
    );
};
