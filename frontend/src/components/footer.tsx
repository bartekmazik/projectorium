import { GithubIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Label } from "./ui/label";

const Footer = () => {
  return (
    <div className="w-screen h-12 mt-[10vh] flex flex-row justify-center items-center gap-2">
      <Label>Bartłomiej Mazik 2025©</Label>
      <Link href="https://www.github.com/bartekmazik">
        <Image src="/github.svg" alt="github" width={20} height={20}></Image>
      </Link>
    </div>
  );
};

export default Footer;
