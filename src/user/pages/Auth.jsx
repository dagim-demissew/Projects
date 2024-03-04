import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIelements/Card";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler,setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login(true);
    console.log(formState.inputs);
  };

  const switchModeHandler = () => {
    if(!isLoginMode){
        setFormData({
            ...formState.inputs,
            name: undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    }else{
        setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            }

        },false)
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const auth = useContext(AuthContext);
  return (
    <Card className="authentication">
      <h2> Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            lable="Your name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Name is required for this field"
            onInput={inputHandler}
            />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          lable="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          lable="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password for your account (min length 8)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
