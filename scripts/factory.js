export default recipe => `
    <section class="recipe--${recipe.id}">
        <header class="recipe__title">
            ${recipe.title}
        </header>
        <div class="recipe__instructions">
            ${recipe.instructions}
            </div>
        <button id="editRecipe--${recipe.id}">
            Edit Recipe
        </button>
        <button id="deleteRecipe--${recipe.id}">
            Delete Recipe
        </button>
    </section>
    `