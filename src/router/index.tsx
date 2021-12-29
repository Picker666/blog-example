import { Switch, Route } from 'react-router-dom'

import Home from '/@/component/Home'
import Base from '/@/component/Base/'
import NoMatch from '/@/component/NoMatch'

function RootRoute() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/base/" component={Base} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export default RootRoute
