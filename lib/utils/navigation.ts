export const isActive = (currentPath: string, path: string) =>
  normalizePath(currentPath) === normalizePath(path)

export const normalizePath = (path: string) =>
  path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path

export const withTeamPath = (teamId: string | null | undefined, href: string) => {
  const normalizedHref = href.startsWith("/") ? href : `/${href}`
  if (!teamId) {
    return normalizedHref
  }

  if (normalizedHref === "/") {
    return `/team/${teamId}`
  }

  return `/team/${teamId}${normalizedHref}`
}
