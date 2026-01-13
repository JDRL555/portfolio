import IconBrandKunaisoft from './Kunaisoft.vue'
import IconBrandAdnSoftware from './AdnSoftware.vue'
import IconBrandTIDVTech from './TIDVTech.vue'

export type CompanyIcon =
  | 'kunaisoft'
  | 'adn_software'
  | 'tidv_tech'

export const COMPANY_ICONS = {
  kunaisoft: IconBrandKunaisoft,
  adn_software: IconBrandAdnSoftware,
  tidv_tech: IconBrandTIDVTech,
}