import { Typography } from 'antd';
import '../index.css';

const { Title } = Typography;

export const Logo = () => {
  return (
    <div className='logo'>
        <div className="logo-icon">
            <Title className="title" level={2}>GL</Title>
        </div>
    </div>
  )
}
