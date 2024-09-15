export async function fetchRecipes(searchValue = null) {
    try {
        const response = await fetch('/data/recipes.json');
        const recipes = await response.json();
        console.log('recipesRespo: ', recipes);

        if (searchValue && searchValue.length >= 3) {
            return searchRecipes(recipes, searchValue);
        }
        
        return recipes;
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes: ', error);
    }
}

export function searchRecipes(recipes, searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseSearchValue)) ||
            recipe.appliance.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(lowerCaseSearchValue))
        );
    });
}

export function getFilteredUniqueItems(recipes, elementsToFilter, element = null, array = false) {
    const itemsSet = new Set();

    if (array) {
        recipes.forEach(recipe => {
            recipe[elementsToFilter].forEach(item => {
                itemsSet.add(element === null ? item : item[element]);
            });
        });
    } else {
        recipes.forEach(recipe => {
            itemsSet.add(recipe[elementsToFilter]);
        });
    }

    return itemsSet; // Retourne les éléments uniques grâce à la méthode Set();
}

export function addOptionsToSelect(itemsSet, elementSelected) {
    itemsSet.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        elementSelected.appendChild(option);
    });
}