import React, { useState, useEffect } from "react";
import RecipeDataService from "../services/RecipeService";
import { Link } from "react-router-dom";
import Ingredients from "./Ingredients";

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveRecipes();
    }, []);

    const onChangeSearchTitle = event => {
        const searchTitle = event.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveRecipes = () => {
        RecipeDataService.getAll()
            .then(response => {
                console.log('retrieveRecipes :> ' + JSON.stringify(response.data));
                setRecipes(response.data);
            });
    };

    const refreshList = () => {
        retrieveRecipes();
        setCurrentRecipe(null);
        setCurrentIndex(-1);
    };

    const setActiveRecipe = (recipe, index) => {
        setCurrentRecipe(recipe);
        setCurrentIndex(index);
    };

    const removeRecipe = () => {
        console.log('Removing recipe ' + currentRecipe.id);
        RecipeDataService.remove(currentRecipe.id)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByRecipe = () => {
        RecipeDataService.findByRecipe(searchTitle)
            .then(response => {
                setRecipes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByRecipe}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Recipes List</h4>

                <ul className="list-group">
                    {recipes &&
                    recipes.map((recipe, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveRecipe(recipe, index)}
                            key={index}
                        >
                            {recipe.name}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeRecipe}
                >
                    Remove Selected Recipe
                </button>
            </div>
            <div className="col-md-6">
                {currentRecipe ? (
                    <div>
                        <h4>Recipe</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentRecipe.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentRecipe.description}
                        </div>
                        <div>
                            <label>
                                <strong>Ingredients:</strong>
                            </label>{" "}
                            <Ingredients ingredients={currentRecipe.ingredients} />
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentRecipe.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/recipes/" + currentRecipe.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Recipe...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipesList;
