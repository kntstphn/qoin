import React from "react";
import Logo from "@images/QoinLogo.png";
import Image from "next/image";

export const Landing = () => {
  return (
    <div className="flex h-full items-center w-full">
      <div className="flex flex-col w-full gap-2 p-5 lg:p-[150px]">
        <div className="w-full flex justify-center items-center">
          <Image src={Logo} alt="logo" width={300} height={300} />
        </div>
        <p className="text-white text-justify flex text-[15px] lg:text-[25px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          condimentum quis nisi nec laoreet. Donec malesuada turpis sit amet
          libero convallis tempor. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed convallis risus nec nisi porta, malesuada
          vehicula dolor hendrerit. Vestibulum facilisis pharetra odio, quis
          dictum dui pharetra sit amet. Nulla efficitur enim maximus libero
          finibus, in aliquam enim bibendum. Cras ultricies vitae dolor et
          imperdiet. In rutrum lacus et scelerisque posuere. Curabitur sit amet
          elementum risus. Nunc vehicula velit in egestas tristique. Fusce et
          sagittis ex. Nulla eget eros molestie, porttitor nisl sed, volutpat
          magna.
        </p>
      </div>
    </div>
  );
};
