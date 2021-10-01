/* eslint-disable no-unreachable */
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { instance } from '../config/index';
import { github, githubCheckIfLogin } from '../global/slice';
import { linkNavigation } from '../routers/index';

async function Logout() {
  const history = useHistory();
  await instance.delete(`logout`, { withCredentials: true });
  history.push('/');
}

export const Github = () => {
  const [userCredentials, setUserCredentials] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await instance.get(`user/detail`, { withCredentials: true });
        console.log(data)
        setUserCredentials(data);
        history.push('/admin');
      } catch (err) {
        console.log('Error', err);
        if (err) {
          window.location.href = '/login';
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
            <h1 key={details.login}>
              Hello: <span> {details.login} </span>{' '}
            </h1>
          );
        })
      ) : (
        <h1>Hello from Github profile</h1>
      )}
      <button className="nav-link logout-btn" onClick={() => Logout()}>
        Sign out{' '}
      </button>
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
        await instance.get(`api/success/activated/${path[3]}`, {
          withCredentials: true,
        });
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

export const Main = () => {
  const history = useHistory();
  return (
    <>
      <header className="flex flex-col w-full fixed delay-75 ease-out bg-green-600 p-1">
        <div className="w-full p-2 bg-red-400">
          <nav className="flex justify-center  p-1 bg-yellow-200">
            {Object.values(linkNavigation).map((link) => {
              return (
                <Link className="p-3  bg-green-200" key={link.name} to={link.target}>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
};
