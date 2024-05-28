import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "@/types/shopping_list";

function set_tab(tab: string) {
  try {
    AsyncStorage.setItem("Tab", JSON.stringify(tab));
  } catch (e) {
    console.log(e);
  }
}

async function get_tab() {
  try {
    const jsonTab = await AsyncStorage.getItem("Tab");
    return jsonTab != null ? JSON.parse(jsonTab) : "ShoppingList";
  } catch (e) {
    console.log(e);
  }
}

const store_data = async (data: any, key: string) => {
  try {
    const jsonItems = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonItems);
  } catch (e) {
    console.log(e);
  }
};

const get_data = async (key: string) => {
  try {
    const jsonItems = await AsyncStorage.getItem(key);
    return jsonItems != null ? JSON.parse(jsonItems) : null;
  } catch (e) {
    console.log(e);
  }
};

export { set_tab, get_tab, store_data, get_data };
