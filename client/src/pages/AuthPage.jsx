import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, headers, cleanError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(error);
    message(error);
    cleanError();
  }, [error, message]);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: [e.target.value],
    });
  };

  const registerHandler = async () => {
    try {
      const data = request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <>
      <h1>Shorting links</h1>
      <div className="w-full mx-auto px-6 py-4 max-w-sm rounded overflow-hidden shadow-lg">
        <div className="mx-auto">
          <div>
            <div className="py-4">
              <div className="font-bold text-x text-red-600l mb-2">
                Authenticate
              </div>
              <div>
                <div className="mb-5">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={changeHandler}
                    className=" border-b border-b-blue-500 py-2 w-full focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={changeHandler}
                    className=" border-b border-b-blue-500 py-2 w-full focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className=" pb-2 flex gap-x-4">
              <button
                disabled={loading}
                onClick={loginHandler}
                className="rounded-lg bg-blue-500 text-white py-1.5 px-3"
              >
                Sign in
              </button>
              <button
                disabled={loading}
                onClick={registerHandler}
                className="rounded-lg bg-blue-300 text-white py-1.5 px-3"
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
