import Script from "next/script";

interface GoogleAdSenseProps {
  pId: string;
};

export default function GoogleAdSense({ pId }: GoogleAdSenseProps) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
    />
  );
}
