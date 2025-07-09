"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, ShimmerButton } from "../ui/button";
import { Input } from "../ui/input";

function redirectWithAnchor(url: string, newTab: boolean = false) {
  const a = document.createElement("a");
  a.href = url;
  a.style.display = "none"; // optional, hide it
  if (newTab) {
    a.target = "_blank";
    a.rel = "noopener noreferrer"; // security best practice
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function SignUpButton() {
  function redirectToSignupPage() {
    const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/sign-up`;
    redirectWithAnchor(url, true);
  }

  return (
    <ShimmerButton onClick={redirectToSignupPage}>
      Get started for free
    </ShimmerButton>
  );
}

function openCalendlyInNewTab() {
  const url = "https://calendly.com/team-lang-q/30min";
  window.open(url, "_blank");
}

function BookADemoButton() {
  return (
    <Button variant="default" onClick={openCalendlyInNewTab}>
      Book a Demo
    </Button>
  );
}

function isEmailValid(email: string, setError: (errorMessage: string) => void) {
  let isValid = true;
  if (!email?.length) {
    if (setError) setError("Email is required.");
    isValid = false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    if (setError) setError("Email is invalid.");
    isValid = false;
  }

  return isValid;
}

function sendSupportNotification(emailId?: string) {
  return fetch(
    "https://ymsreanckxyrthosfqiq.supabase.co/functions/v1/support",
    {
      method: "POST",
      body: JSON.stringify({
        type: "message",
        content: `${emailId} has requested for Callback.`,
      }),
    }
  )
    .then((res) => {
      alert("Callback request sent!");
      // notification.show("Yay! We will contact you shortly.", {
      //   severity: "success",
      //   autoHideDuration: 3000,
      // });
    })
    .catch((err) => {
      alert("Callback request failed!");
      // notification.show(
      //   "Oops, Looks like like a one time error. Please try again.",
      //   {
      //     severity: "error",
      //   }
      // );
    });
}

function RequestACallBack() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [showForm, setShowForm] = useState<boolean>(false);

  function submitRequest() {
    const validEmail = isEmailValid(email, setError);
    if (validEmail) {
      setError("");
      sendSupportNotification(email).finally(() => {
        setShowForm(false);
      });
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-64 m-auto text-center">
      {showForm ? (
        <div className="text-left">
          <Input
            type="email"
            title="Email"
            id="Email"
            placeholder="Enter your email Id"
            value={email}
            onChange={(e: ChangeEvent | any) => {
              setEmail(e.target.value);
            }}
          />
          {error?.length ? (
            <span className="text-red-600 text-xs pl-1">* {error}</span>
          ) : null}
        </div>
      ) : null}
      <Button
        variant="default"
        onClick={showForm ? submitRequest : () => setShowForm(true)}
      >
        {showForm ? "Submit Request" : "Request a Call back"}
      </Button>
    </div>
  );
}

export { SignUpButton, redirectWithAnchor, BookADemoButton, RequestACallBack };
