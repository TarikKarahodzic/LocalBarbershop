import React from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductList } from '@/src/api/services';

export default function ProductScreen() {
    const { data: products, error, isLoading } = useProductList();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch products</Text>;
    }

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductListItem product={item} />}
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            columnWrapperStyle={{ gap: 10 }}
        />
    );
};
