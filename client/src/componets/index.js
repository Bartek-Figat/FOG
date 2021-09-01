/* eslint-disable no-unreachable */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { githubCheckIftLogin, githuUser } from '../global/slice';

export const Github = () => {
  return (
    <>
      <h1>Hello from Github profile</h1>
    </>
  );
};

export const Callback = () => {
  useEffect(() => {
    window.close();
  });
  return (
    <>
      <h1>Redirect...</h1>
    </>
  );
};

export const Login = () => {
  const history = useHistory();
  const githubWindow = () => {
    const url = `http://localhost:8080/login/github`;
    window.open(url, '_blank', 'width=500,height=600');
  };

  return (
    <>
      <h1>Hello from Github login</h1>
      <button
        onClick={() => {
          githubWindow();
        }}
      >
        GitHub Login
      </button>
    </>
  );
};
