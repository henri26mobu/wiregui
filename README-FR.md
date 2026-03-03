<p align="center">
  <img width="300" src="https://i.imgur.com/9UGXWYE.png">
</p>

<h1 align="center">WireGUI</h1>

<p align="center">
  Une interface graphique pour <a href="https://www.wireguard.com/">WireGuard</a> — Linux & macOS
</p>

<p align="center">
  <a href="https://github.com/henri26mobu/wiregui/releases/latest">
    <img src="https://img.shields.io/github/v/release/henri26mobu/wiregui?style=flat-square&color=blue" alt="Dernière version">
  </a>
  <a href="https://github.com/henri26mobu/wiregui/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/licence-MIT-green?style=flat-square" alt="Licence">
  </a>
  <img src="https://img.shields.io/badge/plateforme-Linux%20%7C%20macOS-lightgrey?style=flat-square" alt="Plateforme">
  <img src="https://img.shields.io/badge/Electron-28-47848F?style=flat-square&logo=electron" alt="Electron">
</p>

<p align="center">
  <a href="README.md">🇬🇧 English version</a>
</p>

---

> **Fork actif maintenu par [@henri26mobu](https://github.com/henri26mobu/wiregui)**  
> Basé sur le projet original de [Devsfy/wiregui](https://github.com/Devsfy/wiregui), abandonné depuis 2021.

---

## Fonctionnalités

- 🔌 Connexion / déconnexion aux tunnels WireGuard
- 📋 Liste de tous les tunnels sauvegardés
- 📊 Stats en temps réel du tunnel actif (endpoint, handshake, transfert)
- 📅 Affichage de la date de dernière connexion
- 👁 Masquer / afficher les clés privées
- 📤 Export de la configuration en fichier `.conf`
- 📱 QR code pour importer la config sur mobile
- 🔐 Authentification polkit pour le toggle VPN (sans sudo interactif)

---

## Téléchargement

Rendez-vous sur la page [**Releases**](https://github.com/henri26mobu/wiregui/releases) pour télécharger la dernière version.

| Plateforme | Fichier |
|---|---|
| Linux Debian / Ubuntu / Mint | `wiregui_x.x.x_amd64.deb` |
| Linux Fedora / CentOS / RHEL | `wiregui-x.x.x-1.x86_64.rpm` |
| Linux universel (Arch, etc.) | `wiregui-x.x.x-x86_64.AppImage` |
| macOS Intel | `wiregui-x.x.x-x64.dmg` |
| macOS Apple Silicon (M1/M2/M3) | `wiregui-x.x.x-arm64.dmg` |

### Linux (Debian/Ubuntu)

\`\`\`bash
sudo dpkg -i wiregui_x.x.x_amd64.deb
\`\`\`

### Linux (Fedora/CentOS)

\`\`\`bash
sudo rpm -i wiregui-x.x.x-1.x86_64.rpm
\`\`\`

### Linux (AppImage)

\`\`\`bash
chmod +x wiregui-x.x.x-x86_64.AppImage
./wiregui-x.x.x-x86_64.AppImage
\`\`\`

---

## Prérequis

**Linux :**
- WireGuard : `sudo apt install wireguard`
- Polkit (inclus par défaut sur la plupart des distributions)

**macOS :**
- WireGuard via Homebrew : `brew install wireguard-tools`
- Les droits sudoers sont configurés automatiquement au premier lancement

---

## Build depuis les sources

\`\`\`bash
git clone https://github.com/henri26mobu/wiregui.git
cd wiregui
yarn install
yarn start
yarn make
\`\`\`

---

## Stack technique

| Outil | Version |
|---|---|
| Electron | 28 |
| React | 18 |
| Chakra UI | 2 |
| TypeScript | 5 |
| Node | 20 |

---

## Contribuer

Les contributions sont les bienvenues !

1. Fork le repo
2. Crée une branche : `git checkout -b ma-feature`
3. Commit : `git commit -m 'feat: ma feature'`
4. Push : `git push origin ma-feature`
5. Ouvre une Pull Request

---

## Licence

[MIT](LICENSE.md)
