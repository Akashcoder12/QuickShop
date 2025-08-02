import axiosInstance  from '../utils/axiosInstance';

export const placeOrder=()=>{
      
    return axiosInstance.post("/orders");
};

export const getMyOrders=()=>{
    return axiosInstance.get("/orders");
}

export const getAllOrders=()=>{
    return axiosInstance.get("/orders/admin/all");
}

export const updateOrderStatus=(orderId,status)=>{
          return axiosInstance.put("/orders/admin/update-status",{orderId,status});
}