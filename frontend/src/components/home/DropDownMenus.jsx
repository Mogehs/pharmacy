import React, { useState } from "react";

export default function DropDownMenus() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selected1, setSelected1] = useState("Dropdown 1");
  const [selected2, setSelected2] = useState("Dropdown 2");

  return (
    <div className="w-full sm:w-11/12 md:w-9/12 bg-[#009688] mx-auto flex flex-col gap-4 items-center justify-center p-6 rounded-t-md">
      <p className="font-semibold text-xl sm:text-3xl text-white">
        Select Product
      </p>

      <div className="flex flex-wrap gap-4 justify-center items-center w-full">


        {/* Input and Button */}
        <input
          type="text"
          placeholder="Enter SKU"
          className="w-full sm:w-auto text-[#009688] bg-white focus:ring-2 focus:outline-none focus:ring-[#009688] font-medium rounded-3xl text-sm px-5 py-2.5 flex justify-between items-center"
        />
        <button className="w-full sm:w-auto rounded-3xl p-2 bg-transparent text-white hover:bg-[#009688] transition-all ease-in delay-100 cursor-pointer border border-white   font-medium text-sm px-5 py-2.5 hover:scale-110">
          Show now
        </button>
      </div>
    </div>
  );
}
