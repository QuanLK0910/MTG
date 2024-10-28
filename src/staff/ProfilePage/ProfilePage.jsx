import { useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import DatePicker from "react-datepicker";
import '../ProfilePage/ProfilePage.css';
export default function ProfilePage() {
    const [isEditable, setIsEditable] = useState({
        email: false,
        password: false,
        name: false,
        phone: false
    });
    const [birthDate, setBirthDate] = useState(null);
    const toggleEdit = (field) => {
        setIsEditable({
            ...isEditable,
            [field]: !isEditable[field],
        });
    };
    return (
        <div className="profile-container">
            <Sidebar />
            <div className="personal-info-form">
                <h2>THÔNG TIN CÁ NHÂN</h2>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                    </div>
                    <div className="form-input">
                        <input type="text" value='baoduylehoang2001@gmail.com' />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                    </div>
                    <div className="form-input">
                        <input type="password" value="**********************************" />
                        <button type="submit" onClick={() => toggleEdit('password')}>Chỉnh sửa</button>
                    </div>
                    <div className="form-group">
                        <label>Họ và tên</label>
                    </div>
                    <div className="form-input">
                        <input type="text" value="Lê Hoàng Bảo Duy" />
                        <button type="submit" onClick={() => toggleEdit('name')}>Chỉnh sửa</button>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                    </div>
                    <div className="form-input">
                        <input type="tel" value="0969777567" />
                        <button type="submit" onClick={() => toggleEdit('phone')}>Chỉnh sửa</button>
                    </div>
                    <div className="form-group">
                        <label>Ngày sinh</label>
                    </div>
                    <div className="form-input">
                        <DatePicker onChange={(date) => setBirthDate(date)}
                            selected={birthDate} dateFormat='dd/MM/yyyy'
                            placeholderText="13/10/2024" />
                        <button type="submit" onClick={() => toggleEdit('birthDate')}>Chỉnh sửa</button>
                    </div>
                    <div className="form-group">
                        <label>Ngày nhận việc</label>
                    </div>
                    <div className="form-input">
                        <input type="text" value="13/09/2024" />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng làm việc</label>
                    </div>
                    <div className="form-input">
                        <input type="text" value="Đang hoạt động" />
                    </div>
                </form>
            </div>
        </div>
    )
}