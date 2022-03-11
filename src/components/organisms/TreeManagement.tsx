import { VFC } from 'react';
import formInformation from '../../data/FormInformation';
import { UseInputValues } from '../../models/UseInputValues';
import FormObject from '../molecules/FormObject';
import Card from './Card';

const TreeManagement: VFC<UseInputValues> = (props) => {
  const { inputValues, setInputValue } = props;

  return (
    <Card title="経営方法の詳細">
      <FormObject
        formInformation={formInformation.management}
        inputValues={inputValues}
        setInputValue={setInputValue}
        category="management"
        className="management-field-items"
      />
    </Card>
  );
};

export default TreeManagement;
