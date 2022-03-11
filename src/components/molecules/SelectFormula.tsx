import TeX from '@matejmazur/react-katex';
import { VFC } from 'react';
import { InputValuesTs } from '../../models/InputValues';
import 'katex/dist/katex.min.css';
import './SelectFormula.css';

const SelectFormula: VFC<{ inputValues: InputValuesTs }> = (props) => {
  const { inputValues } = props;

  return (
    <div className="sdmd-katexs-items">
      <div className="sdmd-katex-item sdmd-katex-formula">
        <TeX>{String.raw`V = ({${inputValues.treeVolume[0]}}H^{{${
          inputValues.treeVolume[1]
        }}}{${
          inputValues.treeVolume[2] > 0
            ? `+${inputValues.treeVolume[2]}`
            : `${inputValues.treeVolume[2]}`
        }}H^{{${inputValues.treeVolume[3]}}}/N)^{-1}`}</TeX>
        <br />
        <TeX>{String.raw`HF = {${inputValues.highStandShape[0]}}{${
          inputValues.highStandShape[1] > 0
            ? `+${inputValues.highStandShape[1]}`
            : `${inputValues.highStandShape[1]}`
        }}H{${
          inputValues.highStandShape[2] > 0
            ? `+${inputValues.highStandShape[2]}`
            : `${inputValues.highStandShape[2]}`
        }}\sqrt{N}\cdot{H/100}`}</TeX>
        <br />
        <TeX>{String.raw`G = V/HF`}</TeX>
        <br />
        <TeX>{String.raw`\overline{dg} = 200\sqrt{G/(\pi\cdot{N})}`}</TeX>
        <br />
        <TeX>{String.raw`\overline{d} = {${inputValues.dbh[0]}}{${
          inputValues.dbh[1] > 0
            ? `+${inputValues.dbh[1]}`
            : `${inputValues.dbh[1]}`
        }}\overline{d}g{${
          inputValues.dbh[2] === 0
            ? ``
            : `${
                inputValues.dbh[2] > 0
                  ? `+${inputValues.dbh[2]}${String.raw`\sqrt{N}\cdot{H/100}`}`
                  : `${inputValues.dbh[2]}${String.raw`\sqrt{N}\cdot{H/100}`}`
              }`
        }}`}</TeX>
        <br />
        <TeX>{String.raw`\overline{R\footnotesize{y}} = V/V\tiny {Rf}`}</TeX>
        <br />
        <TeX>{String.raw`{V\tiny{Rf}} = ({${inputValues.treeVolume[0]}}H^{${
          inputValues.treeVolume[1]
        }}{${
          inputValues.treeVolume[2] > 0
            ? `+${inputValues.treeVolume[2]}`
            : `${inputValues.treeVolume[2]}`
        }}H^{${inputValues.treeVolume[3]}}/{N\tiny{Rf}})^{-1}`}</TeX>
        <br />
        <TeX>{String.raw`\log{N\tiny{Rf}} = {${inputValues.nrf}}{${
          Math.round(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (inputValues.treeVolume[3] - inputValues.treeVolume[1]) * 100000,
          ) / 100000
        }}\log{H}`}</TeX>
      </div>

      <div className="sdmd-katex-item sdmd-katex-description">
        <div className="explanation-item">
          <TeX>{String.raw`{\text{V:ha当たり材積}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`{\text{H:上層樹高}}`}</TeX>
        </div>
        <div className="explanation-item">
          <TeX>{String.raw`{\text{N:ha当たり本数}}`}</TeX>
        </div>
        <div className="explanation-item">
          <TeX>{String.raw`{\text{HF:林分形状高}}`}</TeX>
        </div>
        <div className="explanation-item">
          <TeX>{String.raw`{\text{G:ha当たり断面積}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`\overline{dg}{\text{:断面積平均直径}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`\overline{d}{\text{:平均胸腔直径}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`\overline{R\footnotesize{y}}{\text{:収穫比数}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`{V\tiny{Rf}}{\text{:最多密度におけるha当たり材積}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`{N\tiny{Rf}}{\text{:最多密度におけるha当たり本数}}`}</TeX>
        </div>
      </div>
    </div>
  );
};

export default SelectFormula;
