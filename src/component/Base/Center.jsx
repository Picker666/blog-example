import './center.less';

const Center = () => {
  console.log('========================');
  return (
    <div className="centerContainer">
      <p>方案一：</p>
      <div className="father1">
        <div className="son1"></div>
      </div>
      <hr />
      <p>方案二：</p>
      <div className="father2">
        <div className="son2"></div>
      </div>
      <hr />
      <p>方案三：</p>
      <div className="father3">
        <div className="son3">方案三方案三方案三方案三方案三</div>
      </div>
      <hr />
      <p>方案四：</p>
      <div className="father4">
        <div className="son4">方案四方案四方案四</div>
      </div>
      <hr />
      <p>方案五：</p>
      <div className="father5">
        <div className="son5">方案五方案五方案五方案五</div>
      </div>
      <hr />
      <p>方案六：</p>
      <div className="father6">
        <div className="son6">方案六方案六</div>
      </div>
      <hr />
      <p>方案七：</p>
      <div className="father7">
        <div className="son7">方案七</div>
      </div>
      <hr />
    </div>
  );
};

export default Center;
