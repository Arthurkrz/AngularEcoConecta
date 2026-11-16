export interface EcoItem {
  id: string;
  title: string;
  category: string;
  img: string;
  text: string;
}

export type EcoItemType = 'tip' | 'project';
