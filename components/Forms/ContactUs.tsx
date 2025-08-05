"use client";

import Container from "@/components/Container";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { MapPinIcon, PhoneIcon, MailIcon as EnvelopeIcon } from "lucide-react";

export default function Contact({ settings }: { settings: any }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  }: any = useForm({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [formKey, setFormKey] = useState<number>(Math.random() * 10000);
  // Please update the Access Key in the Sanity CMS - Site Congig Page

  // Basic message sending
  async function onSubmit(data: any) {
    console.log(data, " => Data");
    try {
      const responseFromChanty = await fetch(
        "https://api.chanty.com/hooks/v2/TrO6g4uVssZgt7wqs8YkgEm6PynMtB6b2686FMtu/Dz9FgvtUq77r6dhKZNkU4LpF-DGWX9YzXyvBdURP/GHmh1EIrrUKrigZC6gJtjKZ2khWmjv4U1hXqc6JxWK7uUXW4C7c6oQdRQ6vP3Lcf8S3ZNF11buyIVTF6fJVVMHtuy97fSZLqrrCwrmKL9C4fvmSjoMFV2PPI2PiLngUtkC1ps2nQDm7N2F8rC9Fbzxr9uMVSV-HNtGZvRsjoNigocnEQVxbB9xHUOvV2Gou3dMW8ErIeMrUJCoyYMNoIzeCDE8NcoHiKrZwfFvhehcGkLcTDFWWn4S74JtRHTQTMwSKJUnPtFVDHggjbS1yO4c9i28UwGJmSfzomc6qg3scJcr4B8NE7NNvXZyykY41beQPcjObST4-UJqnNyoBTbv1nnQBEGCTQEJQrsg3MqxZFgsb8Lij34ptMxKfRqv2jI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: `Name: ${data?.name}; Email: ${data?.email}; Message: ${data?.message}`,
          }),
        }
      );
      console.log("responseFromChanty ", responseFromChanty);
      reset({
        values: null,
      });
      setFormKey(Math.random() * 10000);
      setIsSuccess(true);
      setMessage("Thanks for your time! We will connect with you shortly!");
      return responseFromChanty;
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage("Oops, something went wrong! Please try again.");
      throw error;
    }
  }

  return (
    <Container>
      {/* <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
        Contact
      </h1>
      <div className="text-center">
        <p className="text-lg">We are a here to help.</p>
      </div> */}

      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">
            Contact Lang Q
          </h2>
          <p className="max-w-sm mt-5">
            Have something to say? We are here to help. Fill up the form or send
            us a email.
          </p>

          <div className="mt-5">
            {/* <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <MapPinIcon size="20" className="relative" />
              <span>2, Hacker way, CA.</span>
            </div> */}
            {settings?.email && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <EnvelopeIcon size="20" className="relative" />
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
            )}
            {/* {settings?.phone && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <PhoneIcon size="20" className="relative" />
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              </div>
            )} */}
          </div>
        </div>
        <div>
          <form
            key={formKey}
            onSubmit={handleSubmit(onSubmit)}
            className="my-10"
          >
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            ></input>

            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 text-white rounded-md outline-none placeholder:text-gray-200 bg-gray-900 focus:ring-4 ${
                  errors.name
                    ? "border-red-600 focus:border-red-600 ring-0"
                    : "focus:border-gray-600 border-gray-600 focus:border-white ring-0"
                }`}
                {...register("name", {
                  required: "Name is required",
                  maxLength: 80,
                })}
              />
              {errors.name && (
                <div className="mt-1 text-red-600">
                  <small>{errors?.name?.message}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">
                Email address
              </label>
              <input
                id="email_address"
                type="email"
                placeholder="Email Address"
                // name="email"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 text-white rounded-md outline-none placeholder:text-gray-200 bg-gray-900 focus:ring-4  ${
                  errors.email
                    ? "border-red-600 focus:border-red-600 ring-0"
                    : "border-gray-600 focus:border-white ring-0"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <div className="mt-1 text-red-600">
                  <small>{errors.email.message}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                // name="message"
                placeholder="Your Message"
                className={`w-full px-4 py-3 border-2 text-white placeholder:text-gray-200 bg-gray-900 rounded-md outline-none h-36 focus:ring-4 ${
                  errors.message
                    ? "border-red-600 focus:border-red-600 ring-0"
                    : "focus:border-gray-600 border-gray-600 focus:border-white ring-0"
                }`}
                {...register("message")}
              />
              {errors.message && (
                <div className="mt-1 text-red-600">
                  {" "}
                  <small>{errors.message.message}</small>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 border-2"
            >
              {isSubmitting ? (
                <svg
                  className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {isSubmitSuccessful && isSuccess && (
            <div className="mt-3 text-sm text-center text-green-500">
              {message || "Success. Message sent successfully"}
            </div>
          )}
          {isSubmitSuccessful && !isSuccess && (
            <div className="mt-3 text-sm text-center text-red-500">
              {message || "Something went wrong. Please try later."}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
