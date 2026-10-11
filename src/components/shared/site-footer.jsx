import { cn } from "@/lib/utils";

/**
 * A footer component for the site.
 * @param {*} param0 
 * @returns {JSX.Element}
 */
export function SiteFooter({ children, className }) {
  return (
    <footer className={
      cn(
        "w-full shrink-0 border-t rounded-b-sm",
        "bg-background text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
        "p-4 text-center",
        className
      )
    }>
      {children}
    </footer>
  );
}