import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import expenseService from "../api/expenseService";

// const dataPie = [
//   { name: "Rent", value: 400 },
//   { name: "Groceries", value: 300 },
//   { name: "Utilities", value: 200 },
//   { name: "Entertainment", value: 100 },
// ];

// const dataBar = [
//   { month: "Jan", expense: 1200 },
//   { month: "Feb", expense: 1100 },
//   { month: "Mar", expense: 1400 },
//   { month: "Apr", expense: 1300 },
//   { month: "May", expense: 1500 },
//   { month: "Jun", expense: 1600 },
//   { month: "Jul", expense: 1700 },
//   { month: "Aug", expense: 1500 },
//   { month: "Sep", expense: 1400 },
//   { month: "Oct", expense: 1300 },
//   { month: "Nov", expense: 1200 },
//   { month: "Dec", expense: 1600 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Stats = () => {
  const [dataPie, setDataPie] = useState([]);
  const [dataBar, setDataBar] = useState([]);

  useEffect(() => {
    async function getMonthlyExpense() {
      try {
        const response = await expenseService.getMonthlyExpenses();
        setDataPie(response.data);
      } catch (error) {
        console.log("Error fetching monthly expenses:", error);
      }
    }
    async function getYearlyExpense() {
      try {
        const response = await expenseService.getYearlyExpenses();
        setDataBar(response.data);
      } catch (error) {
        console.log("Error fetching yearly expenses:", error);
      }
    }
    getMonthlyExpense();
    getYearlyExpense();
  }, []);

  return (
    <div className="font-clashDisplay p-4">
      <h2 className="text-2xl font-bold text-center">
        Monthly Expense Overview
      </h2>
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">
          {/* Pie Chart for Category-wise Expenses */}
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="category"
                >
                  {dataPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center mt-2">Category-wise Expenses</p>
          </div>

          {/* Bar Chart for Monthly Expenses */}
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataBar}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center mt-2">Monthly Expenses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
