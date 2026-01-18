"use client";
import { getBrowserInfo, getIPAddress, getUserDetails } from "@/lib/helper";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export type ReverseGeocodeData = {
  name: string;
  email: string;
  latitude: number;
  longitude: number;
  lookupSource: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  localityLanguageRequested: string;
  userAgent: string;
  browserName: string;
  browserVersion: string;
  ipAddress: string;
};

let hasDetected = false;

export function LocaleDetector() {
  const router = useRouter();
  const params = useParams();

  async function saveUserDetails(details: ReverseGeocodeData) {
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      console.log("User details saved successfully");
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  }

  useEffect(() => {
    if (hasDetected) return;

    getUserDetails()
      .then((details) => {
        console.log("Getting user details", details);
        if (details) {
          saveUserDetails(details);
        }
      })
      .catch((error) => console.error("Error in locale detection:", error))
      .finally(() => (hasDetected = true));
  }, [params.lang, router]);

  return null;
}
