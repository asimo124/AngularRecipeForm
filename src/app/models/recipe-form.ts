
export class Ingredient {
  id: number;
  title: string;
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
  lastDateMade: Date;
  containsSalad: boolean;
  containsGluten: boolean;
  proteinId: number;
  difficultyLevelId: number;
  isHomeChef: boolean;
  isEasy: boolean;
  riRecipeIngredients?: RecipeIngredients[];
}
