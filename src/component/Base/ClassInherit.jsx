class Patent {
  constructor(name = "Picker") {
    this.name = name;
  }
}

class Child extends Patent {
  constructor(name) {
    super(name);
  }
}

const ClassInherit = () => {
  const child = new Child("Picker 666");

  console.log(child);

  return <div>666</div>;
};

export default ClassInherit;
