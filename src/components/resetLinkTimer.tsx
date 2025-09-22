"use client";

import { useEffect, useState } from "react";

type Props = {
  email: string;
};

export default function ResetLinkTimer({ email }: Props) {
  const [seconds, setSeconds] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <p className="mt-4 text-sm text-gray-600">
      The reset link for <strong>{email}</strong> will expire in {formatTime(seconds)}
    </p>
  );
}
