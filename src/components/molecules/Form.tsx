import { InputAdornment, TextField } from '@mui/material';
import { VFC } from 'react';
import { ArrayFieldProps } from '../../models/ArrayFieldProps';

const Form: VFC<ArrayFieldProps> = (props) => {
  const { formInformation, inputValues, setInputValue } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues: { name: string; value: number | string }[] = [];

  // const [inputValues, setInputValue] = useState<
  //   { name: string; value: number | string }[]
  // >(defaultValues);

  formInformation.map((information) =>
    defaultValues.push({
      name: information.title,
      value: information.defaultValue,
    }),
  );

  // useEffect(() => {
  //   setInputValue(defaultValues);
  // }, [defaultValues]);

  const ArrayFields = formInformation.map((information, index) => (
    <div className="form-field-wrapper" key={information.id}>
      <div>{information.title}</div>
      {information.description && <p>{information.description}</p>}
      <TextField
        id=""
        type="text"
        variant="outlined"
        value={inputValues[index].value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(
            inputValues.map((inputValue, nestIndex) =>
              nestIndex === index
                ? { name: inputValue.name, value: event.target.value }
                : { name: inputValue.name, value: inputValue.value },
            ),
          );
        }}
        InputProps={
          information.unit
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    {information.unit}
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </div>
  ));

  return <div>{ArrayFields}</div>;
};

export default Form;
