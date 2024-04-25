import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,//Комбинированный редуктор для объединения их всех
});

export default store;
