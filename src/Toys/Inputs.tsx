import { InputHTMLAttributes } from "react";

interface Input extends InputHTMLAttributes<HTMLInputElement> {}

const Inputs = (props: Input) => {
  return <input className="w-full px-2" {...props} />;
};

export default Inputs;
