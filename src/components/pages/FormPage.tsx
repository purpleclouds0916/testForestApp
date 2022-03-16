/* eslint-disable array-callback-return */
import { useState, VFC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IsCalculation from '../Atoms/IsCalculations';
import TreeManagement from '../organisms/TreeManagement';
import TreeGrowth from '../organisms/TreeGrowth';
import CutTreeCost from '../organisms/CutTreeCost';
import { CalculationResultType } from '../../models/CalculationResult';
import { AppDispatch } from '../../redux/store';
import { addCalculationResult } from '../../redux/CalculationResultSlice';
import './FormPage.css';
import { FormValues } from '../../models/FormValues';
import formInformation from '../../data/FormInformation';

const schema = yup
  .object({
    management: yup.object({
      minimumDensity: yup.number().required(),
      maximumDensity: yup.number().required(),
      minimumClearcut: yup.number().required(),
      reforestationCost: yup.number().required(),
      priceSaplings: yup.number().required(),
      minimumThinning: yup.number().required(),
      maximumThinning: yup.number().required(),
      annualProfit: yup.number().required(),
      ageOfStartThinning: yup.number().required(),
      ageOfEndThinning: yup.number().required(),
      thinningInterval: yup.number().required(),
      maximumNumberOfThinning: yup.number().required(),
    }),
  })
  .required();

const FormPage: VFC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: formInformation.defaultValue,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // e.preventDefault();
    setLoading(true);

    const clearCutPrice: number[] = [];
    const clearCutDiamter: number[] = [];
    const thinningPrice: number[] = [];
    const thinningDiamter: number[] = [];
    const treeVolume: number[] = [];
    const dbh: number[] = [];
    const highStandShape: number[] = [];

    data.clearCut.diamter.map((_value, index) => {
      clearCutPrice.push(data.clearCut.price[index].value);
      clearCutDiamter.push(data.clearCut.diamter[index].value);
      thinningPrice.push(data.thinning.price[index].value);
      thinningDiamter.push(data.thinning.diamter[index].value);
    });

    data.treeGrowth.treeVolume.map((value) => {
      treeVolume.push(value.value);
    });

    data.treeGrowth.dbh.map((value) => {
      dbh.push(value.value);
    });

    data.treeGrowth.highStandShape.map((value) => {
      highStandShape.push(value.value);
    });

    const submitApiData = {
      SH: {
        YieldModelType: 'S',
        SAType: '2021',
        SDMD: {
          NRf: data.treeGrowth.nrf,
          H: [
            data.treeGrowth.treeHeight[0].value,
            -Math.exp(
              Number(data.treeGrowth.treeHeight[1].value) *
                Number(data.treeGrowth.treeHeight[2].value),
            ),
            - data.treeGrowth.treeHeight[1].value,
            data.treeGrowth.treeHeight[3].value,
          ],
          V: treeVolume,
          DBH: dbh,
          HF: highStandShape,
        },
        Density: {
          Plant: [
            data.management.minimumDensity,
            data.management.maximumDensity,
          ],
          MinimumAtClearcut: data.management.minimumClearcut,
        },
        RegenerationCost: [
          data.management.reforestationCost,
          data.management.priceSaplings,
        ],
        ThinningPercent: [
          data.management.minimumThinning,
          data.management.maximumThinning,
        ],
        AnnualInterestPercent: data.management.annualProfit,
        HarvestingAges: [
          data.management.ageOfStartThinning,
          data.management.ageOfEndThinning,
          data.management.thinningInterval,
        ],
        MaxNumOfHarvest: data.management.maximumNumberOfThinning,
        NumSearch: [3, 10000],
        Thinning: {
          YieldRate: data.thinning.other.yieldRate,
          Cost: data.thinning.other.cost,
          StumpHeight: data.thinning.other.stumpHeight,
          Diameter: thinningDiamter,
          Price: thinningPrice,
        },
        Clearcut: {
          YieldRate: data.clearCut.other.yieldRate,
          Cost: data.clearCut.other.cost,
          StumpHeight: data.clearCut.other.stumpHeight,
          Diameter: clearCutDiamter,
          Price: clearCutPrice,
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
    console.log(JSON.stringify(submitApiData));
    // ※高知大学のWi-Fiを利用しないと必ずエラーになる(セキュリティの関係上)
    void axios
      .post<CalculationResultType>(
        'http://133.97.178.97:21312/calculation/',
        submitApiData,
      )
      .then((res) => {
        dispatch(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          addCalculationResult(JSON.parse(res.data as unknown as string)),
        );
        navigate('/submit');
      })
      .catch(() => {
        // 以下はテストように開発
        // eslint-disable-next-line no-alert
        alert('計算に失敗しました。これより、デモの計算結果ページに遷移します');
        // dispatch(addCalculationResult(testFormData));
        // navigate('/submit');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TreeGrowth
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <TreeManagement control={control} errors={errors} />

      <CutTreeCost
        cutMethod="thinning"
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        watch={watch}
      />

      <CutTreeCost
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        watch={watch}
        cutMethod="clearCut"
      />
      <input className="submit-button" type="submit" value="計算する" />
      {loading && <IsCalculation />}
    </form>
  );
};

export default FormPage;
