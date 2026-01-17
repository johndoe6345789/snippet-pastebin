import { configureStore } from '@reduxjs/toolkit'
import snippetsReducer from './slices/snippetsSlice'
import namespacesReducer from './slices/namespacesSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    snippets: snippetsReducer,
    namespaces: namespacesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
