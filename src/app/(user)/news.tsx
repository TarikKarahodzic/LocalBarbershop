import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import NewsListItem from '@/src/components/NewsListItem';
import { useNewsList } from '@/src/api/services';
// Sample data for the news items

export default function NewsScreen() {
    const { data: news, error, isLoading } = useNewsList();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch services</Text>;
    }
    
    return (
        <FlatList
            data={news}
            renderItem={({ item }) => <NewsListItem news={item} />}
        />
    );
};
