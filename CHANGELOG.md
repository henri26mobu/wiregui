# Changelog

## [1.8.6] - 2026-03-01
### Added
- macOS support: Intel (x64) and Apple Silicon (arm64)
- QR code to import tunnel config on mobile
- Auto sudoers configuration on first launch (macOS)
- Live tunnel stats (endpoint, handshake, transfer)
- RPM support (Fedora/CentOS/RHEL) and AppImage (universal)

### Fixed
- Fix Homebrew PATH on macOS (`/usr/local/bin` + `/opt/homebrew/bin`)
- Fix active tunnel detection via `/var/run/wireguard` on macOS
- Fix paths with spaces in `Application Support` on macOS
- Fix `wg` path detection Intel vs Apple Silicon for sudoers

## [1.8.5] - 2026-03-01
### Added
- macOS support: Intel (x64) and Apple Silicon (arm64)
- QR code to import tunnel config on mobile
- Auto sudoers configuration on first launch (macOS)
- Live tunnel stats

### Fixed
- Fix Homebrew PATH on macOS
- Fix active tunnel detection via `/var/run/wireguard` on macOS
- Fix paths with spaces in `Application Support`

## [1.8.4] - 2026-02-27
### Added
- Live stats of the active tunnel (bandwidth, handshake, peers) 📊
- Polkit authentication for VPN toggle (replaces deprecated sudo-prompt) 🔐
- Polkit rule automatically installed/removed with the `.deb`

## [1.8.3] - 2026-02-27
### Added
- Export tunnel configuration as `.conf` file 📤
- Show / hide private keys in the interface 👁

### Technical migration
- Electron 12 → 28
- Node 16 → 20
- React 17 → 18 (createRoot)
- Chakra UI 1 → 2 (extendTheme, removed ColorModeProvider/CSSReset)
- TypeScript 4 → 5
- Webpack 4 → 5 (targets electron-main/renderer)
- electron-forge beta.54 → 7
- react-redux 7 → 8 (AppDispatch)
- framer-motion 4 → 10
- react-toastify 7 → 11
- immer 9 → 11
- recoil 0.3 → 0.7
- @emotion/react + @emotion/styled updated for Chakra v2 compatibility

### Fixed
- Rewrote MotionBox for framer-motion v10 + Chakra v2 compatibility
- Disabled fork-ts-checker-webpack-plugin (incompatible with TS5)
- copy-webpack-plugin v6 → v12
- Secured update-electron-app with try/catch
- ToastContainer switched to dark orange theme

## [1.8.2] - 2026-02-24
### Added
- Export tunnel configuration as `.conf` file
- Show / hide private keys

## [1.8.1] - Original Devsfy
### Features
- Connect / disconnect WireGuard tunnels
- Tunnel list
- Active tunnel display
- Last connection date
