export const getIcon = (name) => {
  return new URL(`../assets/icons/${name}.svg`, import.meta.url).href
}