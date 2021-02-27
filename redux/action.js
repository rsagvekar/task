import axios from 'axios';
import { BASE_URL } from '../config';
import {useState} from 'react';

export const getBooks = () => {
    
    try {
        return async dispatch => {

            // fetch('https://testffc.nimapinfotech.com/testdata.json',)
            //     .then((response) => response.json())
            //     .then((json) => setData(json.data.Records))
            //     .catch((error) => console.error(error))
 
            const response = await axios.get(`${BASE_URL}`);
            if (response.data) {
                dispatch({
                    type: GET_BOOKS,
                    payload: response.data.data.Records
                });
                console.log('Data: ', response.data.data.Records);
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }
};

export const addBookmark = book => dispatch => {
    dispatch({
        type: ADD_TO_BOOKMARK_LIST,
        payload: book
    });
};

export const removeBookmark = book => dispatch => {
    dispatch({
        type: REMOVE_FROM_BOOKMARK_LIST,
        payload: book
    });
};
export const GET_BOOKS = 'GET_BOOKS';
export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';