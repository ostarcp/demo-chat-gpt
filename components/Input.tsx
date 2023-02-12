import { icons } from "../utils/icons";

const Input = () => {
  return (
    <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative dark:bg-gray-700 bg-white border border-primary  dark:text-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
      <textarea
        tabIndex={0}
        data-id="root"
        rows={1}
        placeholder=""
        className="m-0 w-full text-txt-main dark:text-txt-white resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
        style={{
          maxHeight: 200,
          height: 24,
          overflowY: "hidden",
        }}
      ></textarea>
      <button className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
        {icons.sendChat}
      </button>
    </div>
  );
};

export default Input;
