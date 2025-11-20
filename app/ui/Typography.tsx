import React from "react";
import { cn } from "~/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypoH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-xl md:text-4xl font-extrabold tracking-tight text-balance mb-6",
        className
      )}>
      {children}
    </h1>
  );
}

export function TypoH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b border-border pb-2 text-lg md:text-3xl font-semibold tracking-tight first:mt-0 mb-4",
        className
      )}>
      {children}
    </h2>
  );
}

export function TypoH3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("scroll-m-20 text-base md:text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function TypoP({ children, className }: TypographyProps) {
  return <p className={cn("leading-6 text-xs md:text-base [&:not(:first-child)]:mt-3", className)}>{children}</p>;
}

export function TypoLead({ children, className }: TypographyProps) {
  return <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>;
}
