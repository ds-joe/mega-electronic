export interface ServerLayoutWords {
  layoutWords: Record<string, string>
}

export interface ServerPageWords {
  pageWords: Record<string, string>,
}

export interface ServerWords extends ServerLayoutWords, ServerPageWords { }
