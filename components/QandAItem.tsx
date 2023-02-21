import React from "react";
import { icons } from "../utils/icons";
import PreviewCode from "./PreViewCode";
import styles from "../styles/typing.module.css";

const QandAItem = (props: {
  isChat?: boolean;
  isLoading?: boolean;
  content: string;
}): JSX.Element => {
  const { isChat = true, content, isLoading } = props;
  return (
    <>
      <div
        className={`w-full flex ${
          isChat ? "justify-start bg-main-bg dark:bg-dark" : "justify-end"
        }  border-b-2 py-8 px-4`}
        // style={{ backgroundColor: isChat ? "hwb(240deg 97% 3%)" : "white" }}
      >
        <div className="flex text-txt-main w-full justify-between gap-4 ">
          {!isChat ? (
            <div className="avatar w-20">{icons.userIcon}</div>
          ) : (
            <div className="avatar w-20">{icons.logoSm}</div>
          )}
          <div
            className={`flex-1 content-text overflow-x-auto text-left dark:text-white ${
              isLoading ? styles.typewriter : ""
            }`}
          >
            <span
              className={
                content === "ERROR! please try again later"
                  ? "text-red-500 uppercase font-bold"
                  : ""
              }
            >
              {content}
            </span>
            {/* <PreviewCode language={"Javascript"} code={content} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(QandAItem);
