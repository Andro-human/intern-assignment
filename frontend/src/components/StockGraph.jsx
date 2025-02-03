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
import { Grid2, Typography } from "@mui/material";

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
  if (!data || data.length === 0) return <p>No Data Available</p>;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const chartData = (label, dataKey, color) => ({
    labels: data.data.map((point) => formatDate(point.timestamp)),
    datasets: [
      {
        label,
        data: data.data.map((point) => point[dataKey]),
        borderColor: color,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  });

  return (
    <Grid2
      container
      style={{
        alignItem: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      <Grid2
        item
        xs={12}
        sm={6}
        style={{ border: "2px black solid", padding: "1rem" }}
      >
        <Typography variant="h6" gutterBottom>
          Price Graph
        </Typography>
        <Line
          data={chartData("Stock Price", "price", "blue")}
          height={150}
          width={400}
        />
      </Grid2>

      <Grid2
        item
        xs={12}
        sm={6}
        style={{ border: "2px black solid", padding: "1rem" }}
      >
        <Typography variant="h6" gutterBottom>
          Change Graph
        </Typography>
        <Line
          data={chartData("Change", "change", "green")}
          height={150}
          width={400}
        />
      </Grid2>

      <Grid2
        item
        xs={12}
        sm={6}
        style={{ border: "2px black solid", padding: "1rem" }}
      >
        <Typography variant="h6" gutterBottom>
          Change Graph
        </Typography>
        <Line
          data={chartData("Volume", "volume", "orange")}
          height={150}
          width={400}
        />
      </Grid2>
    </Grid2>
  );
};

export default StockGraph;
