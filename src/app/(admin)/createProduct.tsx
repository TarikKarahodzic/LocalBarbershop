import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";

import { defaultProductImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

import { Stack, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from "@/src/api/services";

import 'react-native-get-random-values';
import RemoteImage from "@/src/components/RemoteImage";

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    const isUpdating = !!id;

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { data: updatingProudct } = useProduct(id);

    const navigation = useNavigation();
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
        setImage('');
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
        resetFields();
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

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: isUpdating ? 'Update a product' : 'Create a product'
            }} />

            <RemoteImage
                path={image}
                fallback={defaultProductImage}
                style={styles.image}
            />

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
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"}></Button>
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            )}
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