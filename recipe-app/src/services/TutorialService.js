import axios from "axios";

const getAll = () => {
    return axios.get('api/recipe/recipes/');
};

const get = id => {
    return axios.get(`api/recipe/recipes/${id}/`);
};

const create = data => {
    return axios.post('api/recipe/recipes/', data);
};

const update = (id, data) => {
    return axios.put(`api/recipe/recipes/${id}/`, data);
};

const remove = id => {
    return axios.delete(`api/recipe/recipes/${id}/`);
};

const removeAll = () => {
    return axios.delete('api/recipe/recipes/');
};

const findByTitle = title => {
    return axios.get(`api/recipe/recipes/?name=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};
