import recipes from "./dom.js"

export default {
    deleteRecipe (recipeId) {
        return fetch(`http://localhost:8088/recipes/${recipeId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    },
    getAllRecipes () {
        return fetch("http://localhost:8088/recipes")
            .then(response => response.json())
    },
    

    
}
