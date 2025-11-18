import {Col} from 'antd';
import './dashboard_card.scss';
import {getIcon} from '../../components/Icons';

const DashboardCard = ({icon, title, count}) => {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-icon">{getIcon(icon)}</div>
            <div className="dashboard-card-content">
                <p className="dashboard-card-title">{title}</p>
                <h3 className="dashboard-card-count">{count}</h3>
            </div>
        </div>
    );
};

export default DashboardCard;