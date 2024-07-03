const es = {
  // Shopping List
  shopping_list_title: "Lista de compras",
  Groceries: "Comestibles",
  "Non-Grocery Items": "No comestibles",

  // Add item modal
  item_name: "Nombre (requerida):",
  item_desc: "Descripción:",
  category_input: "Categoría:",
  is_grocery: "¿Comestible?",
  is_recurring: "¿Compra recurrente?",
  recurring_info:
    "Las compras recurrentes permanecerán en su lista de compras cuando la borre y se marcarán con este ícono:",
  qty: "Cant: ",
  add_item: "Añadir artículo",
  add_item_return: "Añadir artículo y regresar a la lista",
  item_added: "¡Artículo añadido!",
  error_name_exists: "Ya existe un elemento con este nombre.",
  error_empty_name: "El nombre del elemento no puede estar vacío.",

  // List items
  uncategorized: "Sin categoría",
  use_by: "Usar por: ",

  // Change category modal
  category: "Categoría",
  save: "Confirmar",
  category_updated: "¡Categoría actualizada!",
  error_category:
    "Ingrese el nombre de una categoría existente o deje el campo de categoría en blanco.",

  // Change date modal
  save_date: "Confirmar fecha",
  date_info: "Después de agregar una fecha, puedes cambiarla tocándola.",
  date_saved: "¡Fecha actualizada!",

  // Date input
  date_input_label: "Utilizar por fecha (opcional):",
  choose_date: "Elegir una fecha de vencimiento",
  remove_date: "Eliminar fecha",
  date_placeholder: "DD-MM-AA",
  intlDateTime: "{{val, datetime}}",

  // Clear list modal
  clear_list_info_start: "¿Borre su lista de compras?",
  clear_list_info_end:
    "Sus artículos comestibles comprados se moverán a su lista de ingredientes, pero los artículos no comprados y las compras recurrentes permanecerán.",
  yes: "Sí",
  no: "No",
  clear_list_success: "¡Éxito!",

  // Ingredients list
  search: "Búsqueda",
  clear_search: "Borrar búsqueda",

  // Add ingredient modal
  add_ingredient: "Añadir ingrediente",
  add_ingredient_return: "Añadir ingrediente y regresar a la Lista",
  error_ingredient_no_name: "El nombre del ingrediente no puede estar vacío.",
  error_ingredient_name_exists: "Ya existe un ingrediente con este nombre.",
  toast_ingredient_added: "¡Ingrediente añadido!",
  expiring_soon: "Expira en 1 semana",
  expired: "Caducada",

  // Delete something modal
  delete: "Borrar",
  item: "Artículo",
  ingredient: "Ingrediente",
  yes_add_to_shopping_list: "Sí, y agregar a la lista de compras",
  delete_category_info:
    "Los ingredientes de esta categoría permanecerán, pero no estarán categorizados.",
  toast_deleted: "eliminado",
  toast_deleted_added_to_shopping_list:
    "Ingrediente eliminado y añadido a la lista de compras.",

  // Settings modal
  notif_switch_label: "Notificaciones: ",
  info_1:
    "El número de días que se le notificará antes de que caduque un ingrediente:",
  info_2: "La hora del día en que se le notificará:",
  error_notifs:
    "Las notificaciones de esta aplicación están deshabilitadas. Habilítelos en la configuración de su dispositivo.",

  // Notifications
  notif_text_singular_one: "Tu {{ingredient_name}} caduca en 1 día.",
  notif_text_singular_more: "Tu {{ingredient_name}} caduca en {{count}} días.",
  notif_text_plural_one: "Tus {{ingredient_name}} caducan en 1 día.",
  notif_text_plural_more: "Tus {{ingredient_name}} caducan en {{count}} días.",

  ingredients_title: "Ingredientes",

  // Recipes
  recipes_title: "Recetas",
  recipe_category: "Categoría",
  delete_recipe_category_info:
    "Las recetas de esta categoría permanecerán, pero no estarán categorizados.",
  sort_recipes_by_ingredients: "Ordenar recetas por ingredientes disponibles:",
  missing_ingredients: "Ingredientes faltantes:",
  in_list: "En la lista de compras",
  missing: "Desaparecida",

  // Add Recipe Modal
  recipe_ingredient: "Ingrediente",
  recipe_ingredients: "Ingredientes:",
  add_recipe_ingredient: "Presione entrar para agregar",
  recipe_steps: "Instrucciones:",
  add_recipe: "Agregar receta",
  add_recipe_return: "Agregar receta y regresar a la lista",
  error_recipe_no_name: "El nombre de la receta no puede estar vacío.",
  error_recipe_name_exists: "Ya existe una receta con este nombre.",
  recipe_added: "¡Receta agregada!",
  save_recipe_changes: "Guardar cambios",
  toast_recipe_updated: "¡Receta actualizada!",
  add_recipe_ingredients:
    "Agregue los ingredientes faltantes \n a la lista de compras",
  toast_added_missing_ingredients: "¡Éxito!",
};

export default es;
