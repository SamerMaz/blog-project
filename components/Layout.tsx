import React from 'react'
import { Header} from './'

type Props= {
  /** standard children prop: accepts any valid React Node */
  children: any;
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
        <Header/>
        {children}
    </>
  )
}

export default Layout