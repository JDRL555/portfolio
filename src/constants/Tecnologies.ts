export type TecnologieNames = 'React' | 'ReactNative' | 'NextJS' | 'VueJS' | 'TailwindCSS' | 'Sass' | 'JavaScript' | 'TypeScript' | 'Python' | 'NodeJS' | 'Express' | 'Django' | 'Flask' | 'FastAPI' | 'NestJS' | 'MySQL' | 'PostgreSQL' | 'MongoDB' | 'Git' | 'Docker' | 'Linux' | 'Miro' | 'Make' | 'Excel';

type TechInfo = {
  name: TecnologieNames;
  icon: string;
}

type Techs = 'languages' | 'frontend' | 'backend' | 'database' | 'other_tools';

export type Tecnologie = {
  [key in Techs]: TechInfo[];
}

export const Tecnologies: Tecnologie = {
  languages: [
    {
      name: "JavaScript",
      icon: "/src/assets/technologies/javascript.svg"
    },
    {
      name: "TypeScript",
      icon: "/src/assets/technologies/typescript.svg"
    },
    {
      name: "Python",
      icon: "/src/assets/technologies/python.svg"
    }
  ],
  frontend: [
    {
      name: "React",
      icon: "/src/assets/technologies/react.svg"
    },
    {
      name: "ReactNative",
      icon: "/src/assets/technologies/reactnative.svg"
    },
    {
      name: "NextJS",
      icon: "/src/assets/technologies/nextjs.svg"
    },
    {
      name: "VueJS",
      icon: "/src/assets/technologies/vuejs.svg"
    },
    {
      name: "TailwindCSS",
      icon: "/src/assets/technologies/tailwindcss.svg"
    },
    {
      name: "Sass",
      icon: "/src/assets/technologies/sass.svg"
    }
  ],
  backend: [
    {
      name: "NodeJS",
      icon: "/src/assets/technologies/nodejs.svg"
    },
    {
      name: "Express",
      icon: "/src/assets/technologies/express.svg"
    },
    {
      name: "Django",
      icon: "/src/assets/technologies/django.svg" 
    },
    {
      name: "Flask",
      icon: "/src/assets/technologies/flask.svg"
    },
    {
      name: "FastAPI",
      icon: "/src/assets/technologies/fastapi.svg"
    },
    {
      name: "NestJS",
      icon: "/src/assets/technologies/nestjs.svg"
    },
  ],
  database: [
    {
      name: "MySQL",
      icon: "/src/assets/technologies/mysql.svg"
    },
    {
      name: "PostgreSQL",
      icon: "/src/assets/technologies/postgresql.svg"
    },
    {
      name: "MongoDB",
      icon: "/src/assets/technologies/mongodb.svg"
    }
  ],
  other_tools: [
    {
      name: "Git",
      icon: "/src/assets/technologies/git.svg"
    },
    {
      name: "Docker",
      icon: "/src/assets/technologies/docker.svg"
    },
    {
      name: "Linux",
      icon: "/src/assets/technologies/linux.svg"
    },
    {
      name: "Miro",
      icon: "/src/assets/technologies/miro.svg"
    },
    {
      name: "Make",
      icon: "/src/assets/technologies/make.svg"
    },
    {
      name: "Excel",
      icon: "/src/assets/technologies/excel.svg"
    }
  ]
}