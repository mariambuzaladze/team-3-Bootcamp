import { useState, useEffect } from "react";

function Sent() {
  const [useSend, setUseSend] = useState(() => {
    return localStorage.getItem("useSend") === "true" || false;
  });

  console.log(localStorage.getItem("useSend"));
  const handleClose = () => {
    setUseSend(false);
  };

  useEffect(() => {
    localStorage.setItem("useSend", useSend);
  }, [useSend]);

  return (
    <div
      className={`${
        useSend ? "flex" : "hidden"
      } relative w-[427px] pl-[30px] pr-[33px] pt-[39.5px] pb-[41.5px] border border-solid border-[#e4e4e4] shadow-sent mr-20 `}
    >
      <img
        src="/icon-close.svg"
        alt="close"
        className="absolute top-[14px] right-[8px] hover:cursor-pointer"
        onClick={handleClose}
      />
      <p className="text-[28px] text-[#1a1a1a] dark:text-[#fff] font-[500] leading-[1.54]">
        რეზიუმე წარმატებით გაიგზავნა 🎉
      </p>
    </div>
  );
}

export default Sent;
