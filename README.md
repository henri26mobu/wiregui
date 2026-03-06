<p align="center">
  <img width="300" src="https://i.imgur.com/9UGXWYE.png">
</p>
<h1 align="center">WireGUI</h1>
<p align="center">
  A graphical user interface for <a href="https://www.wireguard.com/">WireGuard</a> — Linux & macOS
</p>
<p align="center">
  <a href="https://github.com/henri26mobu/wiregui/releases/latest">
    <img src="https://img.shields.io/github/v/release/henri26mobu/wiregui?style=flat-square&color=blue" alt="Latest Release">
  </a>
  <a href="https://github.com/henri26mobu/wiregui/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  </a>
  <img src="https://img.shields.io/badge/platform-Linux%20%7C%20macOS-lightgrey?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/Electron-28-47848F?style=flat-square&logo=electron" alt="Electron">
</p>
<p align="center">
  <a href="README-FR.md">🇫🇷 Version française</a>
</p>

---

> **Actively maintained fork by [@henri26mobu](https://github.com/henri26mobu/wiregui)**  
> Based on the original project by [Devsfy/wiregui](https://github.com/Devsfy/wiregui), unmaintained since 2021.

---

## Features

- 🔌 Connect / disconnect WireGuard tunnels
- 📋 List all saved tunnels
- 📊 Live stats of the active tunnel (endpoint, handshake, transfer)
- 📅 Display last connection date
- 👁 Show / hide private keys
- 📤 Export tunnel configuration as `.conf` file
- 📱 QR code to import config on mobile
- 🔐 Polkit authentication for VPN toggle (no interactive sudo)

---

## Download

Head to the [**Releases**](https://github.com/henri26mobu/wiregui/releases) page to download the latest version.

| Platform | File |
|---|---|
| Linux Debian / Ubuntu / Mint | `wiregui_x.x.x_amd64.deb` |
| Linux Fedora / CentOS / RHEL | `wiregui-x.x.x-1.x86_64.rpm` |
| Linux universal (Arch, Manjaro, etc.) | `wiregui-x.x.x-x86_64.AppImage` |
| macOS Intel | `wiregui-x.x.x-x64.dmg` |
| macOS Apple Silicon (M1/M2/M3) | `wiregui-x.x.x-arm64.dmg` |

### Linux (Debian/Ubuntu)
```bash
sudo dpkg -i wiregui_x.x.x_amd64.deb
```

### Linux (Fedora/CentOS)
```bash
sudo rpm -i wiregui-x.x.x-1.x86_64.rpm
```

### Linux (AppImage — Arch, Manjaro, etc.)
```bash
chmod +x wiregui-x.x.x-x86_64.AppImage
./wiregui-x.x.x-x86_64.AppImage
```

> ⚠️ **AppImage known limitation:** live tunnel stats require `sudo` via sudoers.  
> This works on Arch/Manjaro but **not on Fedora** due to SELinux restrictions.  
> Fedora users should use the `.rpm` package instead.

---

## Requirements

**Linux:**
- WireGuard: `sudo apt install wireguard`
- Polkit (included by default on most distributions)

**macOS:**
- WireGuard via Homebrew: `brew install wireguard-tools`
- Sudoers rights are configured automatically on first launch

---

## Build from source
```bash
git clone https://github.com/henri26mobu/wiregui.git
cd wiregui
yarn install
yarn start
yarn make
```

---

## Tech stack

| Tool | Version |
|---|---|
| Electron | 28 |
| React | 18 |
| Chakra UI | 2 |
| TypeScript | 5 |
| Node | 20 |

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b my-feature`
3. Commit: `git commit -m 'feat: my feature'`
4. Push: `git push origin my-feature`
5. Open a Pull Request

---

## License

[MIT](LICENSE.md)
