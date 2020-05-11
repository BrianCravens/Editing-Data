import apiActions from "./api.js"
import render from "./dom.js"


const createRecipeCard = recipe => `
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
    </section>`

const recipeList = document.querySelector("#recipeList")

const updateFormFields = recipeId => {

    // Get reference to input fields in the form
    const hiddenRecipeId = document.querySelector("#recipeId")
    const recipeTitleInput = document.querySelector("#recipeTitle")
    const recipeInstructionsInput = document.querySelector("#recipeInstructions")

    fetch(`http://localhost:8088/recipes/${recipeId}`)
        .then(response => response.json())
        .then(recipes => {
            /*
                Now that you KNOW you have the data, render
                an editing form that represents the current
                state of the resource.
            */
            hiddenRecipeId.value = recipes.id // Hidden value. User no see. 🙈
            recipeTitleInput.value = recipes.title
            recipeInstructionsInput.value = recipes.instructions
        })
}

export default {
    registerSave(){
    saveRecipe.addEventListener("click", event => {
        const hiddenRecipeId = document.querySelector("#recipeId")
    
        if (hiddenRecipeId.value !== "") {
            editRecipe(hiddenRecipeId.value)
            console.log(hiddenRecipeId.value)
        } else {
            // Save functionality goes here
        }
    })
    
    const editRecipe = id => {
        const updatedObject = {
            title: document.querySelector("#recipeTitle").value,
            instructions: document.querySelector("#recipeInstructions").value
        }
    
        // Logic for the PUT operation
        fetch(`http://localhost:8088/recipes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObject)
        })
        .then(res => res.json())
        .then(() => {
            /*
                Since this is the point in the code where you KNOW
                the operation completed successfully, clear the
                value of the hidden input field to that your
                application is back to the state of creating instead
                of editing
            */
            document.querySelector("#recipeId").value = ""
        })
         .then(apiActions.getAllRecipes)
         .then(render)
    
    }
},
    registerDeleteListener () {
        recipeList.addEventListener("click", event => {
            if (event.target.id.startsWith("deleteRecipe--")) {
                // Extract recipe id from the button's id attribute
                const recipeToDelete = event.target.id.split("--")[1]

                // Invoke the delete method, then get all recipes and render them
                apiActions.deleteRecipe(recipeToDelete)
                    .then(apiActions.getAllRecipes)
                    .then(render)
            }else{
                if (event.target.id.startsWith("editRecipe--")) {
                    const recipeIdToEdit = event.target.id.split("--")[1]

                    updateFormFields(recipeIdToEdit)
                }
            }
        })
    }

    
}
