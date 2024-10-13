import { useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import '../homePage/HomePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function HomePage() {
    const statuses = [
        { id: 1, count: 10, label: "Đơn cần xác nhận" },
        { id: 2, count: 10, label: "Đơn đang xử lý" },
        { id: 3, count: 10, label: "Đơn đã hoàn thành" },
        { id: 4, count: 10, label: "Đơn đã hủy" }
    ];
    const [tasks, setTasks] = useState([
        { id: 1, name: "Tưới cây khu vực", completed: true },
        { id: 2, name: "Tưới cây khu vực", completed: false },
        { id: 3, name: "Tưới cây khu vực", completed: false },
        { id: 4, name: "Tưới cây khu vực", completed: true },
        { id: 5, name: "Tưới cây khu vực", completed: false },
        { id: 6, name: "Tưới cây khu vực", completed: true },
    ]);
    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };
    const handleEdit = (id) => {
        console.log("Edit task:", id);
    };
    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    const handleSave = () => {
        console.log("Tasks saved:", tasks);
    };
    return (
        <div className="home-page">
            <Sidebar />
            <div className="content">
                <h1>Khu vực: K20</h1>
                <h3>Danh sách việc cần làm: </h3>
                <p>Những việc bạn sẽ phải làm</p>
                <div className="statuses">
                    {
                        statuses.map((status) => (
                            <div key={status.id} className="status-box">
                                <div className="count">{status.count}</div>
                                <div className="label">{status.label}</div>
                            </div>
                        ))
                    }
                </div>
                <h3>Công việc hằng ngày:</h3>
                <div className="task-list-container">
                    <div className="task-list">
                        {
                            tasks.map(task => (
                                <div key={task.id} className="task-row">
                                    <input type="checkbox" checked={task.completed}
                                        onChange={() => toggleTask(task.id)} />
                                    <span className="task-name">{task.name}</span>
                                    <FontAwesomeIcon className="task-action" icon={faEdit} onClick={() => handleEdit(task.id)} />
                                    <FontAwesomeIcon className="task-action" icon={faTrashAlt} onClick={() => handleDelete(task.id)} />
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <span className="task-name">{task.name}</span>
                                    <FontAwesomeIcon className="task-action" icon={faEdit} onClick={() => handleEdit(task.id)} />
                                    <FontAwesomeIcon className="task-action" icon={faTrashAlt} onClick={() => handleDelete(task.id)} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button className="save-button" onClick={handleSave}>Lưu</button>
            </div>
        </div>
    )
}