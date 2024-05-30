import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { get_tab } from "@/code/data_functions";

export default function Page() {
  const [tab, setTab] = useState("");
  useEffect(() => {
    get_tab().then((val) => {
      if (val == tab) {
        return;
      }
      setTab(val);
    });
  });

  return <Redirect href="ShoppingList" />;
}
