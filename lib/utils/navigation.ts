export const isActive = (currentPath: string, path: string) =>
  normalizePath(currentPath) === normalizePath(path)

export const normalizePath = (path: string) =>
  path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path
