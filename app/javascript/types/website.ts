import { UserProfile, Product } from "./gumroad";

export type Website = {
  id: string;
  title?: string;
  published: boolean;
  url?: string;
  owner_id: string;
  content: string;
  version: number;
  created_at: string;
  updated_at: string;
};

export type ContentParsed = {
  theme?: string;
  common?: ContentParsedCommon;
  sections: Array<Section>;
};

export type ContentParsedCommon = {
  userProfile: UserProfile;
  products: Array<Product>;
};

export enum SectionType {
  rich_text = "rich_text",
  product = "product",
  product_list = "product_list",
  navbar = "navbar",
  footer = "footer",
}

export type GenericSection = {
  id: string;
  type: SectionType;
  data: Object;
};

export type NavbarSectionData = {
  heading?: string;
  subheading?: string;
  showAvatar?: boolean;
  captureEmail?: boolean;
  captureEmailText?: string;
};

export type NavbarSection = {
  id: string;
  type: SectionType.navbar;
  data: NavbarSectionData;
};

export type FooterSectionData = {
  text?: string;
  twitterUrl?: string;
  showPoweredBy?: boolean;
  showCopyright?: boolean;
};

export type FooterSection = {
  id: string;
  type: SectionType.footer;
  data: FooterSectionData;
};

export type RichTextSectionData = {
  dom: string;
  hideBottomBorder?: boolean;
};

export type RichTextSection = {
  id: string;
  type: SectionType.rich_text;
  data: RichTextSectionData;
};

export type Section =
  | GenericSection
  | NavbarSection
  | FooterSection
  | RichTextSection;

// type guards
export function isNavbarSection(section: Section): section is NavbarSection {
  return section.type === SectionType.navbar;
}
export function isFooterSection(section: Section): section is FooterSection {
  return section.type === SectionType.footer;
}
export function isRichTextSection(
  section: Section
): section is RichTextSection {
  return section.type === SectionType.rich_text;
}
export function isGenericSection(section: Section): section is GenericSection {
  return (
    section.type !== SectionType.navbar && section.type !== SectionType.footer
  );
}
