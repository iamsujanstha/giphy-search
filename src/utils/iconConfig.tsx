import React from 'react';
import { IconType } from 'react-icons';
import { GoSearch } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { LuLink } from "react-icons/lu";
import { BsHeartFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareReddit } from "react-icons/fa6";
import { BsArrowUpCircleFill } from "react-icons/bs";

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
  searchIcon: createIcon(GoSearch),
  closeIcon: createIcon(IoIosClose),
  linkIcon: createIcon(LuLink),
  favouriteIcon: createIcon(BsHeartFill),
  verifiedIcon: createIcon(MdVerified),
  shareIcon: createIcon(FaShareAlt),
  socialIcons: {
    fbIcon: createIcon(FaFacebookSquare),
    pinterestIcon: createIcon(FaPinterestSquare),
    twitterIcon: createIcon(FaSquareXTwitter),
    redditIcon: createIcon(FaSquareReddit)
  },
  scrollTopIcon: createIcon(BsArrowUpCircleFill)

};
