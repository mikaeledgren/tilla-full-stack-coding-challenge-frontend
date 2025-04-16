import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return <div className="max-w-3xl px-5 py-5 mx-auto md:px-0 md:py-10">{children}</div>
}

export default Layout
