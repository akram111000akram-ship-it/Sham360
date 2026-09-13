import React from "react";
import { Header, HeaderProps } from "./Header";

export const TopNavigationBanner: React.FC<HeaderProps> = (props) => {
  return <Header {...props} />;
};

export default TopNavigationBanner;
