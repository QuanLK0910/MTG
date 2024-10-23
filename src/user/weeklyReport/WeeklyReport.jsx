import { useState } from "react";
import Header from "../../components/Header/header";
import '../weeklyReport/WeeklyReport.css';
const WeeklyReport = () => {
    const [fromDate, setFromDate] = useState('21/09/2024');
    const [toDate, setToDate] = useState('21/09/2024');
    const DateFilter = ({ fromDay, toDay, onFromDateChange, onToDateChange }) => {
        return (
            <div className="date-filter">
                <div className="date-input-group">
                    <label>Từ ngày:</label>
                    <input type="date" value={fromDay}
                        onChange={onFromDateChange} className="date-input" />
                </div>
                <div className="date-input-group">
                    <label>Đến ngày:</label>
                    <input type="date" value={toDay}
                        onChange={onToDateChange} className="date-input" />
                </div>
            </div>
        )
    };
    const ReportTable = ({ data }) => {
        return (
            <div className="table-container">
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên mộ</th>
                            <th>Vị trí mộ</th>
                            <th>Tên nhân viên</th>
                            <th>Ngày báo cáo</th>
                            <th>Tình trạng mộ</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.code}</td>
                                    <td>{row.assignee}</td>
                                    <td>{row.date}</td>
                                    <td>{row.status}</td>
                                    <td>
                                        <button className="view-report-btn">Tạo file pdf</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    const reportData = [
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
        { id: 1, name: 'Nguyễn Công Trứ', code: 'K20-12-10', assignee: 'Nguyễn Văn A', date: '20/8/2023', status: 'Tốt' },
    ]
    return (
        <div className="weekly-report">
            <Header />
            <main className="main-content">
                <h1 className="page-title">Báo cáo hàng tuần của mộ</h1>
                <DateFilter fromDay={fromDate} toDay={toDate}
                    onFromDateChange={(e) => setFromDate(e.target.value)}
                    onToDateChange={(e) => setToDate(e.target.value)} />
                <ReportTable data={reportData} />
            </main>
        </div>
    )
};
export default WeeklyReport;