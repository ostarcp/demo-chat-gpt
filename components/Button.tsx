import { ReactElement } from "react";

export default function Button(props: {
  title?: string;
  icon?: ReactElement;
  onClick?: () => void;
}) {
  const { title = "button", onClick, icon } = props;
  return (
    <button
      type="button"
      className="btn gap-2 border-primary-bold btn-primary bg-primary-bold hover:bg-primary w-full"
      onClick={onClick}
    >
      {icon ? icon : null}
      {title}
    </button>
  );
}
