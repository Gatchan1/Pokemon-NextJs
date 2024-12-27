import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PokeList",
  description: "Created during a Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="anti-footer relative">
          <header>
            <div className="logo-container">
              <Link href={"/"}>
                <Image src={"/images/logo.png"} alt="PokeList logo" width={326} height={98} className="logo" />
              </Link>
            </div>
          </header>
          {children}
        </div>
        <footer className="flex-center">
          <p>
            Created by <a href="https://github.com/Gatchan1">Raquel</a>. Thanks for checking this site!
          </p>
        </footer>
      </body>
    </html>
  );
}
