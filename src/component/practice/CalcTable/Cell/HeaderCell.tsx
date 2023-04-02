import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const HeaderCell = (props: { label: string; tooltipText?: string; text?: string }) => {
  const { label, tooltipText, text } = props;
  const style = { fontSize: '12px', marginLeft: '5px', color: '#666' };
  return (
    <div>
      {label}
      {text && <span style={style}>{text}</span>}
      {tooltipText && (
        <Tooltip title={tooltipText}>
          <InfoCircleOutlined style={style} />
        </Tooltip>
      )}
    </div>
  );
};

export default HeaderCell;
