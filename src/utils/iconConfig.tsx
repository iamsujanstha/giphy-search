import React from 'react';
import { IconType } from 'react-icons';
import { GoSearch } from "react-icons/go";
import { IoIosClose } from "react-icons/io";


interface IconProps {
  size?: string;
  color?: string;
}

const createIcon = (IconComponent: IconType): React.FC<IconProps> => {
  return ({ size = "20px", color = "var(--icon-color)" }: IconProps) => (
    <IconComponent size={size} color={color} />
  );
};

export const Icons = {
  SearchIcon: createIcon(GoSearch),
  CloseIcon: createIcon(IoIosClose)
};
