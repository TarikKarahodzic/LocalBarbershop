import { View, Text, Button, Alert } from 'react-native';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router'; // Assuming you're using expo-router

const ProfileScreen = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                router.replace('/sign-in');
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to sign out');
        }
    };

    return (
        <View>
            <Text>Profile</Text>

            <Button
                title="Sign out"
                onPress={handleSignOut}
            />
        </View>
    );
};

export default ProfileScreen;
