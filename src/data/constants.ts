// ──────────────────────────────────────
// Single source of truth for all profile data
// ──────────────────────────────────────

export const PROFILE = {
  name: 'Abhishek Mishra',
  shortName: 'Abhishek',
  alias: 'asmyselfabhi',
  title: 'Full Stack Developer',
  email: 'asmyselfabhishek00@gmail.com',
  phone: '+919565760449',
  website: 'www.abhishek.dev',
  blogHost: 'mishrabhishek.hashnode.dev',
  formspreeId: '', // Set your Formspree Form ID here to enable emails (or configure via VITE_FORMSPREE_ID in .env)
} as const;

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/mishrabhi',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhishek-mishra-9946a713b/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/__mishrabhishek__/',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: 'https://webstranet.com/blogs',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:asmyselfabhishek00@gmail.com',
  },
] as const;

export type SocialLinkId = (typeof SOCIAL_LINKS)[number]['id'];

/** Helper to get a social link by id */
export const getSocialLink = (id: SocialLinkId) =>
  SOCIAL_LINKS.find((link) => link.id === id)!;
