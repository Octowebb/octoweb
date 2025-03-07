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
          <script
            src="https://www.google.com/recaptcha/api.js?render=6Le0rM0qAAAAAIF-8ZPeA5_0RThCMWK1E_PIiv6c"
            async
          ></script>
          <YandexMetrika />
        </>
      )}
    </>
  );
};
