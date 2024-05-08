import React, { useState, useEffect } from "react";

import "./countDown.css";

const CountDown = ({ date }: { date: Date }) => {
  const [remainingTime, setRemainingTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  useEffect(() => {
    const obj = setInterval(() => {
      const timeInS = Math.floor(
        (new Date(date).valueOf() - new Date().getTime()) / 1000
      );
      const seconds = timeInS % 60;
      const minutes = Math.floor((timeInS / 60) % 60);
      const hours = Math.floor((timeInS / 60 / 60) % 24);
      const days = Math.floor(timeInS / 60 / 60 / 24);
      if (seconds < 0)
        setRemainingTime({ seconds: 0, minutes: 0, hours: 0, days: 0 });
      else setRemainingTime({ seconds, minutes, hours, days });
    }, 1000);

    return () => {
      clearInterval(obj);
    };
  }, [date]);
  const remainingDays = remainingTime?.days?.toString();
  return (
    <div className="font-poppins mx-auto grid w-max auto-cols-max grid-flow-col justify-center rounded-xl border-[3px] border-b-4 border-black bg-red-500 py-1 text-center text-xl font-black text-white shadow-xl shadow-black/30 sm:text-4xl">
      <div className="flex flex-col border-r-[3px] border-black p-3 sm:p-5">
        <span className="own-countdown flex justify-center ">
          <span
            style={
              {
                "--value":
                  remainingDays?.length > 2
                    ? remainingDays?.slice(0, 2)
                    : remainingDays,
              } as React.CSSProperties
            }
          ></span>
          {remainingDays?.length > 2 && (
            <span
              className="before:!content-['0\A_1\A_2\A_3\A_4\A_5\A_6\A_7\A_8\A_9\A']"
              style={
                {
                  "--value":
                    remainingDays?.length > 2
                      ? remainingDays?.slice(2)
                      : remainingDays,
                } as React.CSSProperties
              }
            ></span>
          )}
        </span>
        <span className="mt-3 text-sm sm:text-lg">DAYS</span>
      </div>
      <div className="flex flex-col border-r-[3px] border-black p-3 sm:p-5">
        <span className="own-countdown flex justify-center ">
          <span
            style={{ "--value": remainingTime?.hours } as React.CSSProperties}
          ></span>
        </span>
        <span className="mt-3 text-sm sm:text-lg">HOURS</span>
      </div>
      <div className="flex flex-col border-r-[3px] border-black p-3 sm:p-5">
        <span className="own-countdown flex justify-center ">
          <span
            style={{ "--value": remainingTime?.minutes } as React.CSSProperties}
          ></span>
        </span>
        <span className="mt-3 text-sm sm:text-lg">MINUTES</span>
      </div>
      <div className="flex flex-col p-3 sm:p-5">
        <span className="own-countdown flex justify-center ">
          <span
            style={{ "--value": remainingTime?.seconds } as React.CSSProperties}
          ></span>
        </span>
        <span className="mt-3 text-sm sm:text-lg">SECONDS</span>
      </div>
    </div>
  );
};

export default CountDown;
