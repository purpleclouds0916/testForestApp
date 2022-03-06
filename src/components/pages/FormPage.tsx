/* eslint-disable */
import { useState, VFC } from 'react';

import FormCard from '../organisms/FormCard';
import FormObject from '../molecules/FormObject';
import FormArray from '../molecules/FormArray';

import { Management } from '../../models/ManagementModels';
import { ThinningOtherTs } from '../../models/ThinningOther';
import { ClearCutOtherTs } from '../../models/ClearCutOther';

import formInformation from '../../data/FormInformation';
import defaultData from '../../data/DefaultData';
import FormNormal from 'components/Atoms/FormNormal';
import { TextField } from '@mui/material';
import FormItem from '../molecules/FormItem';
import MultipleSelectPlaceholder from 'components/molecules/Select';
import SelectFormula from 'components/molecules/SelectFormula';
import TreeHeightGrowthDescription from 'components/molecules/TreeHeightGrowthDescription';
import BasicLineChart from 'components/organisms/BasicLineChart';
import ChartItem from 'components/organisms/ChartItem';
import LineChart from 'components/organisms/LineChart';

const FormPage: VFC = () => {
  const [inputValues, setInputValue] = useState<{
    treeHeight: Array<number | string>;
    treeVolume: Array<number | string>;
    highStandShape: Array<number | string>;
    dbh: Array<number | string>;
    nrf: number | string;
    management: Management;
    thinningOther: ThinningOtherTs;
    thinningPrice: Array<number | string>;
    thinningDiamter: Array<number | string>;
    clearCutOther: ClearCutOtherTs;
    clearCutPrice: Array<number | string>;
    clearCutDiamter: Array<number | string>;
  }>({
    treeHeight: defaultData.treeHeight,
    treeVolume: defaultData.treeVolume,
    highStandShape: defaultData.highStandShape,
    dbh: defaultData.dbh,
    nrf: 5.992602,
    management: defaultData.management,
    thinningOther: defaultData.thinningOther,
    thinningPrice: defaultData.treePrice,
    thinningDiamter: defaultData.treeDiamter,
    clearCutOther: defaultData.clearCutOther,
    clearCutPrice: defaultData.treePrice,
    clearCutDiamter: defaultData.treeDiamter,
  });

    const thinningData: number[][] = [];

  // eslint-disable-next-line array-callback-return
  inputValues.thinningPrice.map((_, index) => {
    const Xelement = Number(inputValues.thinningDiamter[index]);
    const Yelement = Number(inputValues.thinningPrice[index]);
    thinningData[index] = [Xelement, Yelement];
  });

    const clearCutData: number[][] = [];

  // eslint-disable-next-line array-callback-return
  inputValues.thinningPrice.map((_, index) => {
    const Xelement = Number(inputValues.clearCutDiamter[index]);
    const Yelement = Number(inputValues.clearCutPrice[index]);
    clearCutData[index] = [Xelement, Yelement];
  });

  const handleSubmit = () => {
    const submitApiData = {
      SDMD: {
        NRf: inputValues.nrf,
        H: inputValues.treeHeight,
        V: inputValues.treeVolume,
        DBH: inputValues.dbh,
        HF: inputValues.highStandShape,
      },
      Density: {
        Plant: [
          inputValues.management.minimumDensity,
          inputValues.management.maximumDensity,
        ],
        Minimum: inputValues.management.minimumClearcut,
      },
      RegenerationCost: [
        inputValues.management.reforestationCost,
        inputValues.management.priceSaplings,
      ],
      ThinningPercent: [
        inputValues.management.minimumThinning,
        inputValues.management.maximumThinning,
      ],
      AnnualInterestPercent: inputValues.management.annualProfit,
      HarvestingAges: [
        inputValues.management.ageOfStartThinning,
        inputValues.management.ageOfEndThinning,
        inputValues.management.thinningInterval,
      ],
      MaxNumOfHarvest: inputValues.management.maximumNumberOfThinning,
      Thinning: {
        YieldRate: inputValues.thinningOther.thinningYieldRate,
        Cost: inputValues.thinningOther.thinningCost,
        StumpHeight: inputValues.thinningOther.thinningStumpHeight,
        Diameter: inputValues.thinningDiamter,
        Price: inputValues.thinningPrice,
      },
      Clearcut: {
        YieldRate: inputValues.clearCutOther.clearCutYieldRate,
        Cost: inputValues.clearCutOther.clearCutCost,
        StumpHeight: inputValues.clearCutOther.clearCutStumpHeight,
        Diameter: inputValues.clearCutDiamter,
        Price: inputValues.clearCutPrice,
      },
    };
    alert(JSON.stringify(submitApiData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="林分の成長">
        <>
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="treeVolume"
            className="display-none"
          />
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="highStandShape"
            className="display-none"
          />
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="dbh"
            className="display-none"
          />
          <FormNormal
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="nrf"
            className="display-none"
          />
          <FormItem
            title="林分密度管理図を選択する"
            description="選択することで、最適な林分材積を計算することができます"
          >
            <MultipleSelectPlaceholder
              inputValues={inputValues}
              setInputValue={setInputValue}
            />
          </FormItem>
          <SelectFormula inputValues={inputValues} />
          <FormItem
            title="樹高の成長"
            description={<TreeHeightGrowthDescription />}
          >
            <FormArray
              title={formInformation.treeHeightTitles}
              inputValues={inputValues}
              setInputValue={setInputValue}
              category="treeHeight"
              className="tree-height-field-items"
            />
          </FormItem>
        </>
      </FormCard>
      <FormCard title="経営方法の詳細">
        <FormObject
          formInformation={formInformation.management}
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="management"
          className="management-field-items"
        />
      </FormCard>
      <FormCard title="間伐の費用">
        <>
          <FormObject
            formInformation={formInformation.thinningOther}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningOther"
            className="cut-other-field-items"
          />
          <FormItem
            title="皆伐した木材の価格"
            description="胸高直径に対する木材価格を入力してください。下のグラフを動かして変更することもできます"
          >
            <>
              <FormArray
                inputValues={inputValues}
                setInputValue={setInputValue}
                category="thinningPrice"
                className="price-field-items"
              >
                <TextField
                  disabled
                  className="table-title"
                  defaultValue="価格(円)"
                />
              </FormArray>
              <FormArray
                inputValues={inputValues}
                setInputValue={setInputValue}
                category="thinningDiamter"
                className="diamter-field-items"
              >
                <TextField
                  disabled
                  className="table-title"
                  defaultValue="胸高直径(cm)"
                />
              </FormArray>
              <ChartItem title="タイトル">
                <LineChart
                  top={10}
                  bottom={30}
                  left={50}
                  right={10}
                  className="thinning-chart"
                  idName="thinning-chart"
                  inputValues={inputValues}
                  setInputValue={setInputValue}
                  data={thinningData}
                  timingOfLogging="thinning"
                />
              </ChartItem>
            </>
          </FormItem>
        </>
      </FormCard>

      <FormCard title="皆伐の費用">
        <>
          <FormObject
            formInformation={formInformation.clearCutOther}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutOther"
            className="cut-other-field-items"
          />
          <FormItem
            title="間伐した木材の価格"
            description="胸高直径に対する木材価格を入力してください。下のグラフを動かして変更することもできます"
          >
            <>
              <FormArray
                inputValues={inputValues}
                setInputValue={setInputValue}
                category="clearCutPrice"
                className="price-field-items"
              >
                <TextField
                  disabled
                  className="table-title"
                  defaultValue="価格(円)"
                />
              </FormArray>
              <FormArray
                inputValues={inputValues}
                setInputValue={setInputValue}
                category="clearCutDiamter"
                className="diamter-field-items"
              >
                <TextField
                  disabled
                  className="table-title"
                  defaultValue="胸高直径(cm)"
                />
              </FormArray>
              <ChartItem title="タイトル">
                <LineChart
                  top={10}
                  bottom={30}
                  left={50}
                  right={10}
                  className="clearCut-chart"
                  idName="clearCut-chart"
                  inputValues={inputValues}
                  setInputValue={setInputValue}
                  data={clearCutData}
                  timingOfLogging="clearCut"
                />
              </ChartItem>
            </>
          </FormItem>
        </>
      </FormCard>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormPage;
