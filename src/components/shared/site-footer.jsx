import { cn } from "@/lib/utils";

/**
 * A footer component for the site.
 * @param {*} param0 
 * @returns {JSX.Element}
 */
export function SiteFooter({ children }) {
  return (
    <footer className={
      cn(
        "absolute bottom-0 w-full border-t rounded-b-sm",
        "bg-background text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
        "p-4 text-center"
      )
    }>
      {children}
    </footer>
  );
}