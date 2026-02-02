import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 border-t border-sidebar-border">
      <div className="text-sm text-muted-foreground">
        Built by{" "}
        <Link
          href="https://x.com/manjhss"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          manjhss
        </Link>
      </div>
    </footer>
  );
}
