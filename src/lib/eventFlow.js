// export const getEventFlow = (eventDetails) => {
//   const isOpenAir = eventDetails?.venueType === "Open Air";

//   const flow = [
//     "/blueprintform",
//     "/budget",
//     "/weather",
//     "/vendors",
//     "/menu",
//     "/timeline",
//     "/extras",
//   ];

//   if (isOpenAir) {
//     flow.push("/decor");
//   }

//   flow.push("/poster", "/email_invites", "/summary");

//   return flow;
// };
import { isWithinForecastRange } from "@/app/(eventFlow)/weather/page";

export const getEventFlow = (eventDetails) => {
  const isOpenAir = eventDetails?.venueType === "Open Air";
  const hasWeather = isWithinForecastRange(eventDetails?.date, 16);

  const flow = [
    "/blueprintform",
    "/budget",
  ];

  // only include weather if relevant
  if (hasWeather) {
    flow.push("/weather");
  }

  flow.push(
    "/vendors",
    "/menu",
    "/timeline",
    "/extras"
  );

  if (isOpenAir) {
    flow.push("/decor");
  }

  flow.push("/poster", "/email_invites", "/summary");

  return flow;
};

export const getNextRoute = (eventDetails, currentRoute) => {
  const flow = getEventFlow(eventDetails);

  const index = flow.indexOf(currentRoute);
  return flow[index + 1] || "/summary";
};
