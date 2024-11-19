import { actionType } from "../constants";

const categoryReducer = (state, action) => {
        console.log("Action received:", action);
      
        switch (action.type) {
          case "GET_CATEGORIES_START":
            console.log("Starting to fetch categories...");
            return {
              ...state,
              categoryLoading: true,
            };
          case "GET_CATEGORIES_SUCCESS":
            console.log("Categories fetched successfully:", action.payload);
            return {
              ...state,
              categoryLoading: false,
              categories: action.payload,
            };
          case "GET_CATEGORIES_FAILURE":
            console.error("Error fetching categories:", action.payload);
            return {
              ...state,
              categoryLoading: false,
              categoryError: true,
              categoryErrorMsg: action.payload,
            };
          default:
            return state;
        }
        
      };

export default categoryReducer;