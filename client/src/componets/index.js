/* eslint-disable no-unreachable */
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { instance } from '../config/index';
import { github, githubCheckIfLogin } from '../global/slice';
import { linkNavigation } from '../routers/index';

async function Logout() {
  const history = useHistory();
  await instance.delete(`logout`);
  history.push('/');
}

export const Github = () => {
  const [userCredentials, setUserCredentials] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await instance.get(`user/detail`, { withCredentials: true });
        if (data.statusCode) return history.push('/login');

        setUserCredentials(data);
      } catch (err) {
        console.log(err.data);
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

export const Main = () => {
  const history = useHistory();
  return (
    <>
      <header className="mb-8">
        <div className=" flex flex-col items-center xl:flex-row xl:items-stretch">
          <nav className=" mt-2 flex-1 flex xl:mt-0 justify-center xl:justify-end p-3 group">
            {Object.values(linkNavigation).map((link) => {
              return (
                <Link
                  className="p-1 flex flex-shrink-0 text-sm lg:text-lg lg:px-6 xl:px-8 xl:text-xl"
                  key={link.name}
                  to={link.target}
                >
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
