import { ReactNode, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ToolTip } from "../tooltip";

type BoxProps = {
  children: ReactNode;
  title?: string;
  hasTooltip?: boolean;
  toolTipContent?: string;
};

export const Box = ({
  children,
  title,
  hasTooltip = false,
  toolTipContent,
}: BoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-full h-full flex flex-col ">
      {title && (
        <div className="bg-cyan-400 p-4 flex items-center justify-center rounded-t-lg">
          <h2 className="text-white font-semibold text-base text-center w-full">
            {title}
          </h2>
          {hasTooltip && (
            <div
              className="ml-auto"
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-tooltip-placement="left"
              data-tooltip-target="tooltip-left"
              data-tooltip-trigger="hover"
            >
              <IoIosInformationCircleOutline size={22} />
              <ToolTip isHovered={isHovered}>{toolTipContent}</ToolTip>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
