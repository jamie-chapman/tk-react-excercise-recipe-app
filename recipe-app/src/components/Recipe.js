import React, { useState, useEffect } from "react";
import RecipeDataService from "../services/RecipeService";

const Recipe = props => {
    const initialRecipeState = {
        id: null,
        title: "",
        description: "",
        ingredients: [],
        published: false
    };

    const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
    const [message, setMessage] = useState("");

    const getRecipe = id => {
        RecipeDataService.get(id)
            .then(response => {
                setCurrentRecipe(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getRecipe(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentRecipe({ ...currentRecipe, [name]: value });
    };


    const updatePublished = status => {
        var data = {
            id: currentRecipe.id,
            title: currentRecipe.title,
            description: currentRecipe.description,
            published: status
        };

        RecipeDataService.update(currentRecipe.id, data)
            .then(response => {
                setCurrentRecipe({ ...currentRecipe, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateRecipe = () => {
        RecipeDataService.update(currentRecipe.id, currentRecipe)
            .then(response => {
                console.log(response.data);
                setMessage("The recipe was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteRecipe = () => {
        RecipeDataService.remove(currentRecipe.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/recipes");
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div>
            {currentRecipe ? (
                <div className="edit-form">
                    <h4>Recipe</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentRecipe.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentRecipe.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentRecipe.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentRecipe.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteRecipe}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateRecipe}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Recipe...</p>
                </div>
            )}
        </div>
    );
}

export default Recipe;
