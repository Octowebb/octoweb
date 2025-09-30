"use client";

import YandexMetrika from "@/common/ymScript";
import { useEffect, useState } from "react";

export const Scripts = () => {
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {load && (
        <>
          <YandexMetrika />
        </>
      )}
    </>
  );
};
