import Base from '/@/component/base'
import SourceAnalysis from '/@/component/sourceAnalysis'

export const navConfig = [
  { text: '基础梳理', link: '/base' },
  { text: '手写', link: '/newFunction' },
  { text: '源码分析', link: '/sourceAnalysis' },
  { text: 'React', link: '/react' },
  { text: 'Git', link: '/git' }];

export const sidebarConfig = {
  '/base': [
    { text: 'base默认的', link: '/index', component: Base },
    { text: 'base1', link: '/home' },
    { text: 'base2', link: '/home1' }
  ],
  '/sourceAnalysis': [
    { text: 'sourceAnalysis默认的', link: '/index', component: SourceAnalysis },
  ]
}