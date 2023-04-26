import './flex.css';

const Flex = () => {
  return (
    <div className="flexItem">
      <h1>this is Flex page</h1>
      <div className="flexDefault">
        <h2>1、flex 为默认值，并且宽度充足</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            background: red;
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            background: blue;
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 600px</div>
        </div>

        <h2>2、flex 为默认值，并且宽度不足</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            收缩后的宽度：240px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            收缩后的宽度：160px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 400px</div>
        </div>
      </div>

      <div className="flexNone">
        <h2>3、flex 为none，并且宽度充足</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            {/* 收缩后的宽度：240px */}
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            {/* 收缩后的宽度：160px */}
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 4600px</div>
        </div>

        <h2>4、flex 为none，并且宽度不足</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            {/* 收缩后的宽度：240px */}
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            {/* 收缩后的宽度：160px */}
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 400px</div>
        </div>
      </div>

      <div className="flexN">
        <h2>5、flex 为1，width 之和小于黄框宽度</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            拉伸后的宽度：350px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            拉伸后的宽度：350px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 700px</div>
        </div>

        <h2>6、flex 为1，width 之和大于黄框宽度</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            拉伸后的宽度：150px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            拉伸后的宽度：150px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 300px</div>
        </div>
      </div>

      <div className="flexBasisN">
        <h2>6、flex: 1 1 npx， 并且宽度充足</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 1 1 200px;
            <br />
            拉伸后的宽度：250px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 1 1 300px;
            <br />
            拉伸后的宽度：350px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 600px</div>
        </div>

        <h2>7、flex 为 1 1 npx，并且宽度不足</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 1 1 200px;
            <br />
            收缩后的宽度：160px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 1 1 300px;
            <br />
            收缩后的宽度：240p
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 400px</div>
        </div>
      </div>

      <div className="flexLast">
        <h2>8、flex: x y npx， 并且宽度充足</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 3 2 200px;
            <br />
            拉伸后的宽度：260px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 2 3 300px;
            <br />
            拉伸后的宽度：340px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 600px</div>
        </div>

        <h2>9、flex 为x y npx，并且宽度不足</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 3 2 200px;
            <br />
            收缩后的宽度：169.23px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 2 3 300px;
            <br />
            收缩后的宽度：230.77px；
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 400px</div>
        </div>
      </div>

      <div className="flexGrowDecimal">
        <h2>10、flex: x， x之和大于等于1</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 0.6 2 200px;
            <br />
            拉伸后的宽度：260px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 0.9 3 300px;
            <br />
            拉伸后的宽度：340px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 600px</div>
        </div>

        <h2>11、flex 为x, x之和小于1</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 0.2 2 200px;
            <br />
            收缩后的宽度：220px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 0.3 3 300px;;
            <br />
            收缩后的宽度：330px；
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 600px</div>
        </div>
      </div>

      <div className="flexShrinkDecimal">
        <h2>12、flex: 1 x npx， x之和大于等于1</h2>
        <div className="flexContainer">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 1 0.6 200px;
            <br />
            收缩后的宽度：169.23px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 1 0.9 300px;
            <br />
            收缩后的宽度：230.77px
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 400px</div>
        </div>

        <h2>13、flex: 1 x npx, x之和小于1</h2>
        <div className="flexContainer1">
          <div className="flexLeft">
            width: 300px;
            <br />
            flex: 2 0.2 200px;
            <br />
            收缩后的宽度：184.61px
          </div>
          <div className="flexRight">
            width: 200px;
            <br />
            flex: 3 0.3 300px;;
            <br />
            收缩后的宽度：265.39px；
          </div>
        </div>
        <div className="instruction">
          <div>黄框：content为 400px</div>
        </div>
      </div>

      <h2>14: </h2>
      <div className="flexLayout">
        <div className="father">
          <div className="son"></div>
          <div className="son"></div>
          <div className="son"></div>
        </div>
      </div>

      <h2>15: </h2>
      <div className="flexLayout1">
        <div className="father">
          <div className="son"></div>
          <div className="son"></div>
          <div className="son"></div>
        </div>
      </div>
    </div>
  );
};

export default Flex;
