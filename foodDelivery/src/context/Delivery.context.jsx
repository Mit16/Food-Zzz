import { createContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./axiosConfig";

export const DeliveryContext = createContext(null);

const DeliveryContextProvider = ({ children }) => {
  // Shared state for delivery data
  const [token, setToken] = useState(localStorage.getItem("Token") || null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();
  const [deliveredOrders, setDeliveredOrders] = useState([]); // Store delivered orders
  const apiURL = "http://localhost:4000";

  // Fetch earnings
  const fetchEarnings = async () => {
    try {
      // Fetch delivered orders
      const deliveredResponse = await axiosInstance.get(
        "/api/delivery/orders/delivered"
      );

      if (deliveredResponse.data.success) {
        const orders = deliveredResponse.data.orders;
        setDeliveredOrders(orders); // Store delivered orders locally

        // Calculate total earnings
        const earnings = orders.reduce(
          (sum, order) => sum + order.deliveryAmount,
          0
        );

        // Update totalEarnings in the database
        const earningsResponse = await axiosInstance.post(
          "/api/delivery/updateDetails",
          { updateData: { totalEarnings: earnings } }
        );

        if (earningsResponse.data.success) {
          setTotalEarnings(earnings); // Update local state
          toast.success("Earnings updated successfully.");
        } else {
          toast.error(
            earningsResponse.data.message || "Failed to update earnings."
          );
        }
      } else {
        toast.error(
          deliveredResponse.data.message || "Failed to fetch delivered orders."
        );
      }
    } catch (error) {
      console.error("Error in fetchEarnings:", error);
      toast.error("An error occurred while fetching earnings.");
    }
  };

  // Fetch assigned orders
  const fetchAssignedOrders = async () => {
    // const token = localStorage.getItem("Token"); // Retrieve token directly
    if (!token) {
      console.warn("No token found, cannot fetch assigned orders.");
      return;
    }
    try {
      const response = await axiosInstance.get(
        "/api/delivery/getAssignedOrders"
      );

      if (response.data.success) {
        setAssignedOrders(response.data.data);
      } else {
        console.error(
          "Failed to fetch assigned orders:",
          response.data.message
        );
        toast.error(
          response.data.message || "Failed to fetch assigned orders."
        );
      }
    } catch (error) {
      console.error("Error fetching assigned orders:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching assigned orders."
      );
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await axiosInstance.post("/api/delivery/status", {
        orderId,
        orderStatus,
      });

      return response.data; // Return the response data for success/failure handling
    } catch (error) {
      console.error("Error updating order status:", error);
      throw new Error("An error occurred while updating order status.");
    }
  };

  // Signout function
  const Signout = () => {
    localStorage.removeItem("Token");
    setToken("");
    navigate("/");
    setAssignedOrders([]);
  };

  // Signin function
  const Signin = (newToken) => {
    localStorage.setItem("Token", newToken);
    setToken(newToken);
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("Token");
      if (storedToken) {
        setToken(storedToken);
        if (token) {
          await fetchAssignedOrders();
          await fetchEarnings();
        }
      } else {
        console.error("No token found in localStorage!");
      }
    }
    loadData();
  }, []);

  const DeliveryContextValue = {
    assignedOrders,
    token,
    setToken,
    apiURL,
    Signout,
    Signin,
    totalEarnings,
    updateOrderStatus,
    deliveredOrders,
  };

  return (
    <DeliveryContext.Provider value={DeliveryContextValue}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContextProvider;