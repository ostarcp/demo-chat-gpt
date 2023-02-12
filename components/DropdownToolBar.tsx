function Dropdown(props: {
  value: string | number;
  onChange: (e: any) => void;
  options: Array<{ value: any; label: string }>;
  onClick?: (e: any) => void;
}): JSX.Element {
  return (
    <select
      className="bg-transparent text-sm text-txt-main block p-2.5 pr-2 border-0 focus:ring-0 min-w-[6.6rem] max-w-[9.5rem]"
      value={props.value}
      onChange={props.onChange}
      onClick={props.onClick}
    >
      {props.options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
