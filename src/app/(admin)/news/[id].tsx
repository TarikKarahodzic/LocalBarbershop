import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
                    title: news?.title || 'News Details',
                    headerRight: () => (
                        <Link href={`/(admin)/createNews?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={'#003972'}
                                        style={{ marginRight: 15, opacity: pressed ? 0.6 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Text style={styles.title}>{news?.title}</Text>
            <Text style={styles.info}>{news?.desc}</Text>
            <Text style={styles.info}>{news?.timestamp}</Text>
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