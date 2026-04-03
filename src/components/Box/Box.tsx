import React from "react";
import clsx from "clsx";
import css from "./Box.module.css";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={clsx(css.container, className)}>{children}</div>;
};
