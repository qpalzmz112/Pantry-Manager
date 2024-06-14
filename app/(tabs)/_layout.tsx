import React, { useContext, useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { get_data, store_data } from "@/code/data_functions";
import {
  ItemContext,
  CategoryContext,
  RecipeContext,
} from "@/code/data_context";
import { SettingsContext } from "@/code/settings_context";
import { NotificationsContext } from "@/code/notifications_context";
import { Item } from "@/types/shopping_list";
import { Categories } from "@/types/ingredients";
import { Recipes } from "@/types/recipe";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();

  const { data: Items } = useContext(ItemContext);
  const [items, updateItems] = useState<Item[]>(Items);
  const [loadedItems, setLoadedItems] = useState(false);

  const { data: Categories } = useContext(CategoryContext);
  const [categories, setCategories] = useState<Categories>(Categories);
  const [loadedCategories, setLoadedCategories] = useState(false);

  const { data: Recipes } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState<Recipes>(Recipes);
  const [loadedRecipes, setLoadedRecipes] = useState(false);

  const { data: Settings } = useContext(SettingsContext);
  const [settings, setSettings] = useState(Settings);
  const [loadedSettings, setLoadedSettings] = useState(false);

  const { data: Notifications } = useContext(NotificationsContext);
  const [notifications, setNotifications] = useState(Notifications);
  const [loadedNotifs, setLoadedNotifs] = useState(false);

  useEffect(() => {
    if (loadedItems) {
      store_data(items, "items");
    }
  }, [items]);

  useEffect(() => {
    if (loadedCategories) {
      store_data(categories, "categories");
    }
  }, [categories]);

  useEffect(() => {
    if (loadedRecipes) {
      store_data(recipes, "recipes");
    }
  }, [recipes]);

  useEffect(() => {
    if (loadedSettings) {
      store_data(settings, "settings");
    }
  }, [settings]);

  useEffect(() => {
    if (loadedNotifs) {
      store_data(notifications, "notifications");
    }
  }, [notifications]);

  useEffect(() => {
    get_data("items").then((val) => {
      setLoadedItems(true);
      if (val != null) {
        updateItems(val);
      }
    });
    get_data("categories").then((val) => {
      setLoadedCategories(true);
      if (val != null) {
        setCategories(val);
      }
    });
    get_data("recipes").then((val) => {
      setLoadedRecipes(true);
      if (val != null) {
        setRecipes(val);
      }
    });
    get_data("settings").then((val) => {
      setLoadedSettings(true);
      if (val != null) {
        setSettings(val);
      }
    });
    get_data("notifications").then((val) => {
      setLoadedNotifs(true);
      if (val != null) {
        setNotifications(val);
      }
    });
  }, []);

  if (items == null || categories == null) {
    return; //loading
  }
  return (
    <NotificationsContext.Provider
      value={{ data: notifications, update: setNotifications }}
    >
      <SettingsContext.Provider value={{ data: settings, update: setSettings }}>
        <RecipeContext.Provider value={{ data: recipes, update: setRecipes }}>
          <CategoryContext.Provider
            value={{ data: categories, update: setCategories }}
          >
            <ItemContext.Provider value={{ data: items, update: updateItems }}>
              <StatusBar style="dark" />
              <Tabs
                screenOptions={{
                  tabBarActiveTintColor: "indigo",
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
                    title: t("shopping_list_title"),
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5
                        name="sticky-note"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Ingredients"
                  options={{
                    title: t("ingredients_title"),
                    tabBarIcon: ({ color }) => (
                      <Entypo name="list" size={24} color={color} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Recipes"
                  options={{
                    title: t("recipes_title"),
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="book" size={24} color={color} />
                    ),
                  }}
                />
              </Tabs>
            </ItemContext.Provider>
          </CategoryContext.Provider>
        </RecipeContext.Provider>
      </SettingsContext.Provider>
    </NotificationsContext.Provider>
  );
}
