import React from 'react';
import '../assets/css/signIn_signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import myImage from '../assets/logo.webp';

export function SignInForm() {
  return (
    <div className="container-fluid main-con d-flex min-h-100% ">
  <div className="row min-h-100%">
    <div className="col-lg-6 col-md-6 col-sm-12 min-h-100%">
      <div className="first-col d-flex flex-column">
        <div className="row">
          <div className="div-logo col-lg-2 col-md-2 col-sm-12">
            <div className="logo">
              <img src={myImage} className="img-fluid mb-3" alt="logo"/>
            </div> 
          </div>
          <div className="div-name col-lg-10 col-md-10">
            <div className="co-name">
              <h3>Khareed-Ghar </h3>
            </div>
          </div>
        </div>
        <div className="welcome-note mb-3">
          <h3 className="mb-1">Welcome</h3>
          <p>Back</p>
        </div>
        <div className="form-area">
          <input
            type="email"
            placeholder="Email"
            id=""
            className="w-100 mb-3 form-control"
          />
          <input
            type="password"
            placeholder="Password"
            id=""
            className="w-100 mb-5 form-control"
          />
        </div>
        <div className="loginButton">
          <button type="submit" className="w-100 mb-1 btn-primary form-control">
            Login
          </button>
        </div>
        <div className="para">
          <small>
            Doesn't have an account gg <a href="./signupForm.js">click here</a>
          </small>
        </div>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className="second-col">
        <div className="Introductory-note">
          <h3>What is Lorem Ipsum?</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}