import { Compass, Flame, Heart, Radio, Tv } from "lucide-react";
import { NavItem } from "../types/nav-item.type";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Browse",
    href: "/",
    icon: Compass,
  },
  {
    label: "Trending",
    href: "/trending",
    icon: Flame,
  },
  {
    label: "Following",
    href: "/following",
    icon: Tv,
  },
  {
    label: "Live",
    href: "/live",
    icon: Radio,
  },
  {
    label: "Favorite",
    href: "/favorite",
    icon: Heart,
  },
];
