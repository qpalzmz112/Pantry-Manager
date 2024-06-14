const en = {
  // Shopping list
  shopping_list_title: "Shopping List",
  Groceries: "Groceries",
  "Non-Grocery Items": "Non-Grocery Items",

  // Add item modal
  item_name: "Name:",
  category_optional: "Category (optional):",
  is_grocery: "Grocery Item?",
  is_recurring: "Recurring Purchase?",
  recurring_info:
    "Recurring purchases will stay on your shopping list when you clear it and they will be marked with this icon:",
  qty: "Qty: ",
  add_item: "Add Item",
  add_item_return: "Add Item and Return to List",
  item_added: "Item added!",
  error_name_exists: "An item with this name already exists.",
  error_empty_name: "Item name cannot be empty.",

  // List items
  uncategorized: "Uncategorized",
  use_by: "Use by: ",

  // Change category modal
  category: "Category:",
  save: "Save",
  category_updated: "Category updated!",
  error_category:
    "Please enter the name of an existing category or leave the category field blank.",

  // Change date modal
  save_date: "Save Date to Item",
  date_info: "After adding a date, you can change it by tapping it.",
  date_saved: "Date saved!",

  // Date input
  date_input_label: "Use by Date (optional):",
  choose_date: "Choose an Expiration Date",
  remove_date: "Remove Date",
  date_placeholder: "MM-DD-YY",
  intlDateTime: "{{val, datetime}}",

  // Clear list modal
  clear_list_info_start: "Clear your shopping list?",
  clear_list_info_end:
    "Your purchased grocery items will be moved to your ingredients list, but unpurchased items and recurring purchases will remain.",
  yes: "Yes",
  no: "No",
  clear_list_success: "Success!",

  // Ingredients list
  search: "Search",
  clear_search: "Clear Search",

  // Add ingredient modal
  add_ingredient: "Add Ingredient",
  add_ingredient_return: "Add Ingredient and Return to List",
  error_ingredient_no_name: "Ingredient name cannot be empty.",
  error_ingredient_name_exists: "An ingredient with this name already exists.",
  toast_ingredient_added: "Ingredient added!",

  // Delete something modal
  delete: "Delete",
  item: "Item",
  ingredient: "ingredient",
  yes_add_to_shopping_list: "Yes, and add to shopping list",
  delete_category_info:
    "The ingredients in this category will remain, but will be uncategorized.",
  toast_deleted: "deleted",
  toast_deleted_added_to_shopping_list:
    "Ingredient deleted and added to shopping list",

  // Settings modal
  notif_switch_label: "Notifications: ",
  info_1:
    "The number of days you will be notified before an ingredient expires:",
  info_2: "The time of day you will be notified:",

  // Notifications
  notif_text_singular_one: "Your {{ingredient_name}} expires in 1 day.",
  notif_text_singular_more:
    "Your {{ingredient_name}} expires in {{count}} days.",
  notif_text_plural_one: "Your {{ingredient_name}} expire in 1 day.",
  notif_text_plural_more: "Your {{ingredient_name}} expire in {{count}} days.",

  ingredients_title: "Ingredients",

  // Recipes
  recipes_title: "Recipes",

  // Add Recipe Modal
  recipe_ingredient: "Ingredient",
  recipe_ingredients: "Ingredients/Ingredient Categories:",
  add_recipe_ingredient: "Press Enter to Add",
  recipe_steps: "Instructions:",
};

export default en;
