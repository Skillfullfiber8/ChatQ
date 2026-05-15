"use client";

import {

  useEffect,

  useState,

} from "react";

import {
  QRCodeCanvas,
} from "qrcode.react";

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;

export default function HomePage() {

  const [

    qr,

    setQr,

  ] = useState<
    string | null
  >(null);

  const [

    ready,

    setReady,

  ] = useState(false);

  const fetchStatus =
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/status`
          );

        const data =
          await response.json();

        setQr(data.qr);

        setReady(data.ready);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchStatus();

    const interval =
      setInterval(
        fetchStatus,
        3000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <main
      className="
        min-h-screen
        bg-[#0f1117]
        text-white
        p-10
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-bold
              "
            >
              ChatQ Dashboard
            </h1>

            <p
              className="
                text-gray-400
                mt-3
              "
            >
              AI-powered WhatsApp support system
            </p>

          </div>

          <div
            className={`
              px-5
              py-3
              rounded-xl
              font-semibold
              ${
                ready

                  ? "bg-green-600"

                  : "bg-yellow-500"
              }
            `}
          >

            {
              ready

                ? "WhatsApp Connected"

                : "WhatsApp Login Required"
            }

          </div>

        </div>

        {!ready && qr && (

          <div
            className="
              bg-[#1a1d29]
              rounded-2xl
              p-10
              flex
              flex-col
              items-center
              mb-10
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Scan WhatsApp QR
            </h2>

            <div
              className="
                bg-white
                p-6
                rounded-2xl
              "
            >

              <QRCodeCanvas
                  value={qr}
                  size={300}
                />

            </div>

          </div>

        )}

      </div>

    </main>
  );
}