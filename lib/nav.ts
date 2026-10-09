export interface NavItem {
  label: string;
  href: string;
  /** end: пункт считается активным только при точном совпадении пути. */
  end?: boolean;
}

export const NAV: NavItem[] = [
  { label: 'Главная', href: '/', end: true },
  { label: 'E-commerce', href: '/mono' },
  { label: 'Web', href: '/web' },
  { label: 'Brand', href: '/brand' },
  { label: 'Обо мне', href: '/about' },
  { label: 'Контакты', href: '/contact' },
];