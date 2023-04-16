import './columnsLayout.less';

const ColumnsLayout = () => {
  return (
    <div>
      <h1>this is ColumnsLayout</h1>
      {/* 两栏 */}
      <div className="box">
        <div className="left">左边</div>
        <div className="right">右边</div>
      </div>

      {/* 三栏 */}
      <div className="wrap1">
        <div className="left">左侧</div>
        <div className="right">右侧</div>
        <div className="middle">中间</div>
      </div>

      <div className="wrap2">
        <div className="left">左边固定宽度</div>
        <div className="main-wrapper">
          <div className="main">中间自适应</div>
        </div>
        <div className="right">右边固定宽度</div>
      </div>

      <div className="wrap3">
        <div className="left">左侧</div>
        <div className="middle">中间</div>
        <div className="right">右侧</div>
      </div>

      <div className="wrap4">
        <div className="left">左侧4</div>
        <div className="middle">中间 宽度不支持个性化</div>
        <div className="right">右侧</div>
      </div>

      <div className="wrap5">
        <div className="left">左侧5</div>
        <div className="middle">中间</div>
        <div className="right">右侧</div>
      </div>

      <div className="wrap6">
        <div className="left">左侧5</div>
        <div className="middle">中间</div>
        <div className="right">右侧</div>
      </div>
    </div>
  );
};

export default ColumnsLayout;
