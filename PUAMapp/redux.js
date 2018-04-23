/*
 * redux.js is a component that host Redux, which is a predictable state 
 * container for our app. It provides functions that can talk to Firebase
 * and get information needed.
 */
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import config from "./firebase";
import * as firebase from "firebase";

firebase.initializeApp(config);

// Actions relating to getting murals from database
export const getMuralsStart = () => ({
    type: "GET_MURALS_START"
});

export const getMuralsSuccess = murals => ({
    type: "GET_MURALS_SUCCESS",
    payload: murals
});

export const getMurals = () => {
    return function(dispatch) {
        dispatch(getMuralsStart());

        firebase
            .database()
            .ref("murals")
            .orderByKey()
            .once("value").then(function(snapshot) {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const messages = snapshot.val() || [];

                    dispatch(getMuralsSuccess(messages));
                }, 0);
            });
    };
};

export const getArtistsStart = () => ({
    type: "GET_ARTISTS_START"
});

export const getArtistsSuccess = artists => ({
    type: "GET_ARTISTS_SUCCESS",
    payload: artists
});

export const getArtists = () => {
    return function(dispatch) {
        dispatch(getArtistsStart());

        firebase
            .database()
            .ref("artists")
            .orderByKey()
            .on("value", snapshot => {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const messages = snapshot.val() || [];

                    dispatch(getArtistsSuccess(messages));
                }, 0);
            });
    };
};

// reducers

const initialState = {
    muralsloading: false,
    muralsloaded: false,
    artistsloading: false,
    artistsloaded: false,
    murals: [],
    artists: []
};

const firebaseData = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MURALS_START":
            // return Object.assign({}, state, {
            //              muralsloading: true
            //          });
            return { ...state, muralsloading: true };
        case "GET_MURALS_SUCCESS":
            return Object.assign({}, state, {
                muralsloading: false,
                muralsloaded: true,
                murals: action.payload
            });
        case "GET_ARTISTS_START":
            return Object.assign({}, state, {
                artistsloading: true
            });
        case "GET_ARTISTS_SUCCESS":
            return Object.assign({}, state, {
                artistsloading: false,
                artistsloaded: true,
                artists: action.payload
            });

        default:
            return state;
    }
};

export const reducers = combineReducers({
    firebaseData
});

export const store = createStore(reducers, applyMiddleware(thunk));
