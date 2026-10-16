---
title: AssetFlow
summary: An offline Windows app for tracking lab equipment, with inventory, weekly inspections, work orders and Excel/PDF reports on a local PostgreSQL engine.
description: How I built AssetFlow, an offline Windows app for lab equipment, weekly inspections and work orders, running its own PostgreSQL engine on one PC.
facts:
  - { label: Role, value: Sole developer }
  - { label: Year, value: "2026" }
  - { label: Platform, value: Windows 10 and 11 }
  # OWNER: confirm "In use" (README says "not yet widely used"; you imported real workbooks on 15 Oct 2026).
  - { label: Status, value: "v3.1.1, in use" }
stack: [Electron, Next.js, React, PostgreSQL 17, Drizzle ORM, Zod, ExcelJS, Playwright]
inShort:
  - Labs need to know what equipment they have, what condition it is in, what was checked this week and what is broken. The previous tool, LabReport 2.6, had known failures. A save could be lost while the connection was struggling, and a retry could record the same change twice.
  - AssetFlow replaces it with a Windows program that runs entirely on one computer, with no Internet, server or password. It covers inventory, weekly inspections with a checklist and review, issues and work orders, and reports in Excel and PDF. Staff can also fill in a workbook away from the computer and import it back.
  - It ships as a single installer, version 3.1.1. More than 420 server and unit tests and 100 browser tests pass against a real PostgreSQL 17 database. One rule runs through all of it. Unknown is never shown as healthy, so an item nobody checked is reported as not checked, not as working.
hero:
  src: ../../assets/projects/assetflow.png
  alt: AssetFlow home screen showing weekly inspections and recent activity
---

### Architecture

AssetFlow looks like a web app because its screens are built with Next.js and React, but there is no server to host. The window, built with Electron, starts a private engine on the same computer. The engine runs its own PostgreSQL 17 database and the application, both listening only on `127.0.0.1` on free ports. When the window closes, the engine shuts the database down cleanly and nothing is left running.

On every start the engine clears anything an interrupted run left behind, applies new database migrations, and waits until the application answers a real request before the window opens. "Started" is not the same as "working".

### Key decisions and trade-offs

- **An offline desktop program over a hosted web app.** Labs should not need an IT administrator, a server or a network to keep their records. The cost is one computer, one set of records. Records move between computers by backup or by Excel workbook.
- **One way to write.** Every change goes through a single endpoint, with an action name and a request identity. A repeated request returns the first result, so a retry never does the work twice. That one rule designs out LabReport 2.6's duplicate-save failure. The cost is that every new feature needs its own action handler.
- **Nothing is overwritten silently.** Rows carry a version, and a save against an older version is refused with a message. Stock movements, events and the audit trail are append-only, enforced by database triggers. Any report can be shown as it was on a past date. This costs more storage and more careful queries.
- **Native HTML controls over a component library.** Every button has an explicit type, and a script fails the build if a form is missing one. This removes a class of "the button did nothing" bugs, at the cost of more styling work.
- **Plain SQL templates for writes over a query builder.** Conflict handling, locks and counters are easier to review as SQL.

### Testing and quality

- More than 420 server and unit tests and 100 browser tests, with automated accessibility checks (axe), run against a real PostgreSQL 17 database.
- The tests connect as the same restricted database role the application uses, so a test cannot pass because it had more access than the real program.
- Each known LabReport 2.6 failure has a test that reproduces it. For example, a connection reset straight after a save, or a background refresh failing while the user saves.
- The engine's set-up, start, stop, backup and restore are tested for real in a throwaway folder, including from the packaged program.
- Each round of work ends with recorded evidence. Code audits are tracked as numbered findings (R01 to R12, N01 to N09) until each one is fixed or ruled on.

### Security and privacy

- Nothing listens on the network. The window cancels every request that is not to the computer itself, and there is no telemetry, update check or font loaded from outside.
- Database passwords are generated at first start, stored encrypted by Windows (DPAPI) and never shown. The application runs as a database role that cannot change the schema.
- Excel workbooks are read in a separate worker with limits on size, rows and compression, so a hostile file cannot exhaust the computer.
- Backups carry a manifest of SHA-256 checksums. A restore goes through a staging database, so a failed restore leaves nothing half-done.
- The limits are stated plainly. There is no application password, so the Windows account is the boundary, and the documentation recommends turning on BitLocker for that reason.

### How I work with AI

I build AssetFlow by directing AI coding agents. The repository carries a working guide that every agent must read first. It sets rules that cannot be broken, for example: never touch the real records, keep one write path, stay offline by default, and never edit a released database migration.

I also run independent audits with a second AI tool and paste the findings back in. Each finding is treated as a claim to verify, not an instruction to apply blindly. Every phase is written up in a handover document with the tests that were run, so I can check what was actually done rather than take it on trust.

### Lessons and what's next

- Writing down how the old version failed, then giving each failure a test, did more for reliability than any single feature.
- Being honest about limits, such as no application password, one computer and a fixed time zone, makes the program easier to trust.
- Next: code-sign the installer so Windows stops warning about it, and get it used more widely to find what only real use reveals.
