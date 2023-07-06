type MenuItem = {
  title: string;
  url: string;
  children?: Array<MenuItem>;
};

declare module '@/content/menu.json' {
  export const items: Array<MenuItem>;
}
