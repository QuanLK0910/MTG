import { useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import '../orderList/OrderList.css';
export default function HistoryOrder() {
    const [orders] = useState([
        { id: 1, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 2, status: 'Đang xử lý' },
        { id: 2, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 2, status: 'Đã xác nhận' },
        { id: 3, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 2, status: 'Đã hoàn thành' },
        { id: 4, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 2, status: 'Đã xác nhận' },
        { id: 5, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 2, status: 'Đã xác nhận' },
        { id: 6, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 1, status: 'Đã xác nhận' },
        { id: 7, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K37 - 63', quantity: 1, status: 'Đã xác nhận' },
        { id: 8, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K09 - 34', quantity: 2, status: 'Đã xác nhận' },
        { id: 9, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K09 - 34', quantity: 1, status: 'Đã xác nhận' },
        { id: 10, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K09 - 34', quantity: 2, status: 'Đã xác nhận' },
        { id: 11, service: 'Hoa', type: 'Thay hoa ở mộ', customer: 'Nguyễn Văn A', location: 'K09 - 34', quantity: 1, status: 'Đã xác nhận' },
    ]);
    return (
        <div className="order-page">
            <Sidebar />
            <div className="order-content">
                <h2>Đơn hàng</h2>
                <div className="filter-section">
                    <button className="filter-button active">Tất cả</button>
                    <button className="filter-button">Đơn hàng chưa xác nhận</button>
                    <button className="filter-button">Đơn hàng đã xác nhận</button>
                    <button className="filter-button">Đơn hàng đã hoàn thành</button>
                </div>
                <div className="date-filter">
                    <label>Từ ngày: </label>
                    <input type="date" value="21/09/2024" />
                    <label>Đến ngày: </label>
                    <input type="date" value="21/09/2024" />
                </div>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Loại dịch vụ</th>
                            <th>Tên dịch vụ</th>
                            <th>Tên khách hàng</th>
                            <th>Vị trí mộ</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.service}</td>
                                    <td>{order.type}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.location}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.status}</td>
                                    <td><button className="detail-button">Chi tiết</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="pagination">
                    <span>&lt;</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>...</span>
                    <span>&gt;</span>
                </div>
            </div>
        </div>
    )
}