import { 
  IconMail,
  IconBrandWhatsapp,
  IconFileText,
} from "@tabler/icons-vue";

export type OtherIconName =
  | 'email'
  | 'whatsapp'
  | 'document';

export const OTHER_ICONS = {
  email: IconMail,
  whatsapp: IconBrandWhatsapp,
  document: IconFileText,
};