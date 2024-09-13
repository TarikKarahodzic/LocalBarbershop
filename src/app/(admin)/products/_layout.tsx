import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function ProductStack() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Products",
                    headerRight: () => (
                        <Link href="/(admin)/createProduct" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="plus-square-o"
                                        size={25}
                                        color={'#003972'}
                                        style={{ marginRight: 15, opacity: pressed ? 0.6 : 2 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )
                }}
            />
        </Stack>
    )
}