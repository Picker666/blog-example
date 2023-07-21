// =========================class
class Query {
  constructor(list) {
    this.result = list;
  }
}

Query.prototype.where = function (cb) {
  this.result = this.result.filter(cb);
  return this;
};

Query.prototype.sortBy = function (key) {
  this.result = this.result.sort((a, b) => a[key] > b[key]);
  return this;
};

Query.prototype.groupBy = function (key) {
  if (!Array.isArray(this.result)) {
    return this;
  }
  const map = {};
  this.result = this.result.forEach((item) => {
    if (map[item[key]] === undefined) {
      map[item[key]] = [];
    }

    map[item[key]].push(item);
  });
  this.result = map;
  return this;
};

Query.prototype.execute = function () {
  return this.result;
};

const query = (list) => {
  return new Query(list);
};

//================================================================
const query2 = (list) => {
  let result = list;
  const func = {
    where(cb) {
      result = result.filter(cb);
      return func;
    },
    sortBy(key) {
      result = result.sort((a, b) => a[key] > b[key]);
      return func;
    },
    groupBy(key) {
      if (!Array.isArray(result)) {
        return func;
      }
      const map = {};
      result = result.forEach((item) => {
        if (map[item[key]] === undefined) {
          map[item[key]] = [];
        }
        map[item[key]].push(item);
      });
      result = map;

      return func;
    },
    execute() {
      return result;
    },
  };

  return func;
};

const QueryAlg = () => {
  const handleClick = () => {
    const list = [
      { id: 5, name: "Picker", age: 22 },
      { id: 2, name: "Christine", age: 32 },
      { id: 6, name: "Borry", age: 10 },
      { id: 4, name: "Haa", age: 62 },
    ];
    const result = query2(list)
      .where((item) => item.age > 18)
      .sortBy("id")
      .groupBy("age")
      .execute();

    console.log(result);
  };
  return (
    <div>
      <button onClick={handleClick}> go... </button>{" "}
    </div>
  );
};

export default QueryAlg;
