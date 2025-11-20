import { cn } from "~/lib/utils";

export function MainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn("w-full px-8 md:w-2xl lg:w-3xl xl:w-5xl mx-auto mb-16 flex-1", className)}>{children}</main>;
}
