# Contributing to WireGUI

Thank you for your interest in contributing! Here's how to get started.

## Prerequisites

- Node 20+
- Yarn
- WireGuard installed on your system

## Setup
```bash
git clone https://github.com/henri26mobu/wiregui.git
cd wiregui
yarn install
yarn start
```

## Workflow

1. Fork the repo
2. Create a branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Test locally with `yarn start`
5. Commit: `git commit -m 'feat: description'`
6. Push: `git push origin feat/my-feature`
7. Open a Pull Request

## Commit convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Maintenance, deps update |
| `docs:` | Documentation only |
| `refactor:` | Code refactor |
| `ci:` | CI/CD changes |

## Build
```bash
yarn make
```

Outputs binaries to `out/`.

## Reporting bugs

Open an issue with:
- Your OS and version
- WireGUI version
- Steps to reproduce
- Expected vs actual behavior

## Questions

Open a [discussion](https://github.com/henri26mobu/wiregui/discussions) or an issue.
