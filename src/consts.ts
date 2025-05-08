import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'a-log',
  description:
    'A-log es una bitácora de aprendizaje, un repositorio de escritura libre, un archivo dinámico del pensamiento.',
  href: 'https://a-log.ink',
  author: 'alguadmar',
  locale: 'es-MX',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/projects',
    label: 'proyectos',
  },
  {
    href: '/tags',
    label: 'etiquetas'
  },
  {
    href: '/about',
    label: 'manifiesto',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/alguadmar',
    label: 'GitHub',
  },
  {
    href: 'mailto:alguadmar@gmail.com',
    label: 'Email',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
