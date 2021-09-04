/* eslint-disable no-unreachable */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { instance } from '../config/index';
import { github, githubCheckIfLogin } from '../global/slice';

export const Github = () => {
  return (
    <>
      <h1>Hello from Github profile</h1>
    </>
  );
};

export const Callback = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  function redirectAfterConfirmation() {
    return history.push('/admin');
  }
  const str = history.location.pathname;

  const path = str.split('/');
  console.log(path[3]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await instance.get(`login/success/activated/${path[3]}`);
        console.log(data);
        redirectAfterConfirmation();
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Redirect...</h1>
    </>
  );
};

export const Login = () => {
  const githubWindow = async () => {
    window.location.href = 'http://localhost:8080/login/github';
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

export const Detail = () => {
  return (
    <>
      <h1>Detail</h1>
    </>
  );
};
