import { View, Text, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const ProfileScreen = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('full_name, email, phonenumber')
                .eq('id', user.id)
                .single();

            if (profileError) throw profileError;

            setProfile(profileData);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#003972" />;
    }

    if (!profile) {
        return <Text style={styles.noDataText}>No profile data found</Text>;
    }

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
        <View style={styles.container}>
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{profile.email}</Text>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <Text style={styles.infoText}>+{profile.phonenumber}</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Sign out"
                    onPress={handleSignOut}
                    color={'#003972'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003972',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 30,
        alignSelf: 'center',
        width: '80%',
    },
});

export default ProfileScreen;
