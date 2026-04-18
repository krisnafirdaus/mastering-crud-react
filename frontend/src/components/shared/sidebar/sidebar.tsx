import { NAV_ITEMS } from "@/features/navigation/constants/nav-item";
import { SidebarItem } from "./sidebar-item";
import { SidebarUser } from "./sidebar-user";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-70 flex-col justify-between overflow-hidden border-r-[3px] border-r-white/10 bg-gray-900 px-4 py-6">
      <div className="flex flex-col gap-8">
        <div className="px-3 py-2">
          <h1 className="text-2xl font-bold text-white">Movie App</h1>
          <p className="mt-1.5 text-sm text-slate-400">Simple movie dashboard</p>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </nav>
      </div>

      <div className="pt-6">
        <SidebarUser name="Dika Djati" />
      </div>
    </aside>
  );
}
