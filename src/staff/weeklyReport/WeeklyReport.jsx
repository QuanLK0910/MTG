import { useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";

export default function WeeklyReport() {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        statusInternal: '',
        statusExternal: '',
        statusOverall: '',
        description: '',
        images: []
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.value);
        setFormData({
            ...formData,
            images: files
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div className="weekly-report-container">
            <Sidebar />
            <h2>Bản báo cáo định kỳ tình trạng mộ</h2>
            <div className="weekly-report">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên mộ: Nguyễn Công Trứ</label>
                        <label>Vị trí: K20 - D12 - 10</label>
                    </div>
                    <div className="form-group">
                        <label>Ngày tạo: 15/9/2024</label>
                    </div>
                    <legend>Tình trạng tổng bộ của mộ:</legend>
                    <div className="radio-group">
                        {['Tốt', 'Bình thường', 'Khá', 'Xuống cấp'].map((status) => (
                            <label key={status}>
                                <input
                                    type="radio"
                                    name="statusInternal"
                                    value={status}
                                    checked={formData.statusOverall === status}
                                    onChange={handleInputChange}
                                />
                                {status}
                            </label>
                        ))}
                    </div>
                    <legend>Tình trạng ngoại cảnh:</legend>
                    <div className="radio-group">
                        {['Tốt', 'Bình thường', 'Khá', 'Xuống cấp'].map((status) => (
                            <label key={status}>
                                <input
                                    type="radio"
                                    name="statusExternal"
                                    value={status}
                                    checked={formData.statusExternal === status}
                                    onChange={handleInputChange}
                                />
                                {status}
                            </label>
                        ))}
                    </div>
                    <legend>Tình trạng mộ:</legend>
                    <div className="radio-group">
                        {['Tốt', 'Bình thường', 'Khá', 'Xuống cấp'].map((status) => (
                            <label key={status}>
                                <input
                                    type="radio"
                                    name="statusOverall"
                                    value={status}
                                    checked={formData.statusInternal === status}
                                    onChange={handleInputChange}
                                />
                                {status}
                            </label>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image-upload">Hình ảnh:</label>
                    </div>
                    <input
                        type="file"
                        id="image-upload"
                        name="images"
                        multiple
                        onChange={handleImageUpload}
                    />
                    <div className="form-group">
                        <label htmlFor="description">Mô tả chi tiết:</label>
                    </div>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        maxLength={300}
                        placeholder="Mô tả tình trạng (tối đa 300 từ)"
                    />
                </form>
                <button type="submit">Gửi</button>
            </div>
        </div>
    )
}