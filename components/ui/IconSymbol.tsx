import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { OpaqueColorValue } from 'react-native';
import {
  ArrowRightIcon,
  HomeIcon,
  FolderIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  CodeBracketIcon,
  GlobeAmericasIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
  UserCircleIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline"; // Import desired icons

const HEROICONS_MAPPING = {
  'house.fill': HomeIcon,
  'folder': FolderIcon,
  'plus.square.on.square': PlusCircleIcon,
  'paperplane.fill': PaperAirplaneIcon,
  'chevron.left.forwardslash.chevron.right': CodeBracketIcon,
  'chevron.right': ArrowRightIcon,
  'globe': GlobeAmericasIcon,
  'magnifyingglass': MagnifyingGlassIcon,
  'doc': DocumentIcon,
  'person.crop.circle': UserCircleIcon,
  'lock': LockClosedIcon,
  'checkmark.circle': CheckCircleIcon

} as const;

export type IconSymbolName = keyof typeof HEROICONS_MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color = "black",
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  const HeroIcon = HEROICONS_MAPPING[name];
  if (!HeroIcon) {
    console.warn(`Icon "${name}" not found in HEROICONS_MAPPING.`);
    return null;
  }

  return <HeroIcon width={size} height={size} color={color} style={style} />;
}
