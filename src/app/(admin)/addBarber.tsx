import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";

import { defaultBarberImage } from "@/src/components/BarberListItem";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useBarber, useDeleteBarber, useInsertBarber, useUpdateBarber } from "@/src/api/services";

const CreateBarberScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

    const isUpdating = !!id;

    const { mutate: insertBarber } = useInsertBarber();
    const { mutate: updateBarber } = useUpdateBarber();
    const { mutate: deleteBarber } = useDeleteBarber();
    const { data: updatingBarber } = useBarber(id);

    const router = useRouter();

    useEffect(() => {
        if (updatingBarber) {
            setName(updatingBarber.name);
            setEmail(updatingBarber.email);
            setPhoneNumber(updatingBarber.phoneNumber.toString());
            setImage(updatingBarber.image);
        }
    }, [updatingBarber]);

    const resetFields = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        return true;
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

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    };

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        insertBarber({ name, image, email, phoneNumber }, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });
    };

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }

        updateBarber({ id, name, image, email, phoneNumber },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        );
    };

    const onDelete = () => {
        deleteBarber(id, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            },
        });
    };

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this barber?", [
            {
                text: 'Cancel',
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: onDelete,
            }
        ]);
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
            <Stack.Screen options={{
                title: isUpdating ? 'Update barber' : 'Add Barber'
            }} />

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
            <Text style={styles.label}>Phone number</Text>
            <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+387644035111"
                style={styles.input}
                keyboardType="numeric"
            />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"}></Button>
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            )}
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

export default CreateBarberScreen;

// ili napraviti novi screen gdje ce se samo vidjeti kod
// admina, i imat ce podijeljeno Barbers pa add, edit, remove
// services add, edit, remove i products add, edit, remove