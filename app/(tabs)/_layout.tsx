import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/hooks/AuthContext';
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
  const {user, member} = useAuth();

  let themeCol;
  let darkThemeCol;
  let club = member?.club; // update to get the user club

  if (club === "xbx") {
    themeCol = "#b390f1ff"
    darkThemeCol = "#6c27e3ff"
  }
  else if (club === "pka") {
    darkThemeCol = "#a80808ff"
    themeCol = "#f56464ff"
  }
  else if (club === "ox") {
    darkThemeCol = "#065d34ff"
    themeCol = "#99cdb5ff";
  }
  else if (club === "ep") {
    darkThemeCol = "#000000ff";
    themeCol = "#f5f064ff";
  }
  else if (club === "zxd") {
    darkThemeCol = "#0668bdff"
    themeCol = "#64b1f5ff"
  }
  else {
    darkThemeCol = "maroon"
    themeCol = "white"
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: darkThemeCol,
        tabBarStyle: {
          backgroundColor:  themeCol,
          paddingBottom: 5, // Background color of the entire tab bar
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>

      <Tabs.Screen
        name="directory"
        options={{
          title: 'Directory',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12 }}>Directory</Text>
          ),
          }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12 }}>Home</Text>
          ),
          }}
      />


      <Tabs.Screen
        name="auth"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
