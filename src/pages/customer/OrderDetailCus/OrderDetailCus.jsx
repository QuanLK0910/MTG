import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../../APIcontroller/API';
import './OrderDetailCus.css';
import Header from '../../../components/Header/header';
import FeedbackModal from '../../../components/FeedbackModal/FeedbackModal';
import { useAuth } from '../../../context/AuthContext'; 

const OrderDetailCus = () => {
  const [orderData, setOrderData] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { orderId } = useParams(); // Assuming you're using react-router and have the orderId in the URL
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!user || !user.accountId) {
          console.error('User information not available');
          return;
        }
        const data = await getOrderDetails(orderId, user.accountId); // Pass accountId
        setOrderData(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, user]);

  // Add simple formatting functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      0: 'Đang chờ',
      1: 'Đã thanh toán',
      2: 'Đã thất bại',
      4: 'Hoàn thành'
    };
    return statusMap[status] || 'Unknown';
  };

  const getTaskStatusLabel = (statusTask) => {
    const taskStatusMap = {
      0: 'Đang chờ',
      1: 'Đang bàn giao',
      2: 'Từ chối',
      3: 'Đang thực hiện',
      4: 'Hoàn thành',
      5: 'Thất bại'
    };
    return taskStatusMap[statusTask] || 'Unknown';
  };

  const getTaskStatusClass = (statusTask) => {
    const statusClassMap = {
      0: 'status-waiting',
      1: 'status-transferring',
      2: 'status-rejected',
      3: 'status-in-progress',
      4: 'status-completed',
      5: 'status-failed'
    };
    return statusClassMap[statusTask] || '';
  };


  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      // Here you would call your API to submit the feedback
      console.log('Feedback submitted:', feedbackData);
      // Add your API call here
      // await submitFeedback(feedbackData);
      
      // Show success message
      alert('Cảm ơn bạn đã gửi đánh giá!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
    }
  };

  if (!orderData) return <div>Loading...</div>;

  return (
    <div className="odc-container">
      <Header />
      <h2 style={{textAlign: 'center'}}>Chi tiết đơn hàng #{orderData.orderId}</h2>
      <div className="odc-info-container">
      {orderData.status === 4 && (
              <button 
                className="odc-feedback-btn"
                onClick={() => setShowFeedbackModal(true)}
              >
                Gửi đánh giá
              </button>
            )}
        <div className="odc-info">
          <div className="odc-info-group">
            <p><strong>Ngày đặt:</strong> {formatDate(orderData.orderDate)}</p>
            <p><strong>Thời gian thực hiện:</strong> {formatDate(orderData.orderDate)} - {formatDate(orderData.expectedCompletionDate)}</p>
            <p><strong>Trạng thái:</strong> <span className={`odc-status odc-status-${orderData.status}`}>{getStatusLabel(orderData.status)}</span></p>
           
          </div>
        </div>
        
        <div className="odc-services-list">
          <h3>Dịch vụ đã đặt</h3>
          {orderData.orderDetails.map((detail) => (
            <div key={detail.detailId} className="odc-service-card">
              <div className="odc-service-header">
                <h4>{detail.serviceName}</h4>
                <span className="odc-price">{formatPrice(detail.orderPrice)} VNĐ</span>
              </div>
              <p className="odc-martyr-name"><strong>Liệt sĩ:</strong> {detail.martyrName}</p>
              <p><strong>Trạng thái công việc:</strong> 
                <span className={`odc-status ${getTaskStatusClass(detail.staffs?.length === 0 ? 0 : detail.statusTask)}`}>
                  {detail.staffs?.length === 0 ? 'Đang chờ' : getTaskStatusLabel(detail.statusTask)}
                </span>
              </p>
              <div className="odc-staff-list">
                <strong>Nhân viên thực hiện:</strong>
                {detail.staffs && detail.staffs.length > 0 ? (
                  detail.staffs.map((staff) => (
                    <span key={staff.accountId} className="odc-staff-name">
                      {staff.staffFullName}
                    </span>
                  ))
                ) : (
                  <span className="odc-staff-name">Đang chờ phân công</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="odc-order-total">
          <h3>Tổng tiền: {formatPrice(orderData.totalPrice)} VNĐ</h3>
        </div>
      </div>
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        orderId={orderId}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default OrderDetailCus;