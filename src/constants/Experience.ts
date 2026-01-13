import type { Company } from "./Companies";
import type { TecnologieNames } from "./Tecnologies";
import site_en from '../data/content/site-en.json'

type Experience = {
  job_title: string;
  company: Company;
  period: string;
  details: string[];
  technologies: TecnologieNames[];
}