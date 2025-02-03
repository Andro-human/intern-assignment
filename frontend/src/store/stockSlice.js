import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  const response = await axios.get('http://localhost:3000/api/stocks');
  return response.data;
});

export const fetchStockData = createAsyncThunk(
  'stocks/fetchStockData',
  async ({ stockId, duration }, { dispatch, getState }) => {
    let lastData = getState().stock.data[stockId] || null; // Get the last known data from Redux store

    const pollData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/stocks/${stockId}`,
          { duration }
        );

        if (response?.data?.status === 'COMPLETE') {
          return response.data;
        } else {
          dispatch(updateStockData({ stockId, data: response.data }));

          lastData = response.data; 

          return new Promise((resolve) => {
            setTimeout(() => resolve(pollData()), 2000); 
          });
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        return lastData;
      }
    };

    return await pollData();
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    stocks: [],
    selectedStock: null,
    availableDurations: [],
    selectedDuration: '',
    data: {}, 
  },
  reducers: {
    selectStock: (state, action) => {
      state.selectedStock = action.payload;
      state.availableDurations = state.stocks.find(
        (stock) => stock.id === action.payload
      )?.available || [];
    },
    setDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
    updateStockData: (state, action) => {
      const { stockId, data } = action.payload;
      if (!state.data[stockId]) {
        state.data[stockId] = data; 
      } else {
        state.data[stockId] = {
          ...state.data[stockId],
          ...data,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        // Finalize the data once polling is complete
        state.data[state.selectedStock] = action.payload;
      });
  },
});

export const { selectStock, setDuration, updateStockData } = stockSlice.actions;
export default stockSlice.reducer;
