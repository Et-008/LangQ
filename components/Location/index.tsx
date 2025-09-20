"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LocationPage() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const iseNewVisitSent = sessionStorage.getItem("newVisit");
      // const isLocationSent = sessionStorage.getItem("locationSent");
      if (!iseNewVisitSent) {
        try {
          const supabase = createClient();
          const metrics = {
            userAgent: navigator?.userAgent,
            deviceType: /Mobi|Android/i.test(navigator?.userAgent)
              ? "mobile"
              : "desktop",
            platform: navigator?.platform,
            os: (() => {
              const ua = navigator?.userAgent;
              if (/Windows NT/i.test(ua)) return "Windows";
              if (/Mac OS X/i.test(ua)) return "macOS";
              if (/Android/i.test(ua)) return "Android";
              if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
              if (/Linux/i.test(ua)) return "Linux";
              return "Unknown";
            })(),
            browser: (() => {
              const ua = navigator?.userAgent;
              if (/chrome|crios|crmo/i.test(ua)) return "Chrome";
              if (/firefox|fxios/i.test(ua)) return "Firefox";
              if (/safari/i.test(ua) && !/chrome|crios/i.test(ua))
                return "Safari";
              if (/edg/i.test(ua)) return "Edge";
              return "Other";
            })(),
            browserVersion: (() => {
              const match = navigator?.userAgent?.match(
                /(Chrome|Firefox|Safari|Edg)\/([\d.]+)/i
              );
              return match ? match[2] : "Unknown";
            })(),
            screenResolution: `${window.screen?.width}x${window.screen?.height}`,
            viewportSize: `${window?.innerWidth}x${window?.innerHeight}`,
            language: window.navigator?.language || "en",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            connectionType:
              // @ts-expect-error: connection is not yet in TS Navigator type
              window.navigator?.connection &&
              // @ts-expect-error: connection is not yet in TS Navigator type
              window.navigator?.connection?.effectiveType
                ? // @ts-expect-error: connection is not yet in TS Navigator type
                  window.navigator?.connection?.effectiveType
                : "unknown",
          };
          supabase
            .from("web_visits")
            .insert({
              log: {
                urlVisited: document?.URL,
                time: new Date().toISOString(),
                referrer: document?.referrer || "direct link",
                metrics,
              },
            })
            .then((res) => {
              console.log("res => ", res);
            });
        } catch {
          console.error("Error inserting new visit");
        }
        fetch(
          "https://api.chanty.com/hooks/v2/61jodpRyP4jtS7Z6sjsqcMBqEthzMIoICzVN7uDy/ItvyYVoP4nPCGMpUrE8q3nsmj8foJyJKPrx8vKkv/JmUfqCsZGDLQZJGw41SnP7dnhVjD8vsZ8qPosi3dj17QmoBBtSPJTBSN1HHkTCuuzS6LYMoNqPdIL-FPXowmwXdCvqeXHrcypkLGTd8xQ3p8ZSLitOLT8voxC3BujkSdUqcgDr-LG36dyeOwdBvR8osTfs3fz2zSVdE39CkwnpTMI-q9xZQPLGVppcHHjbJDTRmirC2YJFuUS34Sk6udJvFPTuIQKJfgpjvN7Z-rLSww1GIgJ-ZvcbFhfR97R8yP2CiQGSFNtXZRpHQg4vN2gRRm3ISPfciCoIqxujcOXjPK1Nc-hDLhcgoTvFxRnDecNK9o4rk1eDcMdDRbRfVbFw7mFPZfoNSfWIfnuLV6eoN1VMo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: `newVisit, visited ${document?.URL} through ${document?.referrer || "direct link"}`,
            }),
          }
        ).then((res) => {
          sessionStorage.setItem("newVisit", "true");
          console.log("res => ", res);
        });
      }
      // window.navigator.geolocation.getCurrentPosition(
      //   (position: GeolocationPosition) => {
      //     if (!isLocationSent) {
      //       try {
      //         fetch(
      //           "https://api.chanty.com/hooks/v2/61jodpRyP4jtS7Z6sjsqcMBqEthzMIoICzVN7uDy/ItvyYVoP4nPCGMpUrE8q3nsmj8foJyJKPrx8vKkv/JmUfqCsZGDLQZJGw41SnP7dnhVjD8vsZ8qPosi3dj17QmoBBtSPJTBSN1HHkTCuuzS6LYMoNqPdIL-FPXowmwXdCvqeXHrcypkLGTd8xQ3p8ZSLitOLT8voxC3BujkSdUqcgDr-LG36dyeOwdBvR8osTfs3fz2zSVdE39CkwnpTMI-q9xZQPLGVppcHHjbJDTRmirC2YJFuUS34Sk6udJvFPTuIQKJfgpjvN7Z-rLSww1GIgJ-ZvcbFhfR97R8yP2CiQGSFNtXZRpHQg4vN2gRRm3ISPfciCoIqxujcOXjPK1Nc-hDLhcgoTvFxRnDecNK9o4rk1eDcMdDRbRfVbFw7mFPZfoNSfWIfnuLV6eoN1VMo",
      //           {
      //             method: "POST",
      //             headers: {
      //               "Content-Type": "application/json",
      //             },
      //             body: JSON.stringify({
      //               text: `position: ${JSON.stringify(position)}`,
      //             }),
      //           }
      //         ).then((res) => {
      //           sessionStorage.setItem("locationSent", "true");
      //           console.log("res => ", res);
      //         });
      //       } catch {}
      //     }
      //   },
      //   (positionError: GeolocationPositionError) => {
      //     console.log(positionError, " positionError");
      //   }
      // );
    }
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
