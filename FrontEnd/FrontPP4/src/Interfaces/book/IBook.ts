interface Formats {
  [mimeType: string]: string;
}

 interface Person {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface IBook {
  id: number;
  title: string;
  authors: Person[];
  summaries: string[];
  translators: Person[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Formats;
  download_count: number;
}