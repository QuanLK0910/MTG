import React, { useState, useEffect } from 'react';
import { updateTaskStatus } from '../../../APIcontroller/API';
import { getTasksByAccountId } from '../../../services/task';
import { useAuth } from '../../../context/AuthContext';
import { ROLES } from '../../../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskList.css'; // You'll need to create this CSS file
import Sidebar from '../../../components/Sidebar/sideBar';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const TaskList = () => {
    // Calculate initial start date (2 days before current date)
    const initialStartDate = new Date();
    initialStartDate.setDate(initialStartDate.getDate() - 3);

    const [tasks, setTasks] = useState([]);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(new Date());
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        if (user?.accountId) {
            console.log('fetching tasks');
            fetchTasks();
        }
    }, [user?.accountId, startDate, endDate, filter]);
    
 
    const fetchTasks = async () => {
        if (user && user.accountId && user.role === ROLES.STAFF) {
            try {
                const response = await getTasksByAccountId(user.accountId);
                console.log('response', response); 
                const transformed = response.tasks.map(tasks => ({
                    id: tasks.taskId,
                    serviceName: tasks.serviceName,
                    serviceDescription: tasks.serviceDescription,
                    graveLocation: tasks.graveLocation,
                    startDate: tasks.startDate,
                    endDate: tasks.endDate,
                    status: tasks.status,
                 
                  }));

                setTasks(transformed);
            
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        } else {
            console.log('User is not logged in or is not a staff member');
        }
    };
    const filteredTasks =  tasks.filter(task => {
        // First check the status filter
        const statusFilter = 
            filter === 'all' ? true :
            filter === 'completed' ? task.status === 4 :
            filter === 'pending' ? [0, 1, 3].includes(task.status) :
            true;

        // Then check the date range
        const taskDate = new Date(task.startDate);
        const isWithinDateRange = taskDate >= startDate && taskDate <= endDate;

        // Return true only if both conditions are met
        return statusFilter && isWithinDateRange;
    });
    

    const handleConfirm = async (taskId) => {
        navigate(`/schedule-staff`);
    };

    const handleReject = async (taskId) => {
        if (!rejectReason.trim()) {
            alert('Vui lòng nhập lý do từ chối');
            return;
        }
        
        try {
            await updateTaskStatus(taskId, 2, rejectReason); // Thêm rejectReason vào API call
            setIsPopupOpen(false);
            setIsRejectPopupOpen(false);
            setRejectReason('');
            fetchTasks();
        } catch (error) {
            console.error('Failed to reject task:', error);
        }
    };

    const handleComplete = async (taskId) => {
        try {
            await updateTaskStatus(taskId, 4); // 4 is the status for "Hoàn thành"
            // Refresh the task list
            fetchTasks();
        } catch (error) {
            console.error('Failed to complete task:', error);
            // Handle the error (e.g., show an error message to the usser)
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 0: return { text: 'Chờ xác nhận', color: '#f39c12' }; // Orange
            case 1: return { text: 'Đã giao, chờ xác nhận', color: '#3498db' }; // Blue
            case 2: return { text: 'Từ chối', color: '#e74c3c' }; // Red
            case 3: return { text: 'Đang thực hiện', color: '#2ecc71' }; // Green
            case 4: return { text: 'Hoàn thành', color: '#27ae60' }; // Dark Green
            case 5: return { text: 'Thất bại', color: '#c0392b' }; // Dark Red
            default: return { text: 'Không xác định', color: '#95a5a6' }; // Gray
        }
    };

    

    const handleViewDetails = (task) => {
        setSelectedTask(task);
        setIsPopupOpen(true);
    };

    const handleDateChange = (date, setDate) => {
        if (date instanceof Date && !isNaN(date)) {
            setDate(date);
        } else {
            console.error('Invalid date selected');
        }
    };

    return (
        <div className="staff-task-list-container">
            <Sidebar />
            <div className="staff-task-list-content">
                <h1 className="staff-task-list-page-title">Quản Lý Công Việc</h1>
                <div className="staff-task-list-filter-section">
                    <button onClick={() => setFilter('all')} className={`staff-task-list-filter-btn ${filter === 'all' ? 'active' : ''}`}>Tất cả</button>
                    <button onClick={() => setFilter('completed')} className={`staff-task-list-filter-btn ${filter === 'completed' ? 'active' : ''}`}>Đã hoàn thành</button>
                    <button onClick={() => setFilter('pending')} className={`staff-task-list-filter-btn ${filter === 'pending' ? 'active' : ''}`}>Chưa hoàn thành</button>
                </div>
                <div className="staff-task-list-date-range">
                    <span>Công việc:</span>
                    <div className="staff-task-list-date-picker">
                        <span>Từ ngày:</span>
                        <DatePicker 
                            selected={startDate} 
                            onChange={date => handleDateChange(date, setStartDate)}
                            maxDate={endDate}
                        />
                    </div>
                    <div className="staff-task-list-date-picker">
                        <span>Đến ngày:</span>
                        <DatePicker 
                            selected={endDate} 
                            onChange={date => handleDateChange(date, setEndDate)}
                            minDate={startDate}
                        />
                    </div>
                </div>
                <table className="staff-task-list-table">
                    <thead>
                        <tr>
                            <th>Công việc</th>
                            <th>Vị trí</th>
                            <th>Thời gian</th>
                            <th>Thời hạn</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.taskId}>
                                <td>{task.serviceName || task.description || 'Không có mô tả'}</td>
                                <td>{task.graveLocation || `MTG-K${task.orderId}D${task.detailId}`}</td>
                                <td>{new Date(task.startDate).toLocaleDateString()}</td>
                                <td>{new Date(task.endDate).toLocaleDateString()}</td>
                                <td>
                                    <span className="status-badge" style={{
                                        backgroundColor: getStatusText(task.status).color,
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '12px',
                                        fontSize: '0.9em',
                                        fontWeight: '500'
                                    }}>
                                        {getStatusText(task.status).text}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="staff-task-list-detail-button" 
                                        onClick={() => handleViewDetails(task)}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isPopupOpen && selectedTask && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className="popup-header">
                                <h2>Chi Tiết Công Việc</h2>
                                <button 
                                    className="close-button"
                                    onClick={() => setIsPopupOpen(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="popup-body">
                                <div className="detail-row">
                                    <label>Công việc:</label>
                                    <span>{selectedTask.serviceName}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Mô tả:</label>
                                    <span>{selectedTask.serviceDescription}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Vị trí:</label>
                                    <span>{selectedTask.graveLocation}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Thời gian:</label>
                                    <span>{new Date(selectedTask.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Thời hạn:</label>
                                    <span>{new Date(selectedTask.endDate).toLocaleDateString()}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Trạng thái:</label>
                                    <span className="status-badge" style={{
                                        backgroundColor: getStatusText(selectedTask.status).color,
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '12px'
                                    }}>
                                        {getStatusText(selectedTask.status).text}
                                    </span>
                                </div>
                            </div>
                            <div className="popup-footer">
                                {(selectedTask.status === 0 || selectedTask.status === 1) && (
                                    <div className="action-buttons">
                                        <button 
                                            className="accept-button"
                                            onClick={() => {
                                                handleConfirm(selectedTask.id);
                                                setIsPopupOpen(false);
                                            }}
                                        >
                                            Chấp nhận
                                        </button>
                                        <button 
                                            className="reject-button"
                                            onClick={() => {
                                                setIsRejectPopupOpen(true);
                                            }}
                                        >
                                            Từ chối
                                        </button>
                                    </div>
                                )}
                                <button 
                                    className="close-popup-button"
                                    onClick={() => setIsPopupOpen(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isRejectPopupOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content reject-reason-popup">
                            <div className="popup-header">
                                <h2>Lý Do Từ Chối</h2>
                                <button 
                                    className="close-button"
                                    onClick={() => {
                                        setIsRejectPopupOpen(false);
                                        setRejectReason('');
                                    }}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="popup-body">
                                <textarea
                                    className="reject-reason-input"
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Nhập lý do từ chối..."
                                    rows={4}
                                />
                            </div>
                            <div className="popup-footer">
                                <button 
                                    className="reject-button"
                                    onClick={() => handleReject(selectedTask.id)}
                                >
                                    Xác nhận từ chối
                                </button>
                                <button 
                                    className="close-popup-button"
                                    onClick={() => {
                                        setIsRejectPopupOpen(false);
                                        setRejectReason('');
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default TaskList;
