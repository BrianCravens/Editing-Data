import apiActions from "./api.js"
import events from "./events.js"
import render from "./dom.js"

// Invoke the method that attaches the event listener
events.registerDeleteListener()
events.registerSave()

// Get all recipes from API and render them in the DOM
apiActions.getAllRecipes().then(render)

