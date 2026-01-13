import { type TecnologieNames } from './Tecnologies'

export type Project = {
  title: string;
  description: string;
  technologies: TecnologieNames[];
}