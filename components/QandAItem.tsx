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
        className={`w-full my-2 flex ${
          isChat ? "justify-start" : "justify-end"
        }`}
      >
        <div className="flex text-txt-main md:w-3/4 w-full justify-between gap-4 border border-primary rounded-md p-4">
          {isChat ? (
            <>
              <div className="avatar">{icons.logo}</div>
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
            </>
          ) : (
            <>
              <div className="flex-1 content-text overflow-x-auto text-left dark:text-white">
                {content || ""}
              </div>
            </>
          )}

          {!isChat ? <div className="avatar">{icons.userIcon}</div> : null}
        </div>
      </div>
    </>
  );
};

export default React.memo(QandAItem);
