import { defaultBarberImage } from "@/src/components/BarberListItem";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
    };

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!email) {
            setErrors('Email is required');
            return false;
        }
        if (isNaN(parseFloat(phoneNumber))) {
            setErrors('Phone number is incorrect. Use numbers');
            return false;
        }
        return true;
    };

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Adding barber: ', name);

        // Save in database

        resetFields();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update barber' : 'Add Barber' }} />

            <Image source={{ uri: image || defaultBarberImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Full name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
                style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="john.doe@example.com"
                style={styles.input}
            />
            <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+387644035111"
                style={styles.input}
                keyboardType="numeric"
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