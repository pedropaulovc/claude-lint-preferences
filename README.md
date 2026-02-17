# lint-defaults

ESLint and TSConfig defaults for TypeScript projects using Claude Code.

Includes an experiment testing 19 stylistic rules across Haiku 4.5, Sonnet 4.6, and Opus 4.6 to discover Claude's natural TypeScript preferences. See [experiment-report.md](experiment-report.md) for full results.

## Config overrides (vs `stylisticTypeChecked` defaults)

| Rule | Default | Claude's preference |
|------|---------|-------------------|
| `consistent-generic-constructors` | `constructor` (`new Map<K,V>()`) | `type-annotation` (`const x: Map<K,V> = new Map()`) |
| `consistent-indexed-object-style` | `record` (`Record<string, T>`) | `index-signature` (`{ [key: string]: T }`) |
| `no-inferrable-types` | on (strip annotations) | off (keep `const x: number = 0`) |

## License

This project is released into the public domain under [The Unlicense](LICENSE).
