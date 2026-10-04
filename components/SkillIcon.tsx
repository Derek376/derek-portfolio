import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import {
  SiDocker,
  SiExpress,
  SiFlask,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
} from "react-icons/si";

const icons = {
  java: FaJava,
  spring: SiSpringboot,
  react: SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  flask: SiFlask,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  next: SiNextdotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  docker: SiDocker,
} satisfies Record<string, IconType>;

export type SkillIconName = keyof typeof icons;

type SkillIconProps = {
  name: SkillIconName;
};

export default function SkillIcon({ name }: SkillIconProps) {
  const Icon = icons[name];

  return <Icon className="accent-text h-4 w-4 shrink-0" aria-hidden="true" />;
}
