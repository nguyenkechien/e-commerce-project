import React, { FormEvent, useState } from 'react';
import { Head } from '@react-ssr/nestjs-express';
import { http } from '../../utils/http'
interface IndexProps {

}

const Login = (props: IndexProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { email, password }
    console.log(data);
    console.log(event);
    const res = await http.post('/auth/login', data)
    console.log(res);
  }
  return (
    <React.Fragment>
      <Head>
        <title>An example of @react-ssr/nestjs-express</title>
      </Head>
      <form action="/auth/login" method="post" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="text" name="emai" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </React.Fragment>
  );
};

const reducer = (state: any, action: any) => {

}

const initialState = {
}

export default Login
