/** @type {import("lint-staged").Config} */
export default {
  // Type check TypeScript files
  '*.(ts|tsx)': () => 'bun run typecheck',
  // Lint files
  '*.(ts|tsx|js|jsx|cjs|mjs)': () => 'bun run lint',
  // Format files
  '*.(ts|tsx|js|jsx|cjs|mjs|json|md|mdx)': (files) =>
    `bun run prettier -uc ${files.join(' ')}`,
};
