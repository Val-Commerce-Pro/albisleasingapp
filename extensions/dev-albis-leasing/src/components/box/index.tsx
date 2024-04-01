import { ReactNode } from "react";

type BoxProps = {
  title: string;
  children: ReactNode;
};

export const Box = ({ children, title }: BoxProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-cyan-400">
        <h2 className="text-white font-bold">{title}</h2>
      </div>
      {children}
      {/* <div className="p-5">
        <div>Test</div>
        <div>Test2</div>
        <div>Test3</div>
      </div> */}
    </div>
  );
};
