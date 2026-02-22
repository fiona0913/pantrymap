import { createElement, type ComponentType } from "react";
import IconPantry from "./IconPantry";
import IconProduce from "./IconProduce";
import IconBread from "./IconBread";
import IconDairy from "./IconDairy";
import IconMeals from "./IconMeals";
import IconMeat from "./IconMeat";
import IconHygiene from "./IconHygiene";
import IconFrozen from "./IconFrozen";
import IconBaby from "./IconBaby";
import IconPet from "./IconPet";
import IconHomeCanned from "./IconHomeCanned";
import IconCookie from "./IconCookie";
import IconPot from "./IconPot";
import IconDeliMeat from "./IconDeliMeat";
import IconShellfish from "./IconShellfish";
import IconHomemadeFood from "./IconHomemadeFood";
import IconMilkBottle from "./IconMilkBottle";
import IconSpoiled from "./IconSpoiled";
import IconDentedCan from "./IconDentedCan";
import IconOpenContainer from "./IconOpenContainer";

interface IconProps {
  className?: string;
}

export const iconMap: { [key: string]: ComponentType<IconProps> } = {
  pantry: IconPantry,
  produce: IconProduce,
  bread: IconBread,
  dairy: IconDairy,
  meals: IconMeals,
  meat: IconMeat,
  hygiene: IconHygiene,
  frozen: IconFrozen,
  baby: IconBaby,
  pet: IconPet,
  "home-canned": IconHomeCanned,
  cookie: IconCookie,
  pot: IconPot,
  "deli-meat": IconDeliMeat,
  shellfish: IconShellfish,
  "homemade-food": IconHomemadeFood,
  "milk-bottle": IconMilkBottle,
  spoiled: IconSpoiled,
  "dented-can": IconDentedCan,
  "open-container": IconOpenContainer,
};

export function getIcon(iconKey: string): ComponentType<IconProps> {
  return iconMap[iconKey] || IconPantry;
}

export function DonationIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const IconComponent = getIcon(iconKey);
  return createElement(IconComponent, { className });
}
