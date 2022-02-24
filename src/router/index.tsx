import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '/@/component/Home'
import NoMatch from '/@/component/NoMatch'

import { navConfig, sidebarConfig } from '/@/constants/config'

const generateRouter = () => {
  let routers: any[] = []
  navConfig.forEach((config) => {
    const { link, component } = config
    if (component) {
      routers.push(<Route path={link} exact component={component} />)
    }

    const sidebarC = sidebarConfig[link]
    if (sidebarC) {
      sidebarC.forEach((c) => {
        let { link: sidebarLink, component: sidebarComp } = c
        sidebarLink = `${link}${sidebarLink}`
        if (!sidebarComp) {
          sidebarComp = NoMatch
          console.log(link, c, 'no component to match...')
        }

        routers.push(
          <Route
            path={sidebarLink}
            key={sidebarLink}
            exact
            component={sidebarComp}
          />
        );
      })
    }
  })

  return routers
}

function RootRoute() {
  const [routers, setRouters] = useState([])
  useEffect(() => {
    const rs = generateRouter()
    setRouters(rs)
  }, [])
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/base/index" exact component={Base} /> */}
      {routers}
      <Route component={NoMatch} />
    </Switch>
  )
}

export default RootRoute
