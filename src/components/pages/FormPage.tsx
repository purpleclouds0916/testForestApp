import { useState, VFC } from 'react';
import FormCard from '../organisms/FormCard';
import Form from '../molecules/Form';
import densityFormInformation from '../../formInformation/DensityFormInformation';
import { FieldType } from '../../models/FieldType';
import treePriceAndDiamter from '../../formInformation/TreePriceAndDiamter';

const GetDefaultValues = (FormInformation: FieldType[]) => {
  const defaultValues: { name: string; value: number | string }[] = [];
  FormInformation.map((information) =>
    defaultValues.push({
      name: information.title,
      value: information.defaultValue,
    }),
  );

  return defaultValues;
};

const FormPage: VFC = () => {
  const managementDefaultValues = GetDefaultValues(densityFormInformation);
  const treePriceDefaultValues = GetDefaultValues(
    treePriceAndDiamter.priceFormInformation,
  );
  const treeDiamterDefaultValues = GetDefaultValues(
    treePriceAndDiamter.diamterFormInformation,
  );

  const [managementInputValues, setManagementInputValue] = useState<
    { name: string; value: number | string }[]
  >(managementDefaultValues);

  const [thinningPriceInputValues, setThinningPriceInputValue] = useState<
    { name: string; value: number | string }[]
  >(treePriceDefaultValues);

  const [thinningDiamterInputValues, setThinningDiamterInputValue] = useState<
    { name: string; value: number | string }[]
  >(treeDiamterDefaultValues);

  const handleSubmit = () => {
    // eslint-disable-next-line no-alert
    // alert(JSON.stringify(ManagementDefaultValues));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="経営方法の詳細">
        <Form
          formInformation={densityFormInformation}
          inputValues={managementInputValues}
          setInputValue={setManagementInputValue}
        />
      </FormCard>
      <FormCard title="間伐材の費用">
        <>
          <Form
            formInformation={treePriceAndDiamter.priceFormInformation}
            inputValues={thinningPriceInputValues}
            setInputValue={setThinningPriceInputValue}
          />
          <Form
            formInformation={treePriceAndDiamter.diamterFormInformation}
            inputValues={thinningDiamterInputValues}
            setInputValue={setThinningDiamterInputValue}
          />
        </>
      </FormCard>
      {/* <FormCard title="皆伐材の費用">
        <>
          <Form formInformation={treePriceAndDiamter.PriceFormInformation} />
          <Form formInformation={treePriceAndDiamter.DiamterFormInformation} />
        </>
      </FormCard> */}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormPage;
