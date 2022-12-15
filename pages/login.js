import Image from "next/image";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LogIn() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" col-span-1 ">
          <div className="w-full h-full">
            <Image
              src={"/undraw_step_to_the_sun_nxqq.svg"}
              width={786}
              height={606}
              objectFit="contain"
              alt="Brand logo"
            />
          </div>
        </div>
        <div className=" content-center p-8 mt-12">
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-4xl">Login</h1>
            <div className="mb-4">
              <label htmlFor="email">
                Email
                <br />
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
                className="w-9/12"
                id="email"
                autoFocus
              ></input>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password
                <br />
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Please enter password",
                  minLength: {
                    value: 6,
                    message: "password is more than 5 chars",
                  },
                })}
                className="w-9/12"
                id="password"
                autoFocus
              ></input>
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4 ">
              <button className="primary-button">Login</button>
            </div>
            <div className="mb-4 ">
              Don&apos;t have an account? &nbsp;
              <Link href={`/register?redirect=${redirect || "/"}`}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
