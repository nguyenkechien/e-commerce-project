import React from 'react'
import Link from 'next/link'

const Home = (props: any) => {
  console.log(`inldex`);
  return (
    <>
      Home
      <Link href="/login"><a>Login</a></Link>
    </>
  )
}
export default Home
