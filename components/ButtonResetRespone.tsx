import React from "react";

function ButtonResetRespone() {
  return (
    <>
      <div className="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
        <button className="btn bg-input-bg border-none hover:bg-primary text-txt-main flex justify-center gap-2 btn-neutral border-0 md:border">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-3 w-3"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
          Regenerate response
        </button>
      </div>
    </>
  );
}

export default ButtonResetRespone;
