import Sidebar from "../../components/Sidebar/sideBar";
import lk from '../../assets/logo/memorial.jpg';

export default function GraveDetails() {
    return (
        <div className="grave-detail">
            <Sidebar />
            <div className="grave-details">
                <img src={lk} alt="Grave" className="grave-image" />
                <div className="grave-header">
                    <h3>Thân nhân sở hữu mộ:</h3>
                    <p>Họ và tên: Nguyễn Văn A</p>
                    <p>SĐT người thân: 091239848714</p>
                </div>
                <div className="grave-detail-infor">
                    <h2>Nguyễn Công Trứ</h2>
                    <p>Bí danh:</p>
                    <p>Chức vụ:</p>
                    <p>Ngày sinh: 19-3-1932</p>
                    <p>Quê quán:</p>
                    <p>Huân chương:</p>
                </div>
                <div className="grave-detail-right">
                    <p>Vị trí mộ:</p>
                    <p>Ngày mất:</p>
                    <div className="grave-status-form">
                        <h3>Tình trạng mộ:</h3>
                        <form>
                            <div className="form-row">
                                <label>Loại hoa được trồng: <input type="text" name="flowerType" />
                                </label>
                                <label>Loại cây được trồng: <input type="text" name="treeType" />
                                </label>
                            </div>
                            <div className="form-row">
                                <label>Tình trạng mộ phần: <input type="text" name="graveCondition" />
                                </label>
                            </div>
                            <button type="submit">Sửa tình trạng mộ</button>
                        </form>
                    </div>
                    <div className="service-history">
                        <h3>Lịch sử bảo dưỡng / dịch vụ mộ:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Loại dịch vụ</th>
                                    <th>Nội dung</th>
                                    <th>Nhân viên thực hiện</th>
                                    <th>Số tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...Array(4)].map((_, index) => (
                                        <tr>
                                            <td>20/09/2025</td>
                                            <td>Thay hoa</td>
                                            <td>Thay hoa ở trước mộ thành hoa vạn thọ</td>
                                            <td>Bùi Văn B</td>
                                            <td>5.000.000 vnđ</td>
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
            </div>
        </div>
    )
}