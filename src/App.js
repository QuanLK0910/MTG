import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Change Switch to Routes
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROLES } from "./utils/auth";
import Dashboard from "./admin/dashBoard/dashboard"; // Import your components
import OrderList from "./admin/phanViecDonHang/OrderList";
import StaffManagement from "./admin/StaffManager/StaffManagement";
import GraveView from "./admin/graveView/GraveView";
import PayManagement from "./admin/payManagement/payManagement";
import FeedbackManagement from "./admin/feedbackManagement/FeedbackManagement";
import TaskList from "./admin/taskList/TaskList";
import AccountManagement from "./admin/accountManagement/accountManagement";
import TaskDescription from "./admin/taskDescription/TaskDescription";
import GraveDetail from "./admin/graveDetail/GraveDetail";
import OrderDetail from "./admin/orderDetail/OrderDetai";
import AddTask from "./admin/addTask/AddTask";
import HomePage from "./customer/homePage/homePage";
import ServicePage from "./customer/ServicePage/ServicePage";
import CheckOut from "./customer/CheckOutPage/CheckOut";
import CartPage from "./customer/CartPage/cartPage";
import ServiceDetailPage from "./customer/ServiceDetailPage/ServiceDetailPage";
import Login from "./customer/Login/Login";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* customer */}
          <Route path="/" element={<HomePage />} />
          {/* customer */}
          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRole={ROLES.CUSTOMER}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/dichvu" element={<ServicePage />} />
          <Route path="/chitietdichvu/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/checkout" element={<CheckOut />} />
          {/* admin */}
          <Route path="/danhsachaccount" element={<AccountManagement />} />
          <Route path="/danhsachdonhang" element={<OrderList />} />
          <Route path="/danhsachnhanvien" element={<StaffManagement />} />
          <Route path="/danhsachmo" element={<GraveView />} />
          <Route path="/danhSachCongViec" element={<TaskList />} />
          <Route path="/danhsachthanhtoan" element={<PayManagement />} />
          <Route
            path="/danhsachphannhoikhachhang"
            element={<FeedbackManagement />}
          />
          <Route path="/chitietcongviec" element={<TaskDescription />} />
          <Route path="/chitietmo" element={<GraveDetail />} />
          <Route path="/chitietdonhang" element={<OrderDetail />} />
          <Route path="/taoCongViec" element={<AddTask />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
