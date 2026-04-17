type SidebarUserProps = {
  name: string;
  imageUrl?: string;
};

export function SidebarUser({ name, imageUrl = "https://i.pravatar.cc/100?img=12" }: SidebarUserProps) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-white/5 p-3">
      <img src={imageUrl} alt={name} className="h-11 w-11 rounded-full object-cover" />

      <div className="flex flex-col">
        <p className="text-xs text-slate-400">Signed in as</p>
        <p className="text-sm font-semibold text-white">{name}</p>
      </div>
    </div>
  );
}
