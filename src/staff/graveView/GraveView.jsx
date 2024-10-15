import { useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import '../graveView/GraveView.css';
export default function GraveViews() {
    const [query, setQuery] = useState('');
    return (
        <div className="grave-view">
            <Sidebar />
            <div className="grave-view-container">
                <h2>Danh sách các mộ bạn quản lý:</h2>
                <h4>Khu vực: K20</h4>
                <div className="search-bar">
                    <input type="text"
                        placeholder="Hinted search text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} >
                    </input>

                </div>
                <table className="grave-table">
                    <thead>
                        <tr>
                            <th>Mã mộ</th>
                            <th>Tên mộ</th>
                            <th>Vị trí mộ</th>
                            <th>Tên thân nhân</th>
                            <th>SĐT người thân</th>
                            <th>Tình trạng mộ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...Array(11)].map((_, idx) => (
                                <tr>
                                    <td>MTG-K20-12-10</td>
                                    <td>Nguyễn Công Trứ</td>
                                    <td>K20-12-10</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>0901283461547</td>
                                    <td>Tốt</td>
                                    <td><button className="action-button">Tạo báo cáo</button></td>
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