import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const CreateProductScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timestamp, setTimeStamp] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const navigation = useNavigation();

    const resetFields = () => {
        setTitle('');
        setDescription('');
        setTimeStamp('');
    };

    const validateInput = () => {
        setErrors('');
        if (!title) {
            setErrors('Please enter the title');
            return false;
        }
        if (!description) {
            setErrors('Forgot to write some description');
            return false;
        }
        if (!timestamp) {
            setErrors('Forgot to set the timestamp');
            return false;
        }

        return true;
    };

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Uploading news: ', title);

        // Save in database

        resetFields();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Add news' }}/>

            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="New barber soon"
                style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Here is the place for some description. New barber coming soon!"
                style={styles.input}
            />
            <Text style={styles.label}>Time stamp</Text>
            <TextInput
                value={timestamp}
                onChangeText={setTimeStamp}
                placeholder="2024-08-18"
                style={styles.input}
            />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onCreate} text="Create"></Button>
        
            <Button onPress={() => navigation.goBack()} text="Back" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
});

export default CreateProductScreen;

// ili napraviti novi screen gdje ce se samo vidjeti kod
// admina, i imat ce podijeljeno Barbers pa add, edit, remove
// services add, edit, remove i products add, edit, remove
