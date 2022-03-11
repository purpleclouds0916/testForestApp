/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, VFC } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, TextField } from '@mui/material';
import FormNormal from '../Atoms/FormNormal';
import MultipleSelectPlaceholder from '../molecules/Select';
import SelectFormula from '../molecules/SelectFormula';
import TreeHeightGrowthDescription from '../molecules/TreeHeightGrowthDescription';
import ChartItem from '../organisms/ChartItem';
import MoveLineChart from '../organisms/MoveLineChart';
import FormCard from '../organisms/Card';
import FormObject from '../molecules/FormObject';
import FormArray from '../molecules/FormArray';

import { Management } from '../../models/ManagementModels';
import { ThinningOtherTs } from '../../models/ThinningOther';
import { ClearCutOtherTs } from '../../models/ClearCutOther';

import formInformation from '../../data/FormInformation';
import defaultData from '../../data/DefaultData';
import testFormData from '../../data/testFormData.json';
import FormItem from '../molecules/FormItem';
import { AppDispatch, RootState } from '../../redux/store';
import { addCalculationResult } from '../../redux/CalculationResultSlice';
import { CalculationResultType } from '../../models/CalculationResult';

import './FormPage.css';

const FormPage: VFC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
  const clearCutData: number[][] = [];

  // eslint-disable-next-line array-callback-return
  inputValues.thinningPrice.map((_, index) => {
    thinningData[index] = [
      Number(inputValues.thinningDiamter[index]),
      Number(inputValues.thinningPrice[index]),
    ];
    clearCutData[index] = [
      Number(inputValues.clearCutDiamter[index]),
      Number(inputValues.clearCutPrice[index]),
    ];
  });

  // const [testApi, setTestApi] = useState()
  // eslint-disable-next-line
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const submitApiData = {
      SH: {
        YieldModelType: 'S',
        SAType: '2021',
        SDMD: {
          NRf: inputValues.nrf,
          H: [
            inputValues.treeHeight[0],
            - Math.exp(Number(inputValues.treeHeight[1]) * Number(inputValues.treeHeight[2])),
            - inputValues.treeHeight[1],
            inputValues.treeHeight[3],
          ],
          V: inputValues.treeVolume,
          DBH: inputValues.dbh,
          HF: inputValues.highStandShape,
        },
        Density: {
          Plant: [
            inputValues.management.minimumDensity,
            inputValues.management.maximumDensity,
          ],
          MinimumAtClearcut: inputValues.management.minimumClearcut,
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
        NumSearch: [3, 10000],
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
        SA: {
          Comment: 'Type L 1000 yen/ha degradation for SEV',
          NumRepeat: 40,
          NumTempLevel: 100,
          MetaSearchPercentile: 0.75,
          NumTotalLoopN: [1, 8],
          NumTotalLoopPow: [3.55, 6.75],
          StartTemp: [0, -0.6, 0.6, 5],
          DiffTemp: [0, -3.8, 1.4, 5],
          DistScale: [0, -1.2, 0.6, 5],
        },
      },
    };

    // ※高知大学のWi-Fiを利用しないと必ずエラーになる(セキュリティの関係上)
    void axios
      .post<CalculationResultType>('/calculation/', submitApiData)
      .then((res) => {
        dispatch(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          addCalculationResult(JSON.parse(res.data as unknown as string)),
        );
        navigate('/submit');
      })
      .catch(() => {
        //  元々のコード
        // alert(
        //   '計算に失敗しました。お手数ですが、管理者に問い合わせをしてください。',
        // );

        // 以下はテストように開発
        // eslint-disable-next-line no-alert
        alert('計算に失敗しました。これより、デモの計算結果ページに遷移します');

        dispatch(addCalculationResult(testFormData));
        navigate('/submit');
      })
      .finally(() => {
        setLoading(false);
      });
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
              <ChartItem axisX="胸高直径(cm)" axisY="金額(円)">
                <MoveLineChart
                  top={10}
                  bottom={30}
                  left={65}
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
              <ChartItem axisX="胸高直径(cm)" axisY="金額(円)">
                <MoveLineChart
                  top={10}
                  bottom={30}
                  left={65}
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
      <input className="submit-button" type="submit" value="計算する" />
      {loading && (
        <div className="isCalculation">
          <div className="wrapper">
            <div className="circularprogres">
              <CircularProgress disableShrink size={60} />
            </div>
            <div className="text">
              計算中です。この処理は10秒ほどかかることがあります。
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormPage;
