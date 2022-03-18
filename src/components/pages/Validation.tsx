/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as yup from 'yup';

const treeHeight = yup.number().required().typeError('半角数字で入力してください');
const more0 = yup
  .number()
  .required()
  .typeError('半角数字で入力してください')
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });

const minimumDensity = yup
  .number()
  .required()
  .typeError('半角数字で入力してください')
  .test(
    'minimumDensity',
    '最大の植林密度よりも小さい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value > id.parent.maximumDensity) {
        return false;
      }

      return true;
    },
  )
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });
const maximumDensity = yup
  .number()
  .required()
  .typeError('半角数字で入力してください')
  .test(
    'maximumDensity',
    '最小の植林密度よりも大きい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value < id.parent.minimumDensity) {
        return false;
      }

      return true;
    },
  )
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });

const minimumClearcut = yup
  .number()
  .required()
  .typeError('半角数字で入力してください')
  .test(
    'minimumClearcut',
    '最小の植林密度よりも小さい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value > id.parent.minimumDensity) {
        return false;
      }

      return true;
    },
  )
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });

const minimumThinning = yup
  .number()
  .required()
  .typeError('半角数字で入力してください')
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .lessThan(90, '90よりも小さい数字を入れてください')
  .test(
    'minimumThinning',
    '最大の間伐率よりも小さい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value > id.parent.maximumThinning) {
        return false;
      }

      return true;
    },
  );
const maximumThinning = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .lessThan(90, '90よりも小さい数字を入れてください')
  .typeError('半角数字で入力してください')
  .test(
    'maximumThinning',
    '最小の間伐率よりも大きい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value < id.parent.minimumThinning) {
        return false;
      }

      return true;
    },
  );

const annualProfit = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .lessThan(1, '1よりも小さい数字を入れてください')
  .typeError('半角数字で入力してください');

const ageOfStartThinning = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .typeError('半角数字で入力してください')
  .test(
    'ageOfStartThinning',
    '最大伐期よりも小さい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value > id.parent.ageOfEndThinning) {
        return false;
      }

      return true;
    },
  )
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });

const ageOfEndThinning = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .typeError('半角数字で入力してください')
  .test(
    'ageOfEndThinning',
    '間伐を開始する林齢よりも大きい数字を入れてください',
    (value, id) => {
      // @ts-ignore
      if (value < id.parent.ageOfStartThinning) {
        return false;
      }

      return true;
    },
  )
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });

const diamterValue = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .typeError('半角数字で入力してください')
  .test(
    'increase-right-diamter',
    '胸高直径は徐々に大きくしてください',
    (value, id) => {
      const inputId = Number(id.path.replace(/[^0-9]/g, ''));
      // @ts-ignore
      if (inputId !== 10) {
        // @ts-ignore
        if (id.options.from[1].value.diamter[inputId + 1].value < value) {
          return false;
        }
      }

      return true;
    },
  )
  .test(
    'increase-left-diamter',
    '胸高直径は徐々に大きくしてください',
    (value, id) => {
      const inputId = Number(id.path.replace(/[^0-9]/g, ''));
      // @ts-ignore
      if (inputId !== 0) {
        // @ts-ignore
        if (id.options.from[1].value.diamter[inputId - 1].value > value) {
          return false;
        }
      }

      return true;
    },
  )
  .test('isInteger', '整数で入力してください', (value) => {
    const isInteger = /^[+-]?[0-9]+\.[0-9]+([eE][+-]?[0-9]+)?$/;
    // @ts-ignore
    if (isInteger.test(value)) {
      return false;
    }

    return true;
  });

const yieldRate = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .lessThan(1, '1よりも小さい数字を入れてください')
  .typeError('半角数字で入力してください');

const stumpHeight = yup
  .number()
  .required()
  .moreThan(0, '0よりも大きい数字を入れてください。')
  .typeError('半角数字で入力してください');

const cut = {
  other: yup.object({
    yieldRate,
    cost: more0,
    stumpHeight,
  }),
  price: yup.array().of(
    yup.object().shape({
      value: more0,
    }),
  ),
  diamter: yup.array().of(
    yup.object().shape({
      value: diamterValue,
    }),
  ),
};

const schema = yup
  .object({
    treeGrowth: yup.object({
      treeHeight: yup.array().of(
        yup.object().shape({
          value: treeHeight,
        }),
      ),
    }),
    management: yup.object({
      minimumDensity,
      maximumDensity,
      minimumClearcut,
      reforestationCost: more0,
      priceSaplings: more0,
      minimumThinning,
      maximumThinning,
      annualProfit,
      ageOfStartThinning,
      ageOfEndThinning,
      thinningInterval: more0,
      maximumNumberOfThinning: more0,
    }),
    thinning: yup.object(cut),
    clearCut: yup.object(cut),
  })
  .required();

export default schema;
