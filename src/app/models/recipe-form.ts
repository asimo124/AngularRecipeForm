
export class Ingredient {
  id: number;
  title: string;
  is_modifying?: boolean;
  ingredient_type_id: number;
}

export class RecipeIngredients {
  id: number;
  recipeId?: number;
  ingredientId?: number;
  ingredient?: Ingredient
}

export class Recipe {
  id: number;
  title: string;
  rating: string;
  last_date_made: Date;
  contains_salad: boolean;
  contains_gluten: boolean;
  protein_id: number;
  difficulty_level_id: number;
  is_homechef: boolean;
  is_easy: boolean;
  recipe_style_id: number;
  taste_level_id: number;
  recipe_link: string;
  riRecipeIngredients?: RecipeIngredients[];
}
