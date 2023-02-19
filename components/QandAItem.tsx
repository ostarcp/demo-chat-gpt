import React from 'react';
import { icons } from "../utils/icons";
import PreviewCode from "./PreViewCode";

const QandAItem = (props: {
  isChat?: boolean;
  content: string;
}): JSX.Element => {
  const { isChat = true, content } = props;
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
              <div className="flex-1 content-text overflow-x-auto text-left">
                {content}
                {/* <PreviewCode language={"Javascript"} code={content} /> */}
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 content-text overflow-x-auto text-left">
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
