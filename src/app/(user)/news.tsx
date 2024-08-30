import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import news from '@/assets/data/news';
import NewsListItem from '@/src/components/NewsListItem';
// Sample data for the news items

export default function NewsScreen() {
    return (
        <FlatList
            data={news}
            renderItem={({ item }) => <NewsListItem news={item} />}
        />
    );
};
