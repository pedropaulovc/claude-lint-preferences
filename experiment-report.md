# Claude's Natural TypeScript Style Preferences

An experiment to discover what TypeScript style choices Claude makes naturally,
without any linting guidance. Each rule was tested with 6 agents:
2x Haiku 4.5, 2x Sonnet 4.6, 2x Opus 4.6.

**Date:** 2026-02-17
**Rules tested:** 19
**Total agents:** 114

## Summary

| Rule | Kind | Default | Alternative | Default | Alt | N/A | Recommendation |
|------|------|---------|-------------|---------|-----|-----|----------------|
| `array-type` | option | array | generic | 6/6 | 0/6 | 0/6 | Keep |
| `class-literal-property-style` | option | fields | getters | 6/6 | 0/6 | 0/6 | Keep |
| `consistent-generic-constructors` | option | constructor | type-annotation | 2/6 | 4/6 | 0/6 | **FLIP** |
| `consistent-indexed-object-style` | option | record | index-signature | 1/6 | 5/6 | 0/6 | **FLIP** |
| `consistent-type-assertions` | option | as | angle-bracket | 6/6 | 0/6 | 0/6 | Keep |
| `consistent-type-definitions` | option | interface | type | 5/6 | 1/6 | 0/6 | Keep |
| `no-inferrable-types` | on-off | on | off | 2/6 | 4/6 | 0/6 | **FLIP** |
| `non-nullable-type-assertion-style` | on-off | on | off | 4/6 | 2/6 | 0/6 | Keep |
| `prefer-for-of` | on-off | on | off | 4/6 | 2/6 | 0/6 | Keep |
| `prefer-function-type` | on-off | on | off | 6/6 | 0/6 | 0/6 | Keep |
| `prefer-includes` | on-off | on | off | 4/6 | 2/6 | 0/6 | Keep |
| `prefer-nullish-coalescing` | on-off | on | off | 3/6 | 2/6 | 1/6 | Keep |
| `prefer-optional-chain` | on-off | on | off | 5/6 | 1/6 | 0/6 | Keep |
| `prefer-regexp-exec` | on-off | on | off | 3/6 | 3/6 | 0/6 | Keep |
| `prefer-string-starts-ends-with` | on-off | on | off | 4/6 | 2/6 | 0/6 | Keep |
| `prefer-find` | on-off | on | off | 6/6 | 0/6 | 0/6 | Keep |
| `dot-notation` | on-off | on | off | 5/6 | 1/6 | 0/6 | Keep |
| `noUnusedLocals` | tsconfig | on | off | 6/6 | 0/6 | 0/6 | Keep |
| `noUnusedParameters` | tsconfig | on | off | 6/6 | 0/6 | 0/6 | Keep |

## Config Changes

### Before (`eslint.config.mjs`)

```javascript
import playwright from "eslint-plugin-playwright";
import js from "@eslint/js";
import reactRefresh from "eslint-plugin-react-refresh";
import nextConfig from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next/**/*", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "coverage/**"] },
  ...nextConfig,
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["error", { allowConstantExport: true }],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
        },
      ],
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["src/app/**/layout.tsx", "src/app/**/page.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["*.config.ts", "*.config.js", "*.config.mjs", "playwright.config.ts"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["e2e/**/*.spec.ts"],
    extends: [playwright.configs["flat/recommended"]],
    rules: {
      "playwright/no-skipped-test": "error",
      "playwright/no-conditional-in-test": "error",
    },
  },
);
```

### After (`eslint.config.mjs`)

```javascript
import playwright from "eslint-plugin-playwright";
import js from "@eslint/js";
import reactRefresh from "eslint-plugin-react-refresh";
import nextConfig from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next/**/*", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "coverage/**"] },
  ...nextConfig,
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["error", { allowConstantExport: true }],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
        },
      ],
      "react-hooks/exhaustive-deps": "error",
      // Claude style preferences (experiment 2026-02-17):
      // Claude naturally writes `const x: Map<K,V> = new Map()` (type on left)
      "@typescript-eslint/consistent-generic-constructors": ["error", "type-annotation"],
      // Claude naturally writes `{ [key: string]: T }` over `Record<string, T>`
      "@typescript-eslint/consistent-indexed-object-style": ["error", "index-signature"],
      // Claude naturally annotates inferrable types: `const x: number = 0`
      "@typescript-eslint/no-inferrable-types": "off",
    },
  },
  {
    files: ["src/app/**/layout.tsx", "src/app/**/page.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["*.config.ts", "*.config.js", "*.config.mjs", "playwright.config.ts"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["e2e/**/*.spec.ts"],
    extends: [playwright.configs["flat/recommended"]],
    rules: {
      "playwright/no-skipped-test": "error",
      "playwright/no-conditional-in-test": "error",
    },
  },
);
```

### Diff

Three rules added to override `stylisticTypeChecked` defaults:

```diff
       "react-hooks/exhaustive-deps": "error",
+      // Claude style preferences (experiment 2026-02-17):
+      // Claude naturally writes `const x: Map<K,V> = new Map()` (type on left)
+      "@typescript-eslint/consistent-generic-constructors": ["error", "type-annotation"],
+      // Claude naturally writes `{ [key: string]: T }` over `Record<string, T>`
+      "@typescript-eslint/consistent-indexed-object-style": ["error", "index-signature"],
+      // Claude naturally annotates inferrable types: `const x: number = 0`
+      "@typescript-eslint/no-inferrable-types": "off",
     },
```

## Detailed Results

### `array-type`

- **Kind:** option
- **Default:** array
- **Alternative:** generic
- **Recommendation:** Keep array

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
type BooleanGrid = boolean[][];

function processItems(numbers: number[], strings: string[]) {
  const doubled = numbers.map(n => n * 2);
  const uppercased = strings.map(s => s.toUpperCase());
  return { doubled, uppercased };
}

```

</details>

### `class-literal-property-style`

- **Kind:** option
- **Default:** fields
- **Alternative:** getters
- **Recommendation:** Keep fields

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
class AppConfig {
  readonly appName = 'MyApp';
  readonly maxRetries = 3;
  readonly isProduction = false;
  readonly apiVersion = '1.0.0';

  constructor() {}
}

```

</details>

### `consistent-generic-constructors`

- **Kind:** option
- **Default:** constructor
- **Alternative:** type-annotation
- **Recommendation:** **FLIP** to type-annotation

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 3 | no |
| haiku-2 | haiku | Yes | 3 | no |
| sonnet-1 | sonnet | Yes | 4 | no |
| sonnet-2 | sonnet | Yes | 4 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const stringToNumberMap: Map<string, number> = new Map([
  ['a', 1],
  ['b', 2]
]);

const stringSet: Set<string> = new Set(['hello', 'world']);

const numberArray: number[] = [1, 2, 3];

const box: Box<string> = new Box('test');

```

</details>

### `consistent-indexed-object-style`

- **Kind:** option
- **Default:** record
- **Alternative:** index-signature
- **Recommendation:** **FLIP** to index-signature

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 3 | no |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 3 | no |
| sonnet-2 | sonnet | Yes | 3 | no |
| opus-1 | opus | Yes | 3 | no |
| opus-2 | opus | Yes | 3 | no |

<details><summary>Sample code (haiku-1)</summary>

```typescript
type NumberDictionary = {
  [key: string]: number;
};

type Cache = {
  [key: string]: {
    value: unknown;
    expiry: number;
  };
};

function countTrueValues(mappings: { [key: string]: boolean }): number {
  let count = 0;
  for (const key in mappings) {
    if (mappings[key]) {
      count++;
    }
  }
  return count;
}

```

</details>

### `consistent-type-assertions`

- **Kind:** option
- **Default:** as
- **Alternative:** angle-bracket
- **Recommendation:** Keep as

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function parseResponse(input: unknown) {
  const response = input as { status: number; data: string };
  return response;
}

function handleDomNode(node: unknown) {
  const domNode = node as { nodeType: number; textContent: string | null };
  return domNode;
}

```

</details>

### `consistent-type-definitions`

- **Kind:** option
- **Default:** interface
- **Alternative:** type
- **Recommendation:** Keep interface

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 1 | no |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

type AdminUser = User & {
  permissions: string[];
  lastLogin: Date;
};

interface UserService {
  findById(id: number): User | null;
  create(user: User): void;
  delete(id: number): void;
}

type UserRole = 'admin' | 'editor' | 'viewer';

```

</details>

### `no-inferrable-types`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** **FLIP** to off

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 4 | no |
| sonnet-2 | sonnet | Yes | 4 | no |
| opus-1 | opus | Yes | 4 | no |
| opus-2 | opus | Yes | 4 | no |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function createUserProfile() {
  const name = 'John';
  const age = 25;
  const active = true;
  const tags: string[] = [];
  let counter = 0;

  counter = tags.length + 1;

  return {
    name,
    age,
    active,
    tags,
    counter
  };
}

```

</details>

### `non-nullable-type-assertion-style`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 2 | no |
| sonnet-2 | sonnet | Yes | 1 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function getFirstElement(map: Map<string, number[]>, key: string): number {
  const array = map.get(key)!;
  return array[0];
}

function findItemName(items: Array<{ name: string }>, predicate: (item: { name: string }) => boolean): string {
  const item = items.find(predicate)!;
  return item.name;
}

```

</details>

### `prefer-for-of`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 3 | no |
| sonnet-2 | sonnet | Yes | 3 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function sumArray(numbers: number[]): number {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}

function findMax(numbers: number[]): number {
  let max = -Infinity;
  for (const num of numbers) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}

function collectStrings(objects: Array<{ label: string }>): string[] {
  const labels: string[] = [];
  for (const obj of objects) {
    labels.push(obj.label);
  }
  return labels;
}

```

</details>

### `prefer-function-type`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
type SimpleCallback = (input: string) => void;

type Comparator = (a: number, b: number) => number;

type Predicate = (value: unknown) => boolean;

type AsyncFetcher = (url: string) => Promise<unknown>;

```

</details>

### `prefer-includes`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 3 | no |
| sonnet-2 | sonnet | Yes | 3 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function hasPermission(permissions: string[], target: string): boolean {
  return permissions.includes(target);
}

function containsSubstring(text: string, substring: string): boolean {
  return text.includes(substring);
}

function isValidStatus(status: number, validStatuses: number[]): boolean {
  return validStatuses.includes(status);
}

```

</details>

### `prefer-nullish-coalescing`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | No | 0 | inconclusive |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 1 | no |
| sonnet-2 | sonnet | Yes | 1 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-2)</summary>

```typescript
function getDisplayName(params: { firstName?: string; lastName?: string; nickname?: string | null; fallbackName: string }): string {
  return params.nickname ?? (`${params.firstName ?? ''} ${params.lastName ?? ''}`.trim() || params.fallbackName);
}

function getNumberOrDefault(value?: number): number {
  return value ?? 0;
}

```

</details>

### `prefer-optional-chain`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 2 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function getNestedValue(obj: { user?: { profile?: { address?: { city?: string } } } }): string | undefined {
  return obj.user?.profile?.address?.city;
}

function getFirstItemName(data: { data?: { items?: Array<{ name: string }> } }): string | undefined {
  return data.data?.items?.[0]?.name;
}

```

</details>

### `prefer-regexp-exec`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 2 | no |
| sonnet-2 | sonnet | Yes | 2 | no |
| opus-1 | opus | Yes | 2 | no |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function extractNumbers(text: string): number | null {
  const match = /\d+/.exec(text);
  return match ? parseInt(match[0], 10) : null;
}

function extractEmail(text: string): string | null {
  const match = /\w+@\w+\.\w+/.exec(text);
  return match ? match[0] : null;
}

```

</details>

### `prefer-string-starts-ends-with`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 3 | no |
| sonnet-2 | sonnet | Yes | 5 | no |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function isHttpUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

function hasFileExtension(filename: string): boolean {
  return filename.endsWith('.ts') || filename.endsWith('.js');
}

function isComment(line: string): boolean {
  return line.trim().startsWith('//');
}

```

</details>

### `prefer-find`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function getActiveUser(users: Array<{ id: number; name: string; active: boolean }>): { id: number; name: string; active: boolean } | undefined {
  return users.find(user => user.active);
}

function getOldestItem(items: Array<{ createdAt: number; label: string }>): { createdAt: number; label: string } | undefined {
  return items.find(item => {
    const oldest = items.reduce((min, current) => current.createdAt < min.createdAt ? current : min);
    return item === oldest;
  });
}

```

</details>

### `dot-notation`

- **Kind:** on-off
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 12 | no |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function getObjectProperties(obj: { name: string; age: number; email: string }): string {
  return `${obj.name} is ${obj.age} years old and can be reached at ${obj.email}`;
}

function updateProperties(obj: { name: string; age: number; email: string }): void {
  obj.name = 'Updated';
  obj.age = 30;
  obj.email = 'new@example.com';
}

```

</details>

### `noUnusedLocals`

- **Kind:** tsconfig
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
function processData(items: Array<{ id: number; value: string; metadata: string }>): Array<{ identifier: number; content: string }> {
  const totalCount = items.length;
  const filtered = items.filter(item => item.value.length > 0);
  const mapped = filtered.map(item => ({
    identifier: item.id,
    content: item.value
  }));
  return mapped;
}

```

</details>

### `noUnusedParameters`

- **Kind:** tsconfig
- **Default:** on
- **Alternative:** off
- **Recommendation:** Keep on

| Agent | Model | Compiles | Violations | Matches Default |
|-------|-------|----------|------------|-----------------|
| haiku-1 | haiku | Yes | 0 | yes |
| haiku-2 | haiku | Yes | 0 | yes |
| sonnet-1 | sonnet | Yes | 0 | yes |
| sonnet-2 | sonnet | Yes | 0 | yes |
| opus-1 | opus | Yes | 0 | yes |
| opus-2 | opus | Yes | 0 | yes |

<details><summary>Sample code (haiku-1)</summary>

```typescript
type EventHandler = (eventName: string, data: unknown, timestamp: number) => void;

function createLogger(): EventHandler {
  return (eventName: string, data: unknown, _timestamp: number) => {
    console.log(`Event: ${eventName}`, data);
  };
}

function createCounter(): EventHandler {
  const counts: Record<string, number> = {};

  return (eventName: string, _data: unknown, _timestamp: number) => {
    counts[eventName] = (counts[eventName] ?? 0) + 1;
  };
}

```

</details>

## Model Agreement Analysis

| Model | Matches Default | Uses Alternative | Inconclusive |
|-------|----------------|------------------|--------------|
| Haiku 4.5 | 33/38 (87%) | 4/38 (11%) | 1/38 |
| Sonnet 4.6 | 18/38 (47%) | 20/38 (53%) | 0/38 |
| Opus 4.6 | 33/38 (87%) | 5/38 (13%) | 0/38 |
