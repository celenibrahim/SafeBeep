declare module 'react-native-html-to-pdf' {
  export interface Options {
    html: string;
    fileName: string;
    directory?: string;
  }

  export function convert(options: Options): Promise<{filePath: string}>;
}
