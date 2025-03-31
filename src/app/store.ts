import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveState {
    activeId: string | null;
}

const initialState: ActiveState = { activeId: null };

const activeSlice = createSlice({
    name: "active",
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<string | null>) => {
            state.activeId = action.payload;
        },
    },
});

export const { setActive } = activeSlice.actions;

const store = configureStore({
    reducer: {
        active: activeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
