import React from 'react';
import { FlatList, ScrollView, Pressable } from 'react-native';
import news from '@/assets/data/news';
import NewsListItem from '@/src/components/NewsListItem';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
// Sample data for the news items

export default function NewsScreen() {
    return (
        <ScrollView>
            <FlatList
                data={news}
                renderItem={({ item }) => <NewsListItem news={item} />}
            />
        </ScrollView>
    );
};
