"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function LocationPage() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(
        "https://lang-q.chanty.com/api/hooks/v2/V2S6YB-j60sj/hrbqWrbG-oXJvfSJ9UbuwTm8gCSp36wwz/C1vsMrAWpC4ygh1a5zJkPQBN7bDaUu-xr/UNphbPZ2gTd65V9CCZs2yrSQ7VM5gbF45Z-y-Y-Sj422fh1VqZju8Lkx9QoDc2DvrQApu18sqXSn1R9TeKVSKUJw7Hwti9K4RWK",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: "c7ce49f0-cc07-531f-b5c3-2a9ce36657d9",
            // text: `position: ${JSON.stringify(position)}`,
          }),
        }
      ).then((res) => {
        console.log("res => ", res);
      });
    }, 1000);
    // window.navigator.geolocation.getCurrentPosition(
    //   (position: GeolocationPosition) => {
    //     console.log(position, " position");
    //     try {
    //       fetch(
    //         "https://lang-q.chanty.com/api/hooks/v2/V2S6YB-j60sj/hrbqWrbG-oXJvfSJ9UbuwTm8gCSp36wwz/C1vsMrAWpC4ygh1a5zJkPQBN7bDaUu-xr/UNphbPZ2gTd65V9CCZs2yrSQ7VM5gbF45Z-y-Y-Sj422fh1VqZju8Lkx9QoDc2DvrQApu18sqXSn1R9TeKVSKUJw7Hwti9K4RWK",
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             text: "c7ce49f0-cc07-531f-b5c3-2a9ce36657d9",
    //             // text: `position: ${JSON.stringify(position)}`,
    //           }),
    //         }
    //       ).then((res) => {
    //         console.log("res => ", res);
    //       });
    //     } catch {}
    //   },
    //   (positionError: GeolocationPositionError) => {
    //     console.log(positionError, " positionError");
    //   }
    // );
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
