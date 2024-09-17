import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import smoothScrollbarReducer from './smooth-scrollbar/smoothScrollbarSlice';
import vimeoReducer from './vimeoSlice'; // Vimeo reducer'ını import ediyoruz
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localStorage olarak kullanılır

// Redux Persist yapılandırması
const persistConfig = {
    key: 'root',    // persist edilecek root anahtarı
    storage,        // localStorage'ı kullanıyoruz
    whitelist: ['vimeo'], // Sadece 'vimeo' reducer'ını persist ediyoruz
};

// Persist edilmiş Vimeo Reducer
const persistedVimeoReducer = persistReducer(persistConfig, vimeoReducer);

export const store = configureStore({
    reducer: {
        scrollbar: smoothScrollbarReducer, // Mevcut reducer
        vimeo: persistedVimeoReducer,      // Persist edilmiş vimeo reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Persistor oluşturma (state'i persist etmek için)
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
