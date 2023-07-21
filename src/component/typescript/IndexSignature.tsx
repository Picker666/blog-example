/* eslint-disable prettier/prettier */
const IndexSignature = () => {
  const handleClick = () => {
    interface MyInterface {
      name: string;
      [key: string]: string;
    }

    type MyType = {
      name: string;
    };

    const interfaceExample: MyInterface = { name: 'Picker' };
    const typeExample: MyType = { name: 'Christine'}

    let record: Record<string, string> = {};
    record = typeExample;
    record = interfaceExample;
    record = { 1: '444', true: 'true' };
    console.log('record: ', record);

    interface MyInterface {
      name: number;
    }
  }

  return <div>
    <button onClick={handleClick}>clock me!</button>
  </div>
}

export default IndexSignature;
