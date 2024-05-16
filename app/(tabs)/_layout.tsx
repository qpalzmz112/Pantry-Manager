import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "darkgreen",
          tabBarActiveBackgroundColor: "#eaebe5",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
            marginBottom: 3,
          },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="ShoppingList"
          options={{
            title: "Shopping List",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="sticky-note" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Ingredients"
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="list" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Recipes"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="book" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
