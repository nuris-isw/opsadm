interface LinkItem {
  title: string;
  url: string;
  type: 'sheet' | 'doc' | 'pdf' | 'drive' | 'form' | 'link';
  keywords?: string[];
}

interface LinkCategory {
  category: string;
  icon: string; // Format Iconify, misal: 'mdi:home'
  items: LinkItem[];
}