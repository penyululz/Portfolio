---
# OWNER: confirm the AI tools named in "How I work with AI" (Codex is assumed from the project folder).
# OWNER: github.com/penyululz/Melodia still shows v0.2.0 (self-hosted, no LICENSE). Push the current app first, or this page describes code readers cannot see.
# OWNER: confirm the version numbers. The CHANGELOG says Desktop 1.5.2 / Android 1.5.14; package.json says 1.6.8.
title: Melodia
summary: An open-source, offline music player for your own library on Windows and Android, with gapless playback, on-device mixes and QR library transfer.
description: How I built Melodia, an open-source, offline music player for Windows and Android that moves your library between devices by QR code.
facts:
  - { label: Role, value: Sole developer }
  - { label: Year, value: "2026" }
  - { label: Platform, value: Windows & Android }
  - { label: Version, value: "Desktop 1.5.2 · Android 1.5.14" }
stack: [Electron, Next.js, React, SQLite, Kotlin, Media3, Capacitor, GPLv3]
links:
  - { label: GitHub, href: "https://github.com/penyululz/Melodia" }
inShort:
  - Streaming apps rent you music and keep your listening history on their servers. If you already own your songs, you still need a good player, and a way to get your library from your PC to your phone without uploading it anywhere.
  - Melodia is that player, for Windows and Android. It plays the audio you own offline, with gapless playback, crossfade and replay gain. Playlists, play counts, lyrics and recommendations all stay on the device. Two devices on the same Wi-Fi can swap libraries by scanning a QR code, with no account and no cloud.
  - It is open source under GPLv3. The desktop app is at version 1.5.2 and the Android app at 1.5.14, and the two are verified to exchange libraries in both directions.
hero:
  src: ../../assets/projects/melodia.webp
  alt: Melodia home screen showing personal mixes and recently played songs
---

### Architecture

The two apps share one idea: a local library that belongs to you. On Windows, an Electron window starts a private service on `127.0.0.1` with a bundled SQLite database, and hides to the tray so music keeps playing. On Android, a native Media3 service handles playback in the background while the screen changes or Bluetooth connects. Songs are saved through Android's MediaStore under `Music/Melodia`, and the catalogue, playlists and backups stay private to the app.

Both apps speak the same version-1 transfer format, so either can send to the other.

### Key decisions and trade-offs

- **Local-first over a self-hosted server.** Melodia started as a self-hosted music server and was narrowed to native apps for audio you own. Online and video sources were removed, and the Windows package contains no downloader. The cost is giving up features that depend on someone else's catalogue.
- **QR transfer over a cloud sync.** The sending device starts a short-lived service on the private network only, protected by a fresh pairing token. Nothing passes through a public server. The cost is that both devices must be on the same Wi-Fi, so a `.melodia-library` package covers the other cases, moved by USB, Drive or Nearby Share.
- **A fast preview, then verify what is copied.** The transfer preview compares track metadata instead of hashing the whole library. Only the songs the receiver actually needs are fingerprinted with SHA-256, and checked against the sender's fingerprint before they are saved. Large libraries pair quickly without giving up the integrity check.
- **Merge over replace.** A transfer copies only missing songs, then merges playlists, likes, play counts and lyrics. An interrupted transfer can simply be run again, and finished songs are skipped.
- **Reuse an open-source UI instead of starting from scratch.** The Android interface adapts the GPLv3 project [Stash](https://github.com/rawnaldclark/Stash). It keeps Melodia's own native library, playback and transfer underneath, credits the source, and stays under the same licence.

### Testing and quality

Melodia is checked mainly at release time, and I want to be clear about where it is thin.

- A CI workflow runs a type check, lint and a production build on every change to the main branch and every pull request. The release check adds a script that verifies the recommendations.
- The release checklist builds and tests the Windows installer and portable ZIP, verifies the Android APK's signature, and tests QR transfer and package import in both directions on real devices.
- Automated tests are the weak spot. There is one unit test file today, so a regression in the transfer code would be caught by the manual checklist, not a test.

### Security and privacy

- There is no account, sync service or telemetry. Listening history and recommendations never leave the device.
- The Windows service listens only on `127.0.0.1`. The QR transfer service runs only on a private network address, for a short time, behind a fresh pairing token.
- Imported packages are checked before anything is saved. Unsafe archive paths are rejected, and every audio file must match its SHA-256 fingerprint in the manifest.
- The app keeps its own files apart from music it scanned. Removing a scanned track is designed to remove it from the library, not from the disk.

### How I work with AI

I built Melodia with AI coding tools, directing the work feature by feature. The clearest example is the Android UI. Adapting Stash's interface while keeping Melodia's native playback, library and transfer bridges meant checking each screen against the real catalogue, not a demo. Cross-device behaviour needed the same care. Android and Windows record "last played" times in different formats, and transfers had to accept both.

### Lessons and what's next

- Narrowing the scope from "music server with online sources" to "a great player for music you own" made the product clearer and safer to publish.
- The bugs that mattered sat between the two platforms, such as timestamp formats. Those need automated tests most.
- Next: automated tests for the transfer manifest and merge rules, signed release builds for Windows and Android, and published releases on GitHub.
