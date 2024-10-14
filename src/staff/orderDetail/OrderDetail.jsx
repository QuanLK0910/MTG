import '../orderDetail/OrderDetail.css';
import logo from '../../assets/logo/cay-bach1.jpg';
import Sidebar from '../../components/Sidebar/sideBar';
export default function OrderDetails() {
    return (
        <div className="order-detail">
            <Sidebar />
            <div className='order-details'>
                <h3>Mộ phần</h3>
                <p>Họ và Tên: Chu Ngọc Quang Vinh ( K07 - 23 )</p>
                <div className="order-service">
                    <h3>Dịch vụ:</h3>
                    <div className="service-info">
                        <img src={logo} alt="Service Icon" />
                        <div>
                            <p>Thay cây ở mộ</p>
                            <p>Loại: Cây bách</p>
                        </div>
                        <div className="service-quantity">
                            <h3>Số lượng</h3>
                            <p>2</p>
                        </div>
                        <div className="service-status">
                            <h3>Trạng thái</h3>
                            <p>Đã xác nhận</p>
                        </div>
                        <button className="complete-btn">Hoàn Thành</button>
                        <input type="text" placeholder="Ghi chú" className="note-input" />
                    </div>
                </div>
                <div className="order-status">
                    <h1>CẬP NHẬT TÌNH TRẠNG ĐƠN HÀNG</h1>
                    <p>Đơn hàng đã được tạo (12:15 12/09/2024)</p>
                    <p>Đơn hàng đã được xác nhận (15:20 12/09/2024)</p>
                </div>
                <div className="order-summary">
                    <p>Đơn giá: 150.000đ</p>
                    <p>Số lượng: 2</p>
                    <p>Tổng tiền hàng: 300.000đ</p>
                    <p>Tổng giảm giá: -0đ</p>
                    <p className="total">Tổng thanh toán: 300.000đ</p>
                </div>
            </div>
        </div>
    )
}