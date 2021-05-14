import React from 'react'
import Link from 'next/link'
import { NextPageContext } from 'next'


type PageProps = {
  title: string
}

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps
}

const Login = (props: any) => {
  console.log(props);
  return <>Login      <Link href="/"><a>Login</a></Link>
  </>
}

Login.getInitialProps = (ctx: PageContext) => {
  console.log(`ctx`, ctx);
  return {
    title: ctx.query.title,
  }
}

export default Login
