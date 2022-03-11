/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CalculationResult } from '../models/CalculationResult';
import { CalculationResultType } from '../models/CalculationResult';

const initialState: CalculationResultType = {
  SH_S: null
};

const CalculationResult = createSlice({
  name: 'CalculationResult',
  initialState,
  reducers: {
    addCalculationResult: (
      state,
      action: PayloadAction<CalculationResultType>,
    ) => ({
      ...state,
      //  フォームで受け取った計算結果を型に入れる必要がある。
      // eslint-disable-next-line
      SH_S: action.payload.SH_S,
    }),
  },
});

export const { addCalculationResult } = CalculationResult.actions;
export default CalculationResult.reducer;
