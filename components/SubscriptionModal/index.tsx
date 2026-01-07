"use client";

import { createPortal } from "react-dom";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

let timer: ReturnType<typeof setTimeout>;

const SubscriptionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Optional: Show the modal after a delay or based on a condition
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // Check if the user has already seen the modal (e.g., using local storage)
      const hasSeenModal = sessionStorage.getItem("hasSeenNewsletterModal");
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Mark that the user has seen the modal to prevent repeated pop-ups
    sessionStorage.setItem("hasSeenNewsletterModal", "true");
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    const emailInput: any = document.getElementById("email");
    const csrftoken = document.cookie
      .split("; ")
      .find((r) => r.startsWith("csrftoken="))
      ?.split("=")[1];

    fetch(
      `${process.env.NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT}/public/subscribe/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accountId: process.env.NEXT_PUBLIC_MARK_EXEC_ACCOUNT_ID || "",
        },
        body: JSON.stringify({
          email: emailInput?.value,
          name: emailInput?.value?.split("@")?.[0],
          // accountId:
          //   "YXJ1bmV0MDAxQGdtYWlsLmNvbQ==.b7adf66e4c11887795c1ff2c438f1419",
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res, " response ");
        setTimeout(() => {
          closeModal();
        }, 100);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed w-screen h-screen z-20 bg-black backdrop-blur-sm bg-opacity-15 top-0 left-0 right-0 bottom-0"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black p-8 rounded-lg shadow-lg max-w-md w-full border-gray-300 border">
        <button
          className="absolute top-4 right-10 cursor-pointer text-gray-400 hover:text-gray-200"
          onClick={closeModal}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-300 mb-6">
          Stay updated with the latest news, trends, and special offers.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-none focus:ring-blue-500 mb-4 bg-black border-gray-600 text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
};

export default SubscriptionModal;
