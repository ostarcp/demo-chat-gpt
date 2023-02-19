import { icons } from "../utils/icons";

const PreviewCode = (props: { language: string; code: string }) => {
  const { language, code } = props;
  return (
    <>
      <div className="bg-dark mb-4 rounded-lg w-full mt-4">
        <div className="rounded-t-lg flex justify-between items-center relative text-white bg-primary px-4 py-2 text-xs font-sans">
          <span className="">{language || "Js"}</span>
          <div className="flex justify-end gap-3">
            <button className="flex ml-auto gap-2">{icons.copy}</button>
            <button className="flex ml-auto gap-2">{icons.star}</button>
            <button className="flex ml-auto gap-2">{icons.like}</button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <code className="!whitespace-pre text-white">{code}</code>
        </div>
      </div>
    </>
  );
};

export default PreviewCode;
