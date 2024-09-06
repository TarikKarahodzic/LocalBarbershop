import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultBarberImage } from '@/src/components/BarberListItem';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useNews } from '@/src/api/services';

const NewsDetailScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    
    const { data: news, error, isLoading } = useNews(id);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch news</Text>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: news?.name || 'Product Details',
                    headerRight: () => (
                        <Link href={`/(admin)/createNews?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.6 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />

            <Image
                source={{ uri: news.image || defaultBarberImage }}
                style={styles.image}
            />

            <Text style={styles.title}>{news.name}</Text>
            <Text style={styles.info}>{news.desc}</Text>
            <Text style={styles.info}>{news.timestamp}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '80%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    info: {
        fontSize: 16,
    },
});

export default NewsDetailScreen;