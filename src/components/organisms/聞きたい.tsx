import { useState } from 'react';

const ArrayField = () => {
  const defaultValues = ['一つ目の内容', '2つ目の内容', '3つ目の内容'];

  const [inputValues, setInputValue] = useState(defaultValues);

  //  onChangeを分けて書こうとすると、defaultValueIndex がundefiendになってしまう。
  //  classコンポーネントでthis.defaultValueIndexを使えば、解決すると思うが、できれば関数コンポーネントで書きたい。
  // const onChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(
  //     inputValues.map((inputValue, nestIndex) =>
  //       nestIndex === defaultValueIndex ? event.target.value : inputValue,
  //     ),
  // })

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(
//       inputValues.map((inputValue, nestIndex) =>
//         nestIndex === defaultValueIndex ? event.target.value : inputValue,
//       ),
//     );
//   };

  const ArrayFields = defaultValues.map((_defaultValue, defaultValueIndex) => (
    <div className="formContainer">
      <p>{inputValues[defaultValueIndex]}</p>
      <input
        value={inputValues[defaultValueIndex]}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(
            inputValues.map((inputValue, nestIndex) =>
              nestIndex === defaultValueIndex ? event.target.value : inputValue,
            ),
          );
        }}
      />
    </div>
  ));

  return <p>{ArrayFields}</p>;
};

export default ArrayField;
