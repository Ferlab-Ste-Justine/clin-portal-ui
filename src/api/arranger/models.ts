export type SuggestionId = string;

export enum SuggestionType {
  VARIANTS = 'variants',
  GENES = 'genes',
}

export enum GenomicFeatureType {
  VARIANT = 'variant',
  GENE = 'gene',
}

export type SearchText = string;

export type Suggestion = {
  locus: string | undefined;
  type: GenomicFeatureType;
  matchedText: string;
  suggestion_id: string;
  symbol?: string;
  rsnumber?: string;
  ensembl_gene_id?: string;
  suggest: [{ input: string[]; weight: number }];
};

export type SelectedSuggestion = {
  type: string;
  ensembl_gene_id?: string;
  suggest: any;
  suggestionId: SuggestionId;
  symbol?: string;
  rsnumber?: string;
  locus?: string;
  hgvsg?: string;
  chromosome?: string;
};

export interface ISuggestionPayload<T> {
  searchText: string;
  suggestions: T[];
}
