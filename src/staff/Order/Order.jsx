import { useEffect, useState } from "react";
import '../Order/Order.css';
const DataEntryForm = () => {
    const [formData, setFormData] = useState({
        plantType: '',
        quantity: '',
        note: '',
    });
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulated API call - replace with your actual API endpoint
        const fetchPlants = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await fetch('your-api-endpoint');
                const data = await response.json();
                setPlants(data);
            } catch (error) {
                console.error('Error fetching plants:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlants();
    }, []);
    // Mock data - remove when connecting to real API
    useEffect(() => {
        const mockPlants = [
            { id: 1, name: 'Hạt dẻ cứng', status: 'active' }
        ];
        setPlants(mockPlants);
        setLoading(false);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your actual API endpoint
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful submission
                setFormData({
                    plantType: '',
                    quantity: '',
                    note: '',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    if (loading) {
        return <div className="loading">Loading...</div>
    }
    return (
        <div className="data-entry-container">
            <div className="sidebar">
                <div className="logo">AN NHIEN</div>
                <nav className="nav-menu">
                    <ul>
                        <li className="active">
                            <i className="icon">🏠</i>
                            Trang chủ
                        </li>
                        <li>
                            <i className="icon">📊</i>
                            Báo cáo
                        </li>
                        <li>
                            <i className="icon">📝</i>
                            Đăng ký chăm sóc
                        </li>
                        <li>
                            <i className="icon">🌿</i>
                            Thông tin cây xanh
                        </li>
                        <li>
                            <i className="icon">⚙️</i>
                            Cấu hình
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <header className="content-header">
                    <h1>Nội dung - Tên nội dung quang tràm (chiều cao - 18)</h1>
                </header>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Loại cây:</label>
                            <div className="input-with-icon">
                                <img
                                    src="/path-to-plant-icon.png"
                                    alt="Plant"
                                    className="plant-icon"
                                />
                                <select name="plantType"
                                    value={formData.plantType}
                                    onChange={handleChange}>
                                    <option value="">Chọn loại cây</option>
                                    {plants.map(plant => (
                                        <option key={plant.id} value={plant.id}>
                                            {plant.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Số lượng:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Nhập số lượng"
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái:</label>
                            <div className="status-display">Đúng tiến độ</div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                Lưu lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default DataEntryForm;