import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockData } from "../store/stockSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Loader } from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StockGraph = () => {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stock.selectedStock);
  const selectedDuration = useSelector((state) => state.stock.selectedDuration);
  const data = useSelector((state) => state.stock.data[selectedStock] || []);
  console.log("Darta", data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedStock && selectedDuration) {
      setLoading(true);
      dispatch(
        fetchStockData({ stockId: selectedStock, duration: selectedDuration })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, selectedStock, selectedDuration]);

  if (!selectedStock) return <p>Select a stock to view data.</p>;
  if (loading) return <Loader />;
  if (!data || data.length === 0) return <p>No Data Available</p>;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const chartData = {
    labels: data.data.map((point) => formatDate(point.timestamp)),
    datasets: [
      {
        label: "Stock Price",
        data: data.data.map((point) => point.price),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default StockGraph;
