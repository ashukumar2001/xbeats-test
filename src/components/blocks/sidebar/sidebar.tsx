"use client";

import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { sidebarNavItems } from "./sidebar-nav-items";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegments } from "next/navigation";

const Sidebar = () => {
  const [segment] = useSelectedLayoutSegments();
  return (
    <aside className="col-span-2 hover:overflow-auto overflow-hidden dark:bg-neutral-900 rounded-md p-3 space-y-3">
      <h4 className="text-xl font-heading px-3">Discover</h4>
      <nav>
        <ul>
          {sidebarNavItems.map(({ title, href, icon: Icon }, idx) => {
            const isActive = href === "/" + (segment ?? "");
            return (
              <li key={idx + "-" + title}>
                <NavLink title={title} href={href} isActive={isActive}>
                  <Icon className="size-4 shrink-0" />
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;

type NavLinkProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"a">;
const NavLink = ({ href, isActive, children, ...props }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size: "sm", variant: "ghost" }),
        "justify-start flex gap-2 text-muted-foreground",
        isActive && "bg-secondary font-semibold text-secondary-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
