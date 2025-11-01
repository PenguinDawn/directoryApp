import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { Text } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#4c2ed2ff",
        tabBarStyle: {
          backgroundColor:  "#b390f1ff",
          paddingBottom: 5, // Background color of the entire tab bar
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Directory',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12 }}>Directory</Text>
          ),
          }}
      />
       <Tabs.Screen
        name="[profile]"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12 }}>Profile</Text>
          ),
          }}
      />
      <Tabs.Screen
        name="[name]"
        options={{
          title: '[name]',
          href: null
        }}
      />
    </Tabs>
  );
}
