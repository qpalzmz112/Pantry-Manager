import { View, Modal } from "react-native";
import { useState, useContext, useEffect } from "react";
import LabelledTextInput from "@/components/ingredients_page/add_ingredient_modal/LabelledTextInput";
import CloseButton from "@/components/CloseButton";
import toast from "@/code/toast";
import { RecipeContext } from "@/code/data_context";
import { RootSiblingParent } from "react-native-root-siblings";
import { useTranslation } from "react-i18next";
import CategoryList from "@/components/ingredients_page/add_ingredient_modal/CategoryList";
import { get_matching_categories } from "@/code/recipe_utils";
import RecipeIngredientList from "./RecipeIngredientList";
import AddButtonPair from "@/components/AddButtonPair";

export default function AddRecipeModal({ close }: { close: () => void }) {
  const { t } = useTranslation();
  const [recipeName, setRecipeName] = useState("");

  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const [ingredients, setIngredients] = useState<string[]>([]);

  const [steps, setSteps] = useState("");

  const { data: recipes, update: setRecipes } = useContext(RecipeContext);

  const [errorMessage, setErrorMessage] = useState("");

  let matching_categories: string[] = get_matching_categories(
    category,
    recipes
  );

  // 0: inactive, 1: inactive but show toast after closing modal, 2: active and show toast over modal
  const [rootActive, setRootActive] = useState(0);
  useEffect(() => {
    if (rootActive != 0) {
      toast(t("recipe_added"));
      if (rootActive == 1) {
        close();
      }
      setRootActive(0);
    }
  }, [rootActive]);

  const recipeNameExists = () => {
    let res = false;
    Object.keys(recipes).map((category) => {
      recipes[category].map((recipe) => {
        if (recipe.name == recipeName) {
          res = true;
        }
      });
    });
    return res;
  };

  const canAddRecipeCheck = () => {
    if (recipeName == "") {
      setErrorMessage(t("error_recipe_no_name"));
      return false;
    } else if (recipeNameExists()) {
      setErrorMessage(t("error_recipe_name_exists"));
      return false;
    } else if (category != "" && !Object.keys(recipes).includes(category)) {
      setErrorMessage(t("error_category"));
      return false;
    }
    return true;
  };

  return (
    <Modal transparent={false} onRequestClose={close}>
      <RootSiblingParent inactive={rootActive == 2 ? false : true}>
        <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col pt-10 items-center">
          <LabelledTextInput
            labelText={t("item_name")}
            inputText={recipeName}
            onChangeText={(text) => {
              setRecipeName(text);
              setErrorMessage("");
            }}
          />

          <LabelledTextInput
            labelText={t("category_optional")}
            inputText={category}
            onChangeText={(text) => {
              setCategory(text);
              setErrorMessage("");
            }}
            onPress={() => {
              setShowCategories(true);
              setCategory("");
              setErrorMessage("");
            }}
            onEndEditing={() => {
              setShowCategories(false);
            }}
          />
          {showCategories && (
            <CategoryList
              category={category}
              categories={recipes}
              matching_categories={matching_categories}
              setCategory={setCategory}
              setCategories={setRecipes}
            />
          )}

          <RecipeIngredientList
            ingredients={ingredients}
            setIngredients={setIngredients}
          />

          <LabelledTextInput
            labelText={t("recipe_steps")}
            inputText={steps}
            onChangeText={(text) => setSteps(text)}
            multiline={true}
          />

          <AddButtonPair
            type="recipe"
            errorMessage={errorMessage}
            canAddCheck={canAddRecipeCheck}
            add={() => {
              const recipe = {
                name: recipeName,
                category: category,
                ingredients: ingredients,
                steps: steps,
              };
              let r = { ...recipes };
              if (category in r) {
                r[category].push(recipe);
              } else {
                r[category] = [recipe];
              }
              setRecipes(r);
            }}
            doToast={(n: number) => {
              setRootActive(n);
            }}
          />

          <CloseButton close={close} />
        </View>
      </RootSiblingParent>
    </Modal>
  );
}
