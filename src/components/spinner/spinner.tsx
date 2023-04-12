import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export function Spinner() {
  return (
    <Spin
      size="large"
      indicator={<LoadingOutlined style={{ fontSize: '50px' }} />}
      className="self-center"
    />
  );
}
