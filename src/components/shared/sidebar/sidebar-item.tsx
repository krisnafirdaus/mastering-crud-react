import Link from "next/link";
import { NavItem } from "@/features/navigation/types/nav-item.type";

type SidebarItemProps = {
  item: NavItem;
};

export function SidebarItem({ item }: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <Link href={item.href} className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-white">
      <span className="flex items-center justify-center">
        <Icon size={18} />
      </span>

      <span className="text-[15px] font-medium">{item.label}</span>
    </Link>
  );
}
