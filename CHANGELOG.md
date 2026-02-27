# Changelog

## [1.8.3] - 2026-02-27

### Ajouts
- Export de la configuration tunnel en fichier `.conf` 📤
- Masquer/afficher les clés privées dans l'interface 👁

### Migration technique
- Electron 12 → 28
- Node 16 → 20
- React 17 → 18 (createRoot)
- Chakra UI 1 → 2 (extendTheme, suppression ColorModeProvider/CSSReset)
- TypeScript 4 → 5
- Webpack 4 → 5 (targets electron-main/renderer)
- electron-forge beta.54 → 7
- react-redux 7 → 8 (AppDispatch)
- framer-motion 4 → 10
- react-toastify 7 → 11
- immer 9 → 11
- recoil 0.3 → 0.7
- @emotion/react + @emotion/styled mis à jour pour compatibilité Chakra v2

### Corrections
- MotionBox réécrit pour compatibilité framer-motion v10 + Chakra v2
- fork-ts-checker-webpack-plugin désactivé (incompatible TS5)
- copy-webpack-plugin v6 → v12
- update-electron-app sécurisé avec try/catch
- ToastContainer en thème dark orange

## [1.8.2] - 2026-02-24

### Ajouts
- Export de la configuration tunnel en fichier `.conf`
- Masquer/afficher les clés privées

## [1.8.1] - Original Devsfy

### Fonctionnalités de base
- Connexion/déconnexion tunnels WireGuard
- Liste des tunnels
- Affichage tunnel actif
- Date de dernière connexion
