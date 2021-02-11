import React from "react"
import PropTypes, { string } from "prop-types"

import Header from "./Header/header"
import '../global.scss'
import layoutStyles from './layout.module.scss'
const Layout = ({ children }, active) => {

  return (
    <div className= {layoutStyles.container} >
      <Header active={active} title='Google for a Day'/>
      <main>
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  active: string,
}

export default Layout
