import {createStore} from 'redux'

// const MEMBER = 'MEMBER'
const INIT_STATE = {mobile:'', token:''}
const memberReducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                mobile: action.payload.mobile,
                token: action.payload.token,
            };
        case 'CLEAR':
            return {
                mobile: '',
                token:'',
            };

        default :
            return state
    }

}


const store = createStore(memberReducer)

export default store


