import React, { FormEvent, useState } from 'react';
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
    if (res.data.success) {
      window.location.href = '/'
    }
  }
  return (
    <React.Fragment>
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

export default Login
