import React from "react";
import { auth } from "../../config/firebaseConfig";
import db from "../../config/firebaseConfig";
import "./signUp.scss";
import AccessCheck from "../../common/AccessCheck";

export default function SignUp() {
  const createNewUser = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const newUser = await auth.createUserWithEmailAndPassword(email, password);

    // Create new subcollection
    await db.collection("users").doc(newUser.user.uid).collection("liked").add({
      liked: 0,
    });

    // Set new user data
    await db.collection("users").doc(newUser.user.uid).set({
      name: userName,
      isAdmin: false,
    });
    window.location.href = "/";
  };

  return (
    <>
      <AccessCheck />
      <div className="signUpContainer">
        <form className="signUpForm" onSubmit={createNewUser}>
          <h1 className="signUpTitle">Create Account</h1>

          <label className="signUpFormLabel">
            Full Name:
            <input
              name="username"
              type="text"
              className="signUpFormInput"
              required
            />
          </label>

          <label className="signUpFormLabel">
            Email:
            <input
              name="email"
              type="email"
              className="signUpFormInput"
              required
            />
          </label>

          <label className="signUpFormLabel">
            Password:
            <input
              name="password"
              type="password"
              className="signUpFormInput"
              required
            />
          </label>

          <button className="signUpFormBtn">Sign Up</button>
        </form>
      </div>
    </>
  );
}
