export interface ISelectedWord {
  id: string;
  text: string;
}

export interface IWord {
  WordText: string;
  Left: number;
  Top: number;
  Height: number;
  Width: number;
}

export interface IOcrResult {
  ParsedText: string;
  TextOverlay: {
    Lines: any[];
    HasOverlay: boolean;
    Message: string;
  };
}

export interface IOcrResponse {
  ParsedResults: IOcrResult[];
}
