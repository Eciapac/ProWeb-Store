import {createContext, useEffect, useReducer} from "react";
import rootReducer from "../reducers";
import { getCategoriesList, getCategoryProducts } from "../actions/categoryActions";
import PropTypes from "prop-types";

const initialState = {
    categoryLoading: false,
    categoryError: false,
    categoryErrorMsg: "",
    categories: [],
    categoryProductLoading: false,
    categoryProductError: false,
    categoryProducts: []
}

export const CategoryContext = createContext({});

export const CategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer.category, initialState);

    useEffect(() => {
        getCategoriesList(dispatch);
    }, [dispatch]);


    return (
        <CategoryContext.Provider value = {{
            ...state,
            getCategoriesList,
            getCategoryProducts,
            dispatch
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

CategoryProvider.propTypes = {
    children: PropTypes.node
}
export const getCategoriesLis = async (dispatch) => {
    try {
        dispatch({ type: "GET_CATEGORIES_START" });

        const response = await fetch("https://dummyjson.com/products/categories/"); // Укажите верный URL
        const data = await response.json();

        if (response.ok) {
            dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: data });
        } else {
            dispatch({ type: "GET_CATEGORIES_FAILURE", payload: "Failed to fetch categories" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        dispatch({ type: "GET_CATEGORIES_FAILURE", payload: error.message });
    }
};
