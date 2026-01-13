import { 
  IconMail,
  IconBrandWhatsapp,
  IconFileText,
  IconMoonFilled,
  IconSunFilled
} from "@tabler/icons-vue";

export type OtherIconName =
  | 'email'
  | 'whatsapp'
  | 'document'
  | 'moon'
  | 'sun';

export const OTHER_ICONS = {
  email: IconMail,
  whatsapp: IconBrandWhatsapp,
  document: IconFileText,
  moon: IconMoonFilled,
  sun: IconSunFilled,
};