import Base from '/@/component/Base'
import InterviewIndex from '/@/component/Base/interview';
import InterviewScope from '/@/component/Base/interview/scope';
import SetMap from '/@/component/Base/SetMap'
import ColumnsLayout from '/@/component/Base/columnsLayout'
import DeDuplication from '/@/component/Base/deDuplication'
import Flex from '/@/component/Base/Flex'

import TypescriptBase from "/@/component/typescript";
import TypescriptAdvanced from "/@/component/typescript";
import SourceAnalysis from "/@/component/sourceAnalysis";
import Infer from "/@/component/typescript/Infer";

import CalcTable from "/@/component/CalcTable";

import ReactUseState from '../component/react/ReactUseState';
import LayoutEffect from '/@/component/react/LayoutEffect';
import ReactUseEffect from "/@/component/react/ReactUseEffect";
import ReactUseCallback from "/@/component/react/ReactUseCallback";
import ReactUseRef from "/@/component/react/ReactUseRef";
import UseCallbackPractice from '/@/component/react/UseCallbackPractice'

import StrategyPattern from '/@/component/designPattern/StrategyPattern';
import FactoryPattern from '/@/component/designPattern/FactoryPattern';

import Sorting from '/@/component/algorithm/Sorting';
import Algorithm1 from '/@/component/algorithm/Algorithm1';
import TestAlgorithm from '/@/component/algorithm/TestAlgorithm'
import MaxDuplication from '/@/component/algorithm/MaxDuplication'
import Fibonacci from '/@/component/algorithm/Fibonacci'
import Palindrome from '/@/component/algorithm/Palindrome'

import NewFunction from '/@/component/newFunction';
import Promise from '/@/component/newFunction/Promise';
import Bind from '/@/component/newFunction/Bind';
import Throttle from '/@/component/newFunction/Throttle';
import Debounce from '/@/component/newFunction/Debounce';

export const navConfig = [
  { text: '基础梳理', link: '/base' },
  { text: 'Typescript', link: '/typescript' },
  { text: '手写', link: '/newFunction' },
  { text: '源码分析', link: '/sourceAnalysis' },
  { text: 'React', link: '/react' },
  { text: 'Git', link: '/git' },
  { text: '设计模式', link: '/designPattern' },
  { text: 'Practice', link: '/practice' },
  { text: '算法', link: '/algorithm' },
];

export const sidebarConfig = {
  '/base': [
    { text: 'envent loop', link: '/index', component: Base },
    { text: 'interview', link: '/interview/index', component: InterviewIndex },
    {
      text: 'interviewScope',
      link: '/interview/scope',
      component: InterviewScope,
    },
    { text: 'base1', link: '/home' },
    { text: 'SetMap', link: '/setMap', component: SetMap },
    { text: 'ColumnsLayout', link: '/columnsLayout', component: ColumnsLayout },
    { text: 'DeDuplication', link: '/deDuplication', component: DeDuplication },
    { text: 'Flex', link: '/flex', component: Flex },
  ],
  '/typescript': [
    { text: 'typescript基础', link: '/index', component: TypescriptBase },
    {
      text: 'typescript进阶',
      link: '/advanced',
      component: TypescriptAdvanced,
    },
    {
      text: 'Practices - infer',
      link: '/infer',
      component: Infer,
    },
  ],
  '/newFunction': [
    { text: 'newFunction', link: '/newFunction', component: NewFunction },
    { text: 'promise', link: '/promise', component: Promise },
    { text: 'bind', link: '/bind', component: Bind },
    { text: 'throttle', link: '/throttle', component: Throttle },
    { text: 'debounce', link: '/debounce', component: Debounce },
  ],
  '/sourceAnalysis': [
    { text: 'sourceAnalysis默认的', link: '/index', component: SourceAnalysis },
  ],
  '/designPattern': [
    { text: '策略模式', link: '/strategyPattern', component: StrategyPattern },
    { text: '工厂模式', link: '/FactoryPattern', component: FactoryPattern },
  ],
  '/practice': [
    { text: 'practice默认的', link: '/index', component: CalcTable },
  ],
  '/react': [
    {
      text: 'useState',
      link: 'useState',
      component: ReactUseState,
    },
    {
      text: 'useLayoutEffect',
      link: 'useLayoutEffect',
      component: LayoutEffect,
    },
    {
      text: 'useEffect',
      link: 'useEffect',
      component: ReactUseEffect,
    },
    {
      text: 'useCallback',
      link: 'useCallback',
      component: ReactUseCallback,
    },
    {
      text: 'useRef',
      link: 'useRef',
      component: ReactUseRef,
    },
    {
      text: 'useCallbackPractice',
      link: 'useCallbackPractice',
      component: UseCallbackPractice,
    },
  ],
  '/algorithm': [
    { text: '排序算法', link: '/sorting', component: Sorting },
    { text: '算法题1', link: '/algorithm1', component: Algorithm1 },
    { text: '合并数组', link: '/testAlgorithm', component: TestAlgorithm },
    {
      text: '最大重复数组',
      link: '/maxDuplication',
      component: MaxDuplication,
    },
    { text: '斐波那契数列', link: '/fibonacci', component: Fibonacci },
    { text: '回文', link: '/palindrome', component: Palindrome },
  ],
};