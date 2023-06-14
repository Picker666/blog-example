import Base from '/@/component/Base';
import Var from '/@/component/Base/var';
import RegExp from '/@/component/Base/RegExp';
import EventLoop from '/@/component/Base/EventLoop';
import InterviewIndex from '/@/component/Base/interview';
import InterviewScope from '/@/component/Base/interview/scope';
import SetMap from '/@/component/Base/SetMap';
import ColumnsLayout from '/@/component/Base/columnsLayout';
import DeDuplication from '/@/component/Base/deDuplication';
import Flex from '/@/component/Base/Flex';
import Inherit from '/@/component/Base/Inherit';
import ClassInherit from '/@/component/Base/classInherit';
import TriangleStyle from '/@/component/Base/triangleStyle';
import ImageLazyLoading from '/@/component/Base/ImageLazyLoading';
import Position from '/@/component/Base/Position';
import Center from '/@/component/Base/Center';
import WebWorker from '/@/component/Base/WebWorker';

import TypescriptBase from '/@/component/typescript';
import KeyOf from '/@/component/typescript/keyof';
import TypescriptAdvanced from '/@/component/typescript';
import SourceAnalysis from '/@/component/sourceAnalysis';
import Infer from '/@/component/typescript/Infer';

import CalcTable from '/@/component/practice/CalcTable';
// import ExcelTable from '/@/component/practice/ExcelTable';

import ReactUseState from '../component/react/ReactUseState';
import LayoutEffect from '/@/component/react/LayoutEffect';
import ReactUseEffect from '/@/component/react/ReactUseEffect';
import ReactUseCallback from '/@/component/react/ReactUseCallback';
import ReactUseRef from '/@/component/react/ReactUseRef';
import UseCallbackPractice from '/@/component/react/UseCallbackPractice';

import StrategyPattern from '/@/component/designPattern/StrategyPattern';
import FactoryPattern from '/@/component/designPattern/FactoryPattern';
import Observer from '/@/component/designPattern/Observer';
import PublishSubscriber from '/@/component/designPattern/PublishSubscriber';

import Algorithm from '/@/component/algorithm';
import Sorting from '/@/component/algorithm/Sorting';
import Algorithm1 from '/@/component/algorithm/Algorithm1';
import TestAlgorithm from '/@/component/algorithm/TestAlgorithm';
import MaxDuplication from '/@/component/algorithm/MaxDuplication';
import Fibonacci from '/@/component/algorithm/Fibonacci';
import Palindrome from '/@/component/algorithm/Palindrome';
import VersionSorting from '/@/component/algorithm/VersionSorting';
import FindMin from '/@/component/algorithm/FindMin';
import ArrayDistrub from '/@/component/algorithm/ArrayDistrub';
import ArraryFlat from '/@/component/algorithm/ArraryFlat';

import NewFunction from '/@/component/newFunction';
import CallApply from '/@/component/newFunction/CallApply';
import Promise from '/@/component/newFunction/Promise';
import Bind from '/@/component/newFunction/Bind';
import Throttle from '/@/component/newFunction/Throttle';
import Debounce from '/@/component/newFunction/Debounce';
import AsyncAwait from '/@/component/newFunction/AsyncAwait';
import DeepCopy from '/@/component/newFunction/DeepCopy';

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
    { text: 'testing', link: '/testing', component: Base },
    { text: 'var', link: '/var', component: Var },
    { text: 'regExp', link: '/regExp', component: RegExp },
    { text: 'event loop', link: '/eventLoop', component: EventLoop },
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
    { text: 'inherit', link: '/inherit', component: Inherit },
    { text: 'classInherit', link: '/classInherit', component: ClassInherit },
    { text: 'triangleStyle', link: '/triangleStyle', component: TriangleStyle },
    { text: 'imageLazyLoading', link: '/imageLazyLoading', component: ImageLazyLoading },
    { text: 'position', link: '/position', component: Position },
    { text: 'center', link: '/center', component: Center },
    { text: 'webWorker', link: '/webWorker', component: WebWorker },
  ],
  '/typescript': [
    { text: 'typescript基础', link: '/index', component: TypescriptBase },
    { text: 'KeyOf', link: '/keyOf', component: KeyOf },
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
    { text: 'callApply', link: '/callApply', component: CallApply },
    { text: 'promise', link: '/promise', component: Promise },
    { text: 'bind', link: '/bind', component: Bind },
    { text: 'throttle', link: '/throttle', component: Throttle },
    { text: 'debounce', link: '/debounce', component: Debounce },
    { text: 'asyncAwait', link: '/asyncAwait', component: AsyncAwait },
    { text: 'deepCopy', link: '/deepCopy', component: DeepCopy },
  ],
  '/sourceAnalysis': [{ text: 'sourceAnalysis默认的', link: '/index', component: SourceAnalysis }],
  '/designPattern': [
    { text: '策略模式', link: '/strategyPattern', component: StrategyPattern },
    { text: '工厂模式', link: '/factoryPattern', component: FactoryPattern },
    { text: '观察者模式', link: '/observer', component: Observer },
    { text: '观察者模式', link: '/publishSubscriber', component: PublishSubscriber },
  ],
  '/practice': [
    { text: 'practice默认的', link: '/index', component: CalcTable },
    // { text: 'excelTable', link: '/excelTable', component: ExcelTable },
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
    { text: '排序testing', link: '/index', component: Algorithm },
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
    { text: '版本号排序', link: '/versionSorting', component: VersionSorting },
    { text: '找出最小值', link: '/findMin', component: FindMin },
    { text: '打乱数据', link: '/arrayDistrub', component: ArrayDistrub },
    { text: '数组扁平化', link: '/arraryFlat', component: ArraryFlat },
  ],
};
