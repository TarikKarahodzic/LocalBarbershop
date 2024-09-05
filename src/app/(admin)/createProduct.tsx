import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";

import { defaultProductImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from "@/src/api/services";

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const navigation = useNavigation();

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { data: updatingProudct } = useProduct(id);

    const router = useRouter();

    useEffect(() => {
        if (updatingProudct) {
            setName(updatingProudct.name);
            setPrice(updatingProudct.price.toString());
            setImage(updatingProudct.image);
        }
    }, [updatingProudct]);

    const resetFields = () => {
        setName('');
        setPrice('');
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

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        insertProduct({ name, price: parseFloat(price), image }, {
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
        updateProduct({ id, name, price: parseFloat(price), image },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        );
    };

    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            },
        });
    };

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
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
                title: 'Create a product'
            }} />

            <Image source={{ uri: image || defaultProductImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Hair paste"
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
            <Button onPress={onCreate} text="Create"></Button>
            <Text onPress={confirmDelete} style={styles.textButton}>
                Delete
            </Text>
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