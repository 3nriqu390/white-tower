import { Link } from "gatsby"
import React from "react"
import headerStyles from './header.module.scss'

const Header = ({title}) => (
  <header className={headerStyles.header}>
    <h1><Link className={headerStyles.title} to="/search">{title}</Link></h1>
    <nav>
      <ul className={headerStyles.navList}>
        <li>
          <Link activeClassName={headerStyles.active} className={headerStyles.navItem} to="/search">Search</Link>
        </li>
        <li>
          <Link activeClassName={headerStyles.active} className={headerStyles.navItem} to="/">Index</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
