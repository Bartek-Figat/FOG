/* eslint-disable no-unreachable */
import React, { useEffect } from 'react';
import { useCookies, Cookies } from 'react-cookie';
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
  return (
    <>
      <h1>Callback!!!!</h1>
    </>
  );
};

export const Login = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const cookie = new Cookies();
  // console.log(cookie.get('connect.sid'));

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await axios.get('http://localhost:8080/user', { withCredentials: true });
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const githubWindow = () => {
    const url = `http://localhost:8080/auth/github/callback`;
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
