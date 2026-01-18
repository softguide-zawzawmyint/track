import { ReverseGeocodeData } from "@/components/LocalDetector";

export async function getUserDetails(): Promise<ReverseGeocodeData | null> {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocation is not supported by this browser.");
    return null;
  }

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      },
    );

    const { latitude, longitude } = position.coords;

    // Get IP address
    const ipAddress = await getIPAddress();

    // Get user agent and browser info
    const userAgent = navigator.userAgent;
    const browserInfo = getBrowserInfo();

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );
    const data = await response.json();

    console.log("Reverse geocode data:", data);
    console.log("IP Address:", ipAddress);
    console.log("User Agent:", userAgent);
    console.log("Browser:", browserInfo.name, browserInfo.version);

    return {
      ...data,
      name: "user" + new Date().getTime(),
      email: "user" + new Date().getTime() + "@example.com",
      userAgent,
      browserName: browserInfo.name,
      browserVersion: browserInfo.version,
      ipAddress,
    };
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
}

export async function getIPAddress(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error getting IP address:", error);
    return "unknown";
  }
}

export function getBrowserInfo(): { name: string; version: string } {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  // Detect browser name and version
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Edg") > -1) {
    browserName = "Edge";
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
    const match = userAgent.match(/(?:Opera|OPR)\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
    const match = userAgent.match(/rv:(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  }

  return { name: browserName, version: browserVersion };
}
