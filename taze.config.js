import { defineConfig } from 'taze';

//   pnpm taze        # preview (no changes)
//   pnpm taze -w     # write bumps inside the ranges declared in package.json (no majors)
//   pnpm taze major  # preview majors (add -w to write them; check locally first)

export default defineConfig({
  maturityPeriod: 7,

  // Pins action updates to the hash and not the version tag (stricter)
  githubActions: {
    style: 'sha',
  },
});
