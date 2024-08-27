import { View, Text, StyleSheet } from 'react-native';
import { News } from '../types';
import { useSegments } from 'expo-router';

type NewsListItemProps = {
    news: News;
}

const NewsListItem = ({ news }: NewsListItemProps) => {
    const segments = useSegments();

    return (
        <View style={styles.newsItemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.newsTitle}>{news.title}</Text>
                <Text style={styles.newsDescription}>{news.description}</Text>
                <Text style={styles.newsTimestamp}>{news.timestamp}</Text>
            </View>
        </View>
    );
};

export default NewsListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
    },
    newsList: {
        paddingBottom: 20,
    },
    newsItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 12,
        alignItems: 'center',
    },
    newsImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    newsDescription: {
        fontSize: 14,
        color: '#555',
    },
    newsTimestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
});
