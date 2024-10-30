import { useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import '../Task/TaskManagement.css';
export default function TaskManagement() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("all");
    return (
        <div className="task-management">
            <Sidebar />
            <div className="task-management-container">
                <div className="task-filter">
                    <div className="status-filters">
                        <button
                            className={status === 'all' ? 'filter-btn active' : 'filter-btn'}
                            onclick={() => setStatus('all')}>
                            Tất cả
                        </button>
                        <button className={status === 'completed' ?
                            'filter-btn active' : 'filter-btn'}
                            onClick={() => setStatus('completed')}>
                            Đã hoàn thành
                        </button>
                        <button className={status === 'not-completed' ?
                            'filter-btn active' : 'filter-btn'}
                            onClick={() => setStatus('not-completed')}>
                            Đã hoàn thành
                        </button>
                    </div>
                    <div className="date-picker">
                        <h2>Công việc: </h2>
                        <label>Từ ngày: </label>
                        <input type="date" value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} />
                        <label>Đến ngày: </label>
                        <input type="date" value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                <div className="job-row">
                    <div className="job-item">
                        <span className="label">Công việc:</span>
                        <span className="work">QUÉT LÁ</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Vị trí:</span>
                        <span className="value">MTG-KD2016-6</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời gian:</span>
                        <span className="value">21/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời hạn:</span>
                        <span className="value">23/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Trạng thái:</span>
                        <span className="status">Chờ xác nhận</span>
                    </div>
                    <div className="job-item">
                        <button className="confirm-button">XÁC NHẬN</button>
                    </div>
                </div>
                <div className="job-row-2">
                    <div className="job-item">
                        <span className="label">Công việc:</span>
                        <span className="work">QUÉT LÁ</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Vị trí:</span>
                        <span className="value">MTG-KD2016-6</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời gian:</span>
                        <span className="value">21/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời hạn:</span>
                        <span className="value">23/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Trạng thái:</span>
                        <span className="status-2">Gia hạn</span>
                    </div>
                    <div className="job-item">
                        <button className="confirm-button">GIẢI TRÌNH</button>
                    </div>
                </div>
                <div className="job-row-3">
                    <div className="job-item">
                        <span className="label">Công việc:</span>
                        <span className="work">QUÉT LÁ</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Vị trí:</span>
                        <span className="value">MTG-KD2016-6</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời gian:</span>
                        <span className="value">21/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời hạn:</span>
                        <span className="value">23/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Trạng thái:</span>
                        <span className="status-3">Đã từ chối</span>
                    </div>
                    <div className="job-item">
                        <button className="confirm-button">GIẢI TRÌNH</button>
                    </div>
                </div>
                <div className="job-row-4">
                    <div className="job-item">
                        <span className="label">Công việc:</span>
                        <span className="work">QUÉT LÁ</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Vị trí:</span>
                        <span className="value">MTG-KD2016-6</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời gian:</span>
                        <span className="value">21/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Thời hạn:</span>
                        <span className="value">23/09/2024</span>
                    </div>
                    <div className="job-item">
                        <span className="label">Trạng thái:</span>
                        <span className="status-4">Chưa hoàn thành</span>
                    </div>
                    <div className="job-item">
                        <button className="confirm-button">HOÀN THÀNH</button>
                    </div>
                </div>
                <div className="job-row-5">
                    <div className="job-item-1">
                        <span className="label">Công việc:</span>
                        <span className="work">QUÉT LÁ</span>
                    </div>
                    <div className="job-item-1">
                        <span className="label-1">Vị trí:</span>
                        <span className="value-1">MTG-KD2016-6</span>
                    </div>
                    <div className="job-item-1">
                        <span className="label-2">Thời gian:</span>
                        <span className="value-2">21/09/2024</span>
                    </div>
                    <div className="job-item-1">
                        <span className="label-3">Thời hạn:</span>
                        <span className="value-3">23/09/2024</span>
                    </div>
                    <div className="job-item-1">
                        <span className="label-4">Trạng thái:</span>
                        <span className="status-5">Hoàn thành</span>
                    </div>
                </div>
            </div>
        </div>
    )
}