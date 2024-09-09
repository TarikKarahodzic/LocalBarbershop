import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";

import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { defaultServiceImage } from "@/src/components/ServiceListItem";
import { useInsertService, useUpdateService, useDeleteService, useService } from "@/src/api/services";
import { supabase } from "@/src/lib/supabase";

import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';
import { decode } from "base64-arraybuffer";

import 'react-native-get-random-values';
import RemoteImage from "@/src/components/RemoteImage";

const CreateServiceScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const navigation = useNavigation();

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    const isUpdating = !!id;

    const { mutate: insertService } = useInsertService();
    const { mutate: updateService } = useUpdateService();
    const { mutate: deleteService } = useDeleteService();
    const { data: updatingService } = useService(id);

    const router = useRouter();

    useEffect(() => {
        if (updatingService) {
            setName(updatingService.name);
            setPrice(updatingService.price.toString());
            setImage(updatingService.image);
        }
    }, [updatingService]);

    const resetFields = () => {
        setName('');
        setPrice('');
        return true;
    };

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Use numbers for price');
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
    }

    const onCreate = async () => {
        if (!validateInput()) {
            return;
        }


        insertService({ name, price: parseFloat(price), image },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                }
            });

        resetFields();
    };

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }

        updateService({ id, name, price },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        );
    };

    const onDelete = () => {
        deleteService(id, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
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
                title: isUpdating ? 'Update a service' : 'Create a service'
            }} />

            <RemoteImage
                path={image}
                fallback={defaultServiceImage}
                style={styles.image}
            />
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Haircut"
                style={styles.input}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="20.00 KM"
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

export default CreateServiceScreen;