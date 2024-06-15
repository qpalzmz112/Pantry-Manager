import { View, Modal, KeyboardAvoidingView, Keyboard } from "react-native";
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
import { Recipe, RecipeIngredient } from "@/types/recipe";
import Button from "@/components/Button";

interface props {
  recipe?: Recipe;
  close: () => void;
}

export default function AddRecipeModal({ recipe, close }: props) {
  const { t } = useTranslation();

  const [recipeName, setRecipeName] = useState(recipe ? recipe.name : "");
  const [category, setCategory] = useState(recipe ? recipe.category : "");
  const [showCategories, setShowCategories] = useState(false);

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    recipe ? recipe.ingredients : []
  );
  const [steps, setSteps] = useState(recipe ? recipe.steps : "");
  const [stepInputFocused, setStepInputFocused] = useState(false);
  Keyboard.addListener("keyboardDidHide", () => {
    if (stepInputFocused) {
      setStepInputFocused(false);
    }
  });

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
      toast(t(recipe ? "toast_recipe_updated" : "recipe_added"));
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
        <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
          {!stepInputFocused && (
            <>
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
            </>
          )}

          <KeyboardAvoidingView
            enabled={stepInputFocused}
            behavior="position"
            className={stepInputFocused ? "pb-20" : ""}
          >
            <LabelledTextInput
              labelText={t("recipe_steps")}
              inputText={steps}
              onChangeText={(text) => setSteps(text)}
              multiline={stepInputFocused}
              onFocus={() => setStepInputFocused(true)}
              onPress={() => setStepInputFocused(true)}
              onBlur={() => setStepInputFocused(false)}
            />
          </KeyboardAvoidingView>

          {stepInputFocused ? null : recipe ? (
            <Button
              text={t("save_recipe_changes")}
              onPress={() => {
                let newRecipes = { ...recipes };
                // delete original recipe
                newRecipes[recipe.category] = newRecipes[
                  recipe.category
                ].filter((r) => r.name != recipe.name);
                // save updated recipe
                const updatedRecipe = {
                  name: recipeName,
                  category: category,
                  ingredients: ingredients,
                  steps: steps,
                };
                if (category in newRecipes) {
                  newRecipes[category].push(updatedRecipe);
                } else {
                  newRecipes[category] = [updatedRecipe];
                }
                setRecipes(newRecipes);
                setRootActive(1);
              }}
              pressableClass={`p-2 rounded-md m-4 max-w-[40vw] flex justify-center bg-gray-200`}
              pressedClass="bg-gray-300"
              textClass="text-center text-lg"
            />
          ) : (
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
                setRecipeName("");
                setCategory("");
                setIngredients([]);
                setSteps("");
              }}
              doToast={(n: number) => {
                setRootActive(n);
              }}
            />
          )}

          <CloseButton close={close} />
        </View>
      </RootSiblingParent>
    </Modal>
  );
}
