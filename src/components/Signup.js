import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';




// const host=process.env.REACT_APP_BACKEND_URL;
const host = "https://inotebookbackend-a8d5.onrender.com";


export default function Signup() {

  const { setIsLoading, setModalFlag, setModalVal } = useContext(NoteContext);

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async function (event) {
    event.preventDefault();
    //seting the isLoading true
    // setIsLoading(true);
    if (credentials.password != credentials.cpassword) {
      // alert("Password and Conform password doesn't match....!");
      setModalFlag(true);
      setModalVal({ type: "error", msg: "Password and Conform password doesn't match....!" })
      return;
    }
    setIsLoading(true);
    let url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);
    //set IsLoaging false
    setIsLoading(false);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('inotebook_token', json.authtoken);
      // history.push("/");
      navigate('/');
      setTimeout(() => {
        // alert("Signup Successful");
        setModalFlag(true);
        setModalVal({ type: "success", msg: "Signup Successful" })
      }, 300);

    }
    else {

      setTimeout(() => {
        // alert(json.error);
        setModalFlag(true);
        setModalVal({ type: "error", msg: json.error })
      }, 300);
    }
  }

  const onChange = function (event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };


  return (
    <div className='container d-flex justify-content-center my-5 '>
      <form onSubmit={handleSubmit}>
        <div className='border border-primary border-3 p-5'>
          <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Signup</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
            <div id="emailHelp" className="form-text">Forget password option is not available yet, so please remember your password</div>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label"><strong>Confirm Password</strong></label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </div>

      </form>
    </div>
  )
}
