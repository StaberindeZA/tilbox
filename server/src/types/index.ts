export interface TilListItem {
  id: string;
  summary?: string;
  url?: string;
  createdAt: number;
}

export interface TilCreateItem {
  summary: string;
  url: string;
}
