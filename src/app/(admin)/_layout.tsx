import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import { useAuth } from '@/src/providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Redirect href={'/'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        tabBarStyle: {
          backgroundColor: '#003972',
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>

      {/* This is for hiding a tab bar icon */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="createNews" options={{ href: null }} />
      <Tabs.Screen name="createProduct" options={{ href: null }} />
      <Tabs.Screen name="createService" options={{ href: null }} />
      <Tabs.Screen name="addBarber" options={{ href: null }} />

      <Tabs.Screen
        name="news"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
          title: 'News',
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="barbers"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          title: 'Barbers', headerRight: () => (
            <Link href="/(admin)/addBarber" asChild>
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

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="services"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="scissors" color={color} />,
          title: 'Services',
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          title: 'Products',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
