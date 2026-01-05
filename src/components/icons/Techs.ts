import { 
  IconBrandGithub, 
  IconBrandPython,
  IconBrandJavascript, 
  IconBrandTypescript,
  IconBrandLinkedin, 
  IconBrandReact,
  IconBrandNextjs,
  IconBrandVue,
  IconBrandLaravel,
  IconBrandMysql,
  IconBrandMongodb
} from "@tabler/icons-vue";
import IconBrandFastAPI from './FastAPI.vue'
import IconBrandFlask from './Flask.vue'
import IconBrandDjango from './Django.vue'
import IconBrandPostgres from './PostgreSQL.vue'

export type TechIconName = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'react'
  | 'nextjs'
  | 'vue'
  | 'fastapi'
  | 'flask'
  | 'django'
  | 'laravel'
  | 'mysql'
  | 'postgresql'
  | 'mongodb'
  | 'github'
  | 'linkedin'

export const LANGUAGES = {
  javascript: IconBrandJavascript,
  typescript: IconBrandTypescript,
  python: IconBrandPython,
}

export const FRONTEND = {
  react: IconBrandReact,
  nextjs: IconBrandNextjs,
  vue: IconBrandVue
}

export const BACKEND = {
  fastapi: IconBrandFastAPI,
  flask: IconBrandFlask,
  django: IconBrandDjango,
  laravel: IconBrandLaravel,
}

export const DATABASE = {
  mysql: IconBrandMysql,
  postgresql: IconBrandPostgres,
  mongodb: IconBrandMongodb,

}

export const OTHER_TOOLS = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
}

export const TECH_ICONS = {
  ...LANGUAGES,
  ...FRONTEND,
  ...BACKEND,
  ...DATABASE,
  ...OTHER_TOOLS,
}