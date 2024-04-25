export const ADD_TRANSLATION_TO_HISTORY = 'ADD_TRANSLATION_TO_HISTORY';

export const addTranslationToHistory = (translation) => ({
  type: ADD_TRANSLATION_TO_HISTORY,
  payload: translation,
});
//Действия - это простые объекты, которые описывают, что произошло в приложении. 
//Редукторы - это функции, которые обрабатывают действия и обновляют состояние приложения.