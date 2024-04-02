import { ReactNode } from "react";

type BoxProps = {
  children: ReactNode;
  title?: string;
};

export const Box = ({ children, title }: BoxProps) => {
  return (
    <div className="w-full h-full flex flex-col border-2">
      {title && (
        <div className="bg-cyan-400 p-4">
          <h2 className="text-white font-semibold text-base">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
};
