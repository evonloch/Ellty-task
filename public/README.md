Public assets

- Place icon files in `public/icons/`.
- Files here are served statically by Vite at the site root.

How to reference in code
- Use plain URLs, not imports, e.g.:
  - <img src="/icons/example.svg" alt="Example" />
  - background-image: url('/icons/example.svg');

Notes
- Keep filenames lowercase and kebab-case (e.g., check-circle.svg).
- Prefer optimized SVGs; run through SVGO when possible.
- Do not include copyrighted assets without permission.
