import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import { CoinGetAndALert } from "./CoinGetAndALert";


export const PageOne = () => {
  const [user] = useAtom(userAtom);
  const [formattedTime, setFormattedTime] = useState(
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );


  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-screen w- sm:p-4 sm:py-4 gradient-background">
      <div className="flex flex-col h-1/3 mt-6 sm:mt-2 before:text-center justify-center items-center text-white gap-2 border">
        <h1 className="text-4xl font-bold">
          Bonjour {user.first_name ? user.first_name : "Invité"}
        </h1>
        <p className="text-2xl mt-12">
          Nous sommes le {formattedDate} et il est {formattedTime}.
        </p>
      
      </div>

      <div className="flex flex-col h-2/3 mt-6 sm:mt-2 before:text-center justify-center items-center text-white gap-2 border">
      <CoinGetAndALert userId={user.id} />

      </div>
    
    </div>
  );
};
