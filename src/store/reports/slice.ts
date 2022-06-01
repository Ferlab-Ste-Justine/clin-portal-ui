import { createSlice, Draft } from '@reduxjs/toolkit';

import { fetchNanuqSequencingReport, fetchTranscriptsReport } from 'store/reports/thunks';
import { TReportState } from 'store/reports/types';

export const ReportState: TReportState = {
  loadingIds: [],
};

const removeId = (state: Draft<TReportState>, id: string) =>
  state.loadingIds.filter((x) => x !== id);

const reportSlice = createSlice({
  name: 'report',
  initialState: ReportState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTranscriptsReport.pending, (state, action) => {
      state.loadingIds.push(action.meta.arg.variantId);
    });
    builder.addCase(fetchTranscriptsReport.rejected, (state, action) => {
      state.loadingIds = removeId(state, action.meta.arg.variantId);
    });
    builder.addCase(fetchTranscriptsReport.fulfilled, (state, action) => {
      state.loadingIds = removeId(state, action.meta.arg.variantId);
    });
    builder.addCase(fetchNanuqSequencingReport.pending, (state, action) => {
      state.loadingIds.push(action.meta.arg.srIds.join('-'));
    });
    builder.addCase(fetchNanuqSequencingReport.rejected, (state, action) => {
      state.loadingIds = removeId(state, action.meta.arg.srIds.join('-'));
    });
    builder.addCase(fetchNanuqSequencingReport.fulfilled, (state, action) => {
      state.loadingIds = removeId(state, action.meta.arg.srIds.join('-'));
    });
  },
});

export const reportActions = reportSlice.actions;
export default reportSlice.reducer;
