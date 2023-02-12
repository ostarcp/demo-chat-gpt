import { icons } from "../utils/icons";
import PreviewCode from "./PreViewCode";

const QandAItem = (props: {
  isChat?: boolean;
  question?: string;
}): JSX.Element => {
  const { isChat = true, question } = props;
  return (
    <>
      <div
        className={`w-full my-2 flex ${
          isChat ? "justify-start" : "justify-end"
        }`}
      >
        <div className="flex text-txt-main md:w-2/3 w-full justify-between gap-4 border border-primary rounded-md p-4">
          {isChat ? (
            <>
              <div className="avatar">{icons.logo}</div>
              <div className="content-text">
                {question ||
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quasi ipsum vel unde, ut deserunt at esse quod, odio consectetur cum autem quidem labore expedita repudiandae eius? Accusantium, voluptates impedit!"}
                <PreviewCode language="JavaScript" />
              </div>
            </>
          ) : (
            <>
              <div className="content-text">
                {question ||
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quasi ipsum vel unde, ut deserunt at esse quod, odio consectetur cum autem quidem labore expedita repudiandae eius? Accusantium, voluptates impedit!"}
              </div>
            </>
          )}

          {!isChat ? <div className="avatar">{icons.userIcon}</div> : null}
        </div>
      </div>
    </>
  );
};

export default QandAItem;
