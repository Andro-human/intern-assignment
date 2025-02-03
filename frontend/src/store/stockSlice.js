import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  const response = await axios.get('http://localhost:3000/api/stocks');
  return response.data;
});

export const fetchStockData = createAsyncThunk('stocks/fetchStockData', async ({ stockId, duration }, { dispatch }) => {
    const pollData = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/stocks/${stockId}`, { duration });
        if (response?.data?.status === 'COMPLETE') {
            return response.data;
        }
        return new Promise(resolve => {
            setTimeout(() => resolve(pollData()), 2000);
          });
      } catch (error) {
        console.error('Error fetching stock data:', error);
        return lastData; 
      }
    };
  
    const result = await pollData();
    return result;
  });
  

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
        state.availableDurations = state.stocks.find(stock => stock.id === action.payload)?.available || [];
      },
      setDuration: (state, action) => {
        state.selectedDuration = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchStocks.fulfilled, (state, action) => {
          state.stocks = action.payload;
        })
        .addCase(fetchStockData.fulfilled, (state, action) => {
          state.data[state.selectedStock] = action.payload;
        });
    },
  });
  
  export const { selectStock, setDuration } = stockSlice.actions;
  export default stockSlice.reducer;
