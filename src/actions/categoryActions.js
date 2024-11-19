import { actionType } from "../constants/index";
import axios from "../api/axios";

export const getCategoriesList = async(dispatch) => {
    dispatch({ type: actionType.CATEGORY_LIST_REQUEST });
    try{
        const { data } = await axios.get('products/categories');
        dispatch({ type: actionType.CATEGORY_LIST_SUCCESS, payload: data })
    } catch(error) {
        dispatch({
            type: actionType.CATEGORY_LIST_FAIL,
            payload: error.message
        });
    }
    console.log("Fetching categories in getCategoriesList..."); // Лог вызова функции
    try {
      const response = await fetch("/api/categories"); // Пример API-запроса
      const data = await response.json();
      console.log("Fetched data:", data); // Лог результата запроса
      dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch({ type: "GET_CATEGORIES_FAILURE", payload: error });
    }
    try {
        const response = await fetch('http://localhost:5173/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
      }
};

export const getCategoryProducts = async(dispatch, categoryKey) => {
    dispatch({type: actionType.CATEGORY_PRODUCT_REQUEST});
    try{
        const { data } = await axios.get(`products/category/${categoryKey}`);
        dispatch({ 
            type : actionType.CATEGORY_PRODUCT_SUCCESS, payload: data.products
        });
    } catch(error){
        dispatch({
            type: actionType.CATEGORY_PRODUCT_FAIL, 
            payload: error.message
        });
    }
};