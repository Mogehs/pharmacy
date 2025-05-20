import React from "react";
import bg1 from "/Home/bg1.jpg";
import bg2 from "/Home/bg2.jpg";
import bg3 from "/Home/bg3.jpg";
import bg4 from "/Home/bg4.jpg";
import bg5 from "/Home/bg5.jpg";
import medicine1 from "/Home/medicine1.png";
import medicine2 from "/Home/medicine2.png";
import medicine3 from "/Home/medicine3.png";
import medicine4 from "/Home/medicine4.png";
import medicine5 from "/Home/medicine5.png";
import { Link } from "react-router-dom";

const items = [
  {
    bg: bg1,
    medicine: medicine1,
    title: "Pyridoxine Vitamin B6",
    color: "#009688",
  },
  {
    bg: bg2,
    medicine: medicine2,
    title: "Ascorbic Acid Vitamin C",
    color: "#009688",
  },
  {
    bg: bg4,
    medicine: medicine4,
    title: "Iron Supplement Tablets",
    color: "#009688",
  },
  {
    bg: bg5,
    medicine: medicine5,
    title: "Calcium Carbonate 600mg",
    color: "#009688",
  },
];

export default function CapsuleImg() {
  return (
    <div className="w-full mx-auto sm:w-11/12 py-4 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="grid w-full sm:w-[100%] lg:w-[60%] sm:grid-cols-2 grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="col-span-1 w-full flex justify-center sm:justify-start items-center rounded-md"
            style={{
              backgroundImage: `url(${item.bg})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              height: "300px",
            }}
          >
            {/* for mobile device */}
            <div
              className="w-[50%]  mx-5 flex justify-center items-center"
              style={{
                backgroundImage: `url(${item.medicine})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                height: "80%",
              }}
            >
              <div className="w-full text-white rounded text-center h-full flex flex-col justify-center items-center bg-[#0096871d] sm:w-[50%] sm:hidden ">
                <p className="text-[#fff]">Get it now 45% OFF</p>
                <h1 className="text-lg font-bold sm:text-xl">{item.title}</h1>
                <Link to="/products">
                  <button className="px-4 mt-2 cursor-pointer py-2 rounded-3xl bg-[#009688] text-white">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>

            {/* for large device */}
            <div className="w-full sm:w-[50%] sm:block hidden">
              <p className="text-[#009688]">Get it now 45% OFF</p>
              <h1 className="text-lg font-bold sm:text-xl">{item.title}</h1>
              <Link to="/products">
                <button className="px-4 mt-2 cursor-pointer py-2 rounded-3xl bg-[#009688] text-white">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* its show only on lg device */}
      <div
        className="w-full sm:w-[38%] flex justify-center items-center md:hidden lg:flex"
        style={{
          background: `url(${bg3})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        {/* show on small device  */}
        <div
          className="w-[70%] lg:w-[40%] mx-auto mt-4 flex justify-center items-end"
          style={{
            backgroundImage: `url(${medicine3})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            height: "80%",
          }}
        >
          <div className="w-full text-white rounded text-center h-full flex flex-col justify-center items-center bg-[#0096871d] sm:w-[50%] sm:hidden ">
            <p className="w-[80%] text-center mx-auto bg-[#009688] p-3 text-md text-white rounded-3xl">
              Get it now 45% OFF
            </p>
            <span>Pyridoxine Vitamin B6</span>
            <h1 className="text-xl font-bold sm:text-2xl">
              Pyridoxine Vitamin B6
            </h1>
            <Link to="/products">
              <button className="px-4 mt-2 cursor-pointer py-2 rounded-3xl bg-[#009688] text-white">
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        {/* show on large device*/}
        <div className="w-full sm:w-[50%] sm:block hidden">
          <p className="w-[90%] bg-[#009688] text-sm text-center p-3 text-white rounded-3xl">
            Get it now 45% OFF
          </p>
          <span>Pyridoxine Vitamin B6</span>
          <h1 className="text-xl font-bold sm:text-xl">
            Pyridoxine Vitamin B6
          </h1>
          <Link to="/products">
            <button className="px-4 mt-2 cursor-pointer py-2 rounded-3xl bg-[#009688] text-white">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
