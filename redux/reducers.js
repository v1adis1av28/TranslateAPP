import { ADD_TRANSLATION_TO_HISTORY } from './actions';

const initialState = {
  translationHistory: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSLATION_TO_HISTORY:
      return {
        ...state,
        translationHistory: [action.payload, ...state.translationHistory],
      };
    default:
      return state;
  }
};

export default rootReducer;
