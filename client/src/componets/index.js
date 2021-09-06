/* eslint-disable no-unreachable */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { instance } from '../config/index';
import { github, githubCheckIfLogin } from '../global/slice';

export const Github = () => {
  const [userCredentials, setUserCredentials] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await instance.get(`user/detail`, { withCredentials: true });
        console.log(data);
        setUserCredentials(data);
      } catch (err) {
        if (err) {
        }
      }
    }
    fetchData();
  }, []);
  return (
    <>
      {userCredentials ? (
        Object.values(userCredentials).map((details) => {
          return (
            <h1>
              Hello: <span> {details.login} </span>{' '}
            </h1>
          );
        })
      ) : (
        <h1>Hello from Github profile</h1>
      )}
    </>
  );
};

export const Callback = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function redirectAfterConfirmation() {
    return history.push('/admin');
  }

  function errorRedirect() {
    return history.push('/login');
  }

  const str = history.location.pathname;

  const path = str.split('/');
  console.log(path[3]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await instance.get(`api/success/activated/${path[3]}`, {
          withCredentials: true,
        });
        console.log(data);
        redirectAfterConfirmation();
      } catch (err) {
        if (err) {
          errorRedirect();
        }
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
