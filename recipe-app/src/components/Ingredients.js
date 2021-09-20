const Ingredients = ({ingredients}) => (
    <div>
        {ingredients.map(ingredient => (
            <div className="ingredients" key={ingredient.name}>{ingredient.name}</div>
        ))}
    </div>
);

export default Ingredients;
