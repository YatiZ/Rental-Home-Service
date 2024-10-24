"use client";
import { CustomBtn } from "@/components";
import AuthBox from "@/components/AuthBox";
import Link from "next/link";
import React, { useState } from "react";
import apiService from "../services/apiService";
import { handleLogin } from "../lib/action";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const submitLogin = async(e:React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password
    }

    const response = await apiService.post('/api/jwt/create/', formData);
    
    console.log('Login response:',response)
    console.log('Login response access:',response.access)
    if(response.access){

      const accessToken = response.access;
      const refreshToken = response.refresh;

      //fetch user details with the access token
      const userResponse = await axios.get('http://localhost:8000/api/users/me/',{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Id',userResponse.data.id);
      if(userResponse && userResponse.data.id){
        handleLogin(userResponse.data.id, accessToken, refreshToken);
        setSuccessMessage('Login Successfully')
        router.push('/');
      }

     
       
    }else{
      setErrors(response)
    }
  };
  return (
    <section className="container mx-auto px-0 w-fit md:tracking-wider lg:tracking-wider tracking-normal">
      <div className="flex flex-row md:border lg:border justify-center gap-10 md:shadow-lg lg:shadow-lg md:m-10 m-0 md:py-10 py-8 border-none">
        <p>{successMessage}</p>
        <div className="border md:mx-20 lg:mx-20 mx-5 p-10 shadow-lg">
          <h1 className="text-xl font-bold leading-relaxed">Login</h1>
          <p className="text-sm">
            Doesn't have an account yet?
            <Link href="Signup" className=" font-bold underline text-blue-400">
              Sign Up
            </Link>
          </p>
          <form className="flex flex-col gap-y-4 mt-3" onSubmit={submitLogin}>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Email Address</label>
              <input
                type="text"
                placeholder="youremail@gmail.com"
                className="auth__input"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="flex-col flex">
              <div className="flex justify-between">
                <label className="text-sm my-2">Password</label>
                <span className="text-sm my-2 underline text-blue-400">
                  Forget Password
                </span>
              </div>

              <input
                type="password"
                placeholder="Your Password"
                className="auth__input"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-2">
              <input type="checkbox" />
              <label className="text-sm">Remember me</label>
            </div>

            <div className="">
              <CustomBtn
                btnType="submit"
                btnStyles="bg-blue-500 p-2 rounded-md text-center text-white w-full"
                btnName="Login"
              />
            </div>
          </form>

          <div className="flex mt-5 gap-3">
            <button
              type="button"
              className="border flex items-center gap-2 border-red-500 rounded-md px-6 py-2 w-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="border border-blue-500 rounded-md flex items-center gap-2 px-6 py-2 w-40"
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>
        <div className="md:flex hidden">
          <AuthBox />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
