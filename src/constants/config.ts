import Base from '/@/component/base'
import TypescriptBase from "/@/component/typescript";
import TypescriptAdvanced from "/@/component/typescript";
import SourceAnalysis from "/@/component/sourceAnalysis";
import CalcTable from "/@/component/CalcTable";
import LayoutEffect from '/@/component/react/LayoutEffect';
import ReactUseEffect from "/@/component/react/ReactUseEffect";
import ReactUseCallback from "/@/component/react/ReactUseCallback";
import StrategyPattern from '/@/component/designPattern/StrategyPattern';
import Infer from "/@/component/typescript/Infer";

export const navConfig = [
  { text: "基础梳理", link: "/base" },
  { text: "Typescript", link: "/typescript" },
  { text: "手写", link: "/newFunction" },
  { text: "源码分析", link: "/sourceAnalysis" },
  { text: "React", link: "/react" },
  { text: "Git", link: "/git" },
  {text: '设计模式', link: "/designPattern"},
  { text: "Practice", link: "/practice" },
];

export const sidebarConfig = {
  "/base": [
    { text: "base默认的", link: "/index", component: Base },
    { text: "base1", link: "/home" },
    { text: "base2", link: "/home1" },
  ],
  "/typescript": [
    { text: "typescript基础", link: "/index", component: TypescriptBase },
    {
      text: "typescript进阶",
      link: "/advanced",
      component: TypescriptAdvanced,
    },
    {
      text: "Practices - infer",
      link: "/infer",
      component: Infer,
    },
  ],
  "/sourceAnalysis": [
    { text: "sourceAnalysis默认的", link: "/index", component: SourceAnalysis },
  ],
  "/designPattern": [
    { text: "策略模式", link: "/strategyPattern", component: StrategyPattern },
  ],
  "/practice": [
    { text: "practice默认的", link: "/index", component: CalcTable },
  ],
  "/react": [
    {
      text: "useLayoutEffect",
      link: "useLayoutEffect",
      component: LayoutEffect,
    },
    {
      text: "useEffect",
      link: "useEffect",
      component: ReactUseEffect,
    },
    {
      text: "useCallback",
      link: "useCallback",
      component: ReactUseCallback,
    },
  ],
};