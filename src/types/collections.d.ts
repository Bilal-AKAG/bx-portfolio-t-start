declare module ".source/server" {
  export interface ServerDocCollectionEntry {
    toFumadocsSource: () => unknown[];
  }

  export const blog: ServerDocCollectionEntry;
}

declare module ".source/browser" {
  interface ClientLoader<RenderProps> {
    preload: (path: string) => Promise<unknown>;
    useContent: (path: string, props: RenderProps) => JSX.Element;
  }

  interface BlogCollection {
    createClientLoader: <RenderProps>(options: {
      component: (doc: unknown, props: RenderProps) => JSX.Element;
    }) => ClientLoader<RenderProps>;
  }

  const browserCollections: {
    blog: BlogCollection;
  };

  export default browserCollections;
}
