import { createAction, createReducer } from '@reduxjs/toolkit';

import chats from '../data/users.json';

// actions (from Dispatch)
export const filterList = createAction('filterList');
export const addMessage = createAction('addMessage');

// selectors
export const getChatsList = state => state.chats.users;
export const getFilterName = state => state.chats.filter;

const initialState = {
  users: chats,
  filter: '',
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(filterList, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(addMessage, (state, action) => {
      const { id, msgText, date, chatId } = action.payload;
      const idx = state.users.findIndex(item => item.id === chatId);
      state.users[idx].messages.push({ id, msgText, date });
      const user = state.users.find(el => el.id === chatId);
      state.users.splice(idx, 1);
      state.users.unshift(user);
    });
});

export default reducer;
