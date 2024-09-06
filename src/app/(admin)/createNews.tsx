import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useDeleteNews, useInsertNews, useNews, useUpdateNews } from "@/src/api/services";

const CreateNewsScreen = () => {
    const [title, setTitle] = useState('');
    const [desc, setDescription] = useState('');
    const [timestamp, setTimeStamp] = useState('');

    const [errors, setErrors] = useState('');

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    const isUpdating = !!id;

    const { mutate: insertNews } = useInsertNews();
    const { mutate: updateNews } = useUpdateNews();
    const { mutate: deleteNews } = useDeleteNews();
    const { data: updatingNews } = useNews(id);

    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        if (updatingNews) {
            setTitle(updatingNews.title);
            setDescription(updatingNews.desc);
            setTimeStamp(updatingNews.timestamp);
        }
    }, [updatingNews]);


    const resetFields = () => {
        setTitle('');
        setDescription('');
        setTimeStamp('');
        return true;
    };

    const validateInput = () => {
        setErrors('');
        if (!title) {
            setErrors('Please enter the title');
            return false;
        }
        if (!desc) {
            setErrors('Forgot to write some description');
            return false;
        }
        if (!timestamp) {
            setErrors('Forgot to set the timestamp');
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

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        insertNews({ title, desc, timestamp }, {
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
        updateNews({ title, desc, timestamp },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        );
    }

    const onDelete = () => {
        deleteNews(id, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            },
        });
    };

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this news?", [
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
            <Stack.Screen options={{ title: isUpdating ? 'Update news' : 'Add news' }} />

            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="New barber soon"
                style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={desc}
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

export default CreateNewsScreen;

// ili napraviti novi screen gdje ce se samo vidjeti kod
// admina, i imat ce podijeljeno Barbers pa add, edit, remove
// services add, edit, remove i products add, edit, remove
