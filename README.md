<p align="center">
  <img width="300" src="https://i.imgur.com/9UGXWYE.png">
</p>

# Wire GUI

Wire GUI is a cross-platform graphical user interface for [WireGuard](https://www.wireguard.com/).

> **Fork maintenu par [@henri26mobu](https://github.com/henri26mobu/wiregui)**  
> Basé sur le projet original de [Devsfy](https://github.com/Devsfy/wiregui), non maintenu depuis 2021.

## Fonctionnalités

- Connexion et déconnexion aux tunnels WireGuard
- Liste de tous les tunnels sauvegardés
- Affichage de la date de dernière connexion
- Affichage du tunnel actif
- Masquer/afficher les clés privées 👁
- Export de la configuration en fichier `.conf` 📤

## Téléchargement

Voir la page [releases](https://github.com/henri26mobu/wiregui/releases)

## Stack technique

- Electron 28
- React 18
- Chakra UI 2
- TypeScript 5
- Redux + redux-thunk
- Webpack 5

## Build
```bash
nvm use 20
npm install --legacy-peer-deps
npx electron-forge make --targets @electron-forge/maker-deb
```

## Licence

MIT
