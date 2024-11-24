import '../../customer/Introduction/MartyrsGravesIntro.css';
import Header from '../../components/Header/header';
import { useEffect, useState } from 'react';
const MartyrsGravesIntro = () => {
    const [martyrs, setMartyrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const memorialInfo = {
        name: '',
        location: 'Hồ Chí Minh',
        established: '1975',
        area: '',
        totalMartyrs: ''
    }
    useEffect(() => {
        // Giả lập API call
        const fetchMartyrs = async () => {
            try {
                // Trong thực tế, đây sẽ là URL API của bạn
                const response = await fetch('https://api.example.com/martyrs');
                const data = await response.json();
                setMartyrs(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchMartyrs();
    }, []);
    return (
        <div>
            <Header />
            <div className="app-container">
                {/* Introduction Section */}
                <section className="home-section home-introduction-section">
                    <div className="home-container">
                        <h1 className="home-section-title">
                            Giới thiệu về nghĩa trang liệt sỹ An Nhiên
                        </h1>
                        <div className="home-content-wrapper">
                            <p className="home-introduction-text">
                                An Nhiên – Nghĩa trang Liệt sĩ là một địa điểm linh thiêng, nơi an
                                nghỉ vĩnh hằng của những anh hùng đã hiến dâng cuộc đời mình cho
                                sự nghiệp đấu tranh giành độc lập, tự do và thống nhất Tổ quốc.
                                Đây là biểu tượng cao quý của lòng yêu nước, sự hy sinh cao cả và
                                tinh thần bất khuất của dân tộc Việt Nam. Du khách đến viếng thăm
                                không chỉ để dâng hương tưởng niệm, mà còn để thể hiện lòng tri ân
                                sâu sắc đối với những người chiến sĩ đã ngã xuống vì nền hòa bình
                                và độc lập dân tộc. Nghĩa trang An Nhiên là biểu tượng trường tồn
                                của lòng biết ơn và sự kính trọng đối với những người anh hùng đã
                                viết nên trang sử vàng chói lọi của đất nước.
                            </p>
                        </div>
                    </div>
                </section>
                <main className="memorial-content">
                    <section className="memorial-info">
                        <h2>Thông tin chung</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <h3>Địa điểm</h3>
                                <p>{memorialInfo.location}</p>
                            </div>
                            <div className="info-item">
                                <h3>Năm thành lập</h3>
                                <p>{memorialInfo.established}</p>
                            </div>
                            <div className="info-item">
                                <h3>Diện tích</h3>
                                <p>{memorialInfo.area}</p>
                            </div>
                            <div className="info-item">
                                <h3>Số liệt sĩ an nghỉ</h3>
                                <p>{memorialInfo.totalMartyrs}</p>
                            </div>
                        </div>
                    </section>
                    <section className="memorial-history">
                        <h2>Lịch sử</h2>
                        <p>
                            Nghĩa trang liệt sỹ An Nhiên được xây dựng từ năm 1975, là nơi an nghỉ của các anh hùng liệt sỹ
                            đã hy sinh trong hai cuộc kháng chiến chống Pháp và chống Mỹ. Đây là một trong những nghĩa trang
                            liệt sỹ lớn nhất tỉnh Hà Nam, được quy hoạch theo tiêu chuẩn quốc gia về nghĩa trang liệt sỹ.
                        </p>
                    </section>
                    <section className="memorial-activities">
                        <h2>Hoạt động tưởng niệm</h2>
                        <div className="activities-grid">
                            <div className="activity-card">
                                <h3>Lễ viếng hàng năm</h3>
                                <p>Được tổ chức vào ngày 27/7 hàng năm</p>
                            </div>
                            <div className="activity-card">
                                <h3>Chương trình "Đền ơn đáp nghĩa"</h3>
                                <p>Hoạt động chăm sóc, tôn tạo nghĩa trang thường xuyên</p>
                            </div>
                            <div className="activity-card">
                                <h3>Gặp mặt thân nhân liệt sỹ</h3>
                                <p>Tổ chức định kỳ mỗi năm 2 lần</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
};
export default MartyrsGravesIntro;