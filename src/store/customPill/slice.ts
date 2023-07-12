import { createSlice } from '@reduxjs/toolkit';

import {
  createCustomPill,
  deleteCustomPill,
  duplicateCustomPill,
  fetchCustomPills,
  updateCustomPill,
} from './thunks';
import { TCustomPillState } from './types';

export const CustomPillState: TCustomPillState = {
  isLoading: false,
  customPills: {},
  fetchError: false,
};

const customPillSlice = createSlice({
  name: 'customPill',
  initialState: CustomPillState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchCustomPills.pending, (state) => {
      state.isLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchCustomPills.fulfilled, (state, action) => ({
      ...state,
      customPills: { ...state.customPills, ...action.payload },
      isLoading: false,
    }));
    builder.addCase(fetchCustomPills.rejected, (state) => ({
      ...state,
      fetchError: true,
      isLoading: false,
    }));
    // Create
    builder.addCase(createCustomPill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCustomPill.fulfilled, (state, action) => {
      const result: Record<string, any> = {};
      const tag = action.payload.tag;
      result[tag as string] = [...state.customPills[tag as string], action.payload];
      return {
        ...state,
        customPills: { ...state.customPills, ...result },
        isLoading: false,
      };
    });
    // Update
    builder.addCase(updateCustomPill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCustomPill.fulfilled, (state, action) => {
      const result: Record<string, any> = {};
      const tag = action.payload.tag as string;
      const tagCustomPills = [...state.customPills[tag]];
      const tagCustomPillsNoUpdated = tagCustomPills.filter(({ id }) => action.payload.id !== id);
      result[tag] = [...tagCustomPillsNoUpdated, action.payload];

      return {
        ...state,
        customPills: { ...state.customPills, ...result },
        isLoading: false,
      };
    });
    builder.addCase(updateCustomPill.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    // Duplicate
    builder.addCase(duplicateCustomPill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(duplicateCustomPill.fulfilled, (state, action) => {
      const result: Record<string, any> = {};
      const tag = action.payload.tag;
      result[tag as string] = [...state.customPills[tag as string], action.payload];
      return {
        ...state,
        customPills: { ...state.customPills, ...result },
        isLoading: false,
      };
    });
    builder.addCase(duplicateCustomPill.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    // Delete
    builder.addCase(deleteCustomPill.fulfilled, (state, action) => {
      const result: Record<string, any> = {};
      const tag = action.payload.tag;
      const originalArray = [...state.customPills[tag as string]];
      result[tag as string] = originalArray.filter(({ id }) => id !== action.payload.id);
      return {
        ...state,
        customPills: { ...state.customPills, ...result },
      };
    });
    builder.addCase(deleteCustomPill.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
  },
});

export const userActions = customPillSlice.actions;
export default customPillSlice.reducer;
