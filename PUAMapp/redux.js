import {
	applyMiddleware,
	combineReducers,
	createStore,
} from 'redux';
import thunk from 'redux-thunk'
import config from './firebase';
import * as firebase from 'firebase';

firebase.initializeApp(config);
//actions
export const getMuralsStart = () => ({
	type: 'GET_MURALS_START'

});

export const getMuralsSuccess = (murals) => ({
	type: 'GET_MURALS_SUCCESS',
	payload: murals
});

export const getMurals = () => {
	    return function (dispatch) {
        dispatch(getMuralsStart());

        firebase.database()
                .ref('murals')
                .orderByKey()
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];

                        dispatch(getMuralsSuccess(messages))
                    }, 0);
                });
    }
}

// reducers

const initialState = {
	loading: false,
	loaded: false,
	murals: []
}


const muralData = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_MURALS_START':
			return Object.assign({}, state, {
                loading: true
            });
		case 'GET_MURALS_SUCCESS':
			return Object.assign({}, state, {
                loading: false,
                loaded: true,
                murals: action.payload
            });

			default: return state;
	}
};

export const reducers = combineReducers({
	muralData
});



export const store = createStore (
		reducers,
		applyMiddleware(thunk),
		
);




