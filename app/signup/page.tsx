"use client";
import React from "react";
import dantxLogo from "@/public/assets/asset 6.svg";
import Image from "next/image";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import Heading from "@/components/common/headings/Heading";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "@/services/mutations";
import { registerType } from "@/types/registerType";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerType>();

  const registerMutation = useRegister();

  const handleRegisterSubmit: SubmitHandler<registerType> = (
    data: registerType
  ) => {
    registerMutation.mutate(data);
  };

  return (
    <section className=" w-full py-5 min-h-screen flex items-center justify-center bg-[#f2f6f9] px-5 md:px-0">
      <div>
        <div className="flex gap-3 justify-center mb-5">
          <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
          <Text color="text-neat-secondary">Dentex</Text>
        </div>
        <div className="bg-white p-8 md:w-[500px] rounded-lg">
          <div className="space-y-2">
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Heading>Sign Up</Heading>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <p>Already have an account?</p>
                <Link href={"/signin"} className=" text-neat-primary">
                  Sign in here
                </Link>
              </div>
              <Button
                fontSize="sm"
                mb="26px"
                width={"100%"}
                py="15px"
                h="50px"
                borderRadius="16px"
                _hover="#332941">
                <FaGoogle size={20} />
                <span className="ml-3">Sign in with Google</span>
              </Button>
            </div>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>
            <form
              action=""
              className="space-y-3"
              onSubmit={handleSubmit(handleRegisterSubmit)}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 4,
                      message: "Phone minimum length should be 8",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password minimum length should be 8",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  id="password_confirmation"
                  {...register("password_confirmation", {
                    required: "Password Confirmation is required",
                    minLength: {
                      value: 8,
                      message: "Password minimum length should be 8",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password_confirmation &&
                    errors.password_confirmation.message}
                </FormErrorMessage>
              </FormControl>
              <button className=" bg-neat-primary py-3 text-white rounded-md w-full text-center">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;