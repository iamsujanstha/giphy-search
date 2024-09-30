import React from 'react';
import { IconType } from 'react-icons';
import { GoSearch } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { LuLink } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";


interface IconProps {
  size?: string;
  color?: string;
  onClick?: () => void;
}

const createIcon = (IconComponent: IconType): React.FC<IconProps> => {
  return ({ size = "20px", color = "var(--icon-color)" }: IconProps) => (
    <IconComponent size={size} color={color} onClick={() => onclick} />
  );
};

export const Icons = {
  SearchIcon: createIcon(GoSearch),
  CloseIcon: createIcon(IoIosClose),
  linkIcon: createIcon(LuLink),
  favouriteIcon: createIcon(CiHeart)
};
