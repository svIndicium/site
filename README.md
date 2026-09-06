# Indicium Website

Officiële website van Studievereniging Indicium - de studievereniging voor HBO-ICT aan de Hogeschool Utrecht.

## 📚 Documentatie

Voor de volledige documentatie, zie de [project wiki](https://github.com/svIndicium/site/wiki).

Voor de planning en roadmap, bekijk het [project board](https://github.com/orgs/svIndicium/projects/2).

## 🚀 Quick Start

### Vereisten

- Node.js (versie 18 of hoger aanbevolen)
- pnpm (zie installatiehandleiding hieronder)

### Installatie

1. **Installeer pnpm**

   We gebruiken [pnpm](https://pnpm.io/) als package manager omdat deze:
   - Sneller is dan npm en yarn
   - Strengere dependency resolution heeft
   - Schijfruimte bespaart door gedeelde dependencies

   **Winget (Windows):**

   ```bash
   winget install -e --id pnpm.pnpm
   ```

   **PowerShell:**

   ```bash
   Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
   ```

   **Andere installatiemethoden:** Zie [Installation | pnpm](https://pnpm.io/installation)

2. **Installeer dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

   De applicatie is nu bereikbaar op het adres in je terminal. Meer commandos vind je in de `./package.json`

### Beschikbare Scripts

- `pnpm dev` - Start de development server
- `pnpm host` - Start de development server en maak deze beschikbaar op het netwerk
- `pnpm build` - Bouw de productie versie
- `pnpm preview` - Preview de productie build lokaal

### Dependencies updaten met Taze

We gebruiken [taze](https://github.com/antfu-collective/taze) om dependencies up-to-date te houden. Taze is een
devDependency, dus de CLI is direct beschikbaar via `pnpm exec taze`.

Update-policy staat in [`taze.config.js`](./taze.config.js):

- Het Nuxt/Vue-gedeelte staat vast op `minor` (majors zijn breaking en moeten expliciet)
- `better-sqlite3`, `firebase` en `esbuild` majors worden overgeslagen
- GitHub Actions in `.github/workflows` worden meegenomen (tag-stijl)

```bash
pnpm exec taze              # preview - laat zien wat er zou veranderen (schrijft niets)
pnpm exec taze -w           # schrijf de veilige (minor/patch) updates naar package.json
pnpm exec taze major -w     # inclusief majors en locked versies - eerst reviewen!
```

Zonder `-w` verandert taze niets; het toont alleen wat er beschikbaar is. Bij majors: controleer de breaking changes
voordat je ze merge. Taze respecteert ook `pnpm-workspace.yaml` instellingen zoals `update.ignoreDeps`.

## 🛠️ Tech Stack

- **Framework:** Vue 3 met TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS
- **State Management:** Pinia
- **Routing:** Vue Router
- **Backend/Hosting:** Firebase

## 🤝 Bijdragen

Contributie is welkom! Voor grote wijzigingen, open eerst een issue om te bespreken wat je wilt veranderen. We gebruiken
git-flow, dus gebruik graag `feature/branchnaam` en laat je merge target `development` zijn. Dan maken wij later een
release op main.

## 📄 Licentie

Dit project is eigendom van Studievereniging Indicium. Als je commits doet sta jij je code af aan de vereniging.

<p align="center">
  Gemaakt met ❤️ door de Indicium Development Commissie.
</p>
