import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, join } from "path";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RuleDefinition {
  name: string;
  kind: "option" | "on-off" | "tsconfig";
  defaultValue: string;
  alternativeValue: string;
  eslintConfig: (worktreeDir: string) => string;
  tsconfigOverrides?: Record<string, unknown>;
}

interface AgentResult {
  agent: string;
  model: string;
  code: string;
  compiles: boolean;
  compileError?: string;
  lintViolations: number;
  lintDetails?: string;
  matchesDefault: "yes" | "no" | "inconclusive";
}

interface RuleResult {
  rule: string;
  kind: string;
  defaultValue: string;
  alternativeValue: string;
  agents: AgentResult[];
  defaultCount: number;
  alternativeCount: number;
  inconclusiveCount: number;
  recommendation: "keep-default" | "flip" | "inconclusive";
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ROOT = resolve("C:\\src\\lint-defaults");

const AGENTS: Array<{ name: string; model: string }> = [
  { name: "haiku-1", model: "haiku" },
  { name: "haiku-2", model: "haiku" },
  { name: "sonnet-1", model: "sonnet" },
  { name: "sonnet-2", model: "sonnet" },
  { name: "opus-1", model: "opus" },
  { name: "opus-2", model: "opus" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function worktreePath(agent: string): string {
  return join(ROOT, "worktrees", agent);
}

function solutionPath(agent: string, rule: string): string {
  return join(ROOT, "solutions", agent, `${rule}.ts`);
}

function makeBaseEslintConfig(
  worktreeDir: string,
  ruleOverrides: Record<string, unknown>
): string {
  const rulesStr = JSON.stringify(ruleOverrides, null, 6);
  return `import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: ${JSON.stringify(worktreeDir.replace(/\\/g, "\\\\"))},
      },
    },
    rules: ${rulesStr},
  }
);
`;
}

function makeTsconfig(overrides?: Record<string, unknown>): string {
  const base: Record<string, unknown> = {
    target: "ES2023",
    lib: ["ES2023"],
    strict: true,
    noEmit: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noUncheckedIndexedAccess: false,
    useUnknownInCatchVariables: true,
    exactOptionalPropertyTypes: false,
    noImplicitReturns: true,
    esModuleInterop: true,
    module: "ES2022",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    skipLibCheck: true,
  };

  if (overrides) {
    Object.assign(base, overrides);
  }

  return JSON.stringify(
    {
      compilerOptions: base,
      include: ["solution.ts"],
    },
    null,
    2
  );
}

// ─── Rule Definitions ────────────────────────────────────────────────────────

function eslintConfigForRule(
  rule: string,
  worktreeDir: string,
  setting: unknown
): string {
  return makeBaseEslintConfig(worktreeDir, {
    [`@typescript-eslint/${rule}`]: setting,
  });
}

const RULES: RuleDefinition[] = [
  {
    name: "array-type",
    kind: "option",
    defaultValue: "array",
    alternativeValue: "generic",
    eslintConfig: (dir) =>
      eslintConfigForRule("array-type", dir, ["error", { default: "array" }]),
  },
  {
    name: "class-literal-property-style",
    kind: "option",
    defaultValue: "fields",
    alternativeValue: "getters",
    eslintConfig: (dir) =>
      eslintConfigForRule("class-literal-property-style", dir, [
        "error",
        "fields",
      ]),
  },
  {
    name: "consistent-generic-constructors",
    kind: "option",
    defaultValue: "constructor",
    alternativeValue: "type-annotation",
    eslintConfig: (dir) =>
      eslintConfigForRule("consistent-generic-constructors", dir, [
        "error",
        "constructor",
      ]),
  },
  {
    name: "consistent-indexed-object-style",
    kind: "option",
    defaultValue: "record",
    alternativeValue: "index-signature",
    eslintConfig: (dir) =>
      eslintConfigForRule("consistent-indexed-object-style", dir, [
        "error",
        "record",
      ]),
  },
  {
    name: "consistent-type-assertions",
    kind: "option",
    defaultValue: "as",
    alternativeValue: "angle-bracket",
    eslintConfig: (dir) =>
      eslintConfigForRule("consistent-type-assertions", dir, [
        "error",
        { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
      ]),
  },
  {
    name: "consistent-type-definitions",
    kind: "option",
    defaultValue: "interface",
    alternativeValue: "type",
    eslintConfig: (dir) =>
      eslintConfigForRule("consistent-type-definitions", dir, [
        "error",
        "interface",
      ]),
  },
  {
    name: "no-inferrable-types",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("no-inferrable-types", dir, "error"),
  },
  {
    name: "non-nullable-type-assertion-style",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("non-nullable-type-assertion-style", dir, "error"),
  },
  {
    name: "prefer-for-of",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-for-of", dir, "error"),
  },
  {
    name: "prefer-function-type",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-function-type", dir, "error"),
  },
  {
    name: "prefer-includes",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-includes", dir, "error"),
  },
  {
    name: "prefer-nullish-coalescing",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-nullish-coalescing", dir, [
        "error",
        { ignorePrimitives: true },
      ]),
  },
  {
    name: "prefer-optional-chain",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-optional-chain", dir, "error"),
  },
  {
    name: "prefer-regexp-exec",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-regexp-exec", dir, "error"),
  },
  {
    name: "prefer-string-starts-ends-with",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-string-starts-ends-with", dir, "error"),
  },
  {
    name: "prefer-find",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("prefer-find", dir, "error"),
  },
  {
    name: "dot-notation",
    kind: "on-off",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) =>
      eslintConfigForRule("dot-notation", dir, [
        "error",
        { allowKeywords: true },
      ]),
  },
  {
    name: "noUnusedLocals",
    kind: "tsconfig",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) => makeBaseEslintConfig(dir, {}),
    tsconfigOverrides: { noUnusedLocals: true },
  },
  {
    name: "noUnusedParameters",
    kind: "tsconfig",
    defaultValue: "on",
    alternativeValue: "off",
    eslintConfig: (dir) => makeBaseEslintConfig(dir, {}),
    tsconfigOverrides: { noUnusedParameters: true },
  },
];

// ─── Compilation Check ───────────────────────────────────────────────────────

function checkCompilation(worktreeDir: string): {
  success: boolean;
  error?: string;
} {
  try {
    execSync(
      `npx tsc --noEmit --project "${join(worktreeDir, "tsconfig.json")}"`,
      {
        cwd: ROOT,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 30_000,
      }
    );
    return { success: true };
  } catch (err: unknown) {
    const error = err as { stderr?: string; stdout?: string };
    return {
      success: false,
      error: (error.stderr ?? error.stdout ?? "Unknown compilation error").slice(0, 1000),
    };
  }
}

// ─── Lint Check ──────────────────────────────────────────────────────────────

function checkLint(
  worktreeDir: string,
  ruleName: string
): { violations: number; details?: string } {
  const parseEslintOutput = (
    stdout: string,
    targetRule: string
  ): { violations: number; details?: string } => {
    try {
      const parsed = JSON.parse(stdout) as Array<{
        messages: Array<{ ruleId: string; message: string }>;
      }>;
      const messages = parsed[0]?.messages ?? [];
      const relevant = messages.filter(
        (m) =>
          m.ruleId === `@typescript-eslint/${targetRule}` ||
          m.ruleId === targetRule
      );
      return {
        violations: relevant.length,
        details:
          relevant.length > 0
            ? relevant.map((m) => m.message).join("; ")
            : undefined,
      };
    } catch {
      return { violations: -1, details: `Parse error on: ${stdout.slice(0, 200)}` };
    }
  };

  try {
    const solutionFile = join(worktreeDir, "solution.ts");
    const configFile = join(worktreeDir, "eslint.config.mjs");
    const result = execSync(
      `npx eslint --config "${configFile}" --format json "${solutionFile}"`,
      {
        cwd: ROOT,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 60_000,
      }
    );
    return parseEslintOutput(result, ruleName);
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string };
    const stdout = error.stdout ?? "";
    if (stdout.startsWith("[")) {
      return parseEslintOutput(stdout, ruleName);
    }
    return {
      violations: -1,
      details: `Lint error: ${(error.stderr ?? error.stdout ?? "unknown").slice(0, 500)}`,
    };
  }
}

// ─── TSConfig Check ──────────────────────────────────────────────────────────

function checkTsconfigRule(
  worktreeDir: string,
  ruleName: string
): { violations: number; details?: string } {
  const { success, error } = checkCompilation(worktreeDir);
  if (success) {
    return { violations: 0 };
  }

  const errorStr = error ?? "";
  let count = 0;
  if (
    (ruleName === "noUnusedLocals" || ruleName === "noUnusedParameters") &&
    errorStr.includes("declared but")
  ) {
    count = (errorStr.match(/is declared but/g) ?? []).length;
  }

  return { violations: count, details: errorStr.slice(0, 500) };
}

// ─── Main Analysis ───────────────────────────────────────────────────────────

function runAnalysis(): void {
  const allResults: RuleResult[] = [];

  console.log(`\n${"=".repeat(60)}`);
  console.log(`  TypeScript Style Preferences — Analysis`);
  console.log(`  Analyzing ${RULES.length} rules × ${AGENTS.length} agents`);
  console.log(`${"=".repeat(60)}\n`);

  // Check that solution files exist
  let missing = 0;
  for (const rule of RULES) {
    for (const agent of AGENTS) {
      const path = solutionPath(agent.name, rule.name);
      if (!existsSync(path)) {
        console.warn(`  MISSING: ${path}`);
        missing++;
      }
    }
  }
  if (missing > 0) {
    console.error(`\n${missing} solution files missing. Run code generation first.`);
    process.exit(1);
  }

  for (const rule of RULES) {
    console.log(`\n── Rule: ${rule.name} (${rule.kind}) ──`);
    console.log(`   Default: ${rule.defaultValue} | Alternative: ${rule.alternativeValue}`);

    const agentResults: AgentResult[] = [];

    for (const agent of AGENTS) {
      const dir = worktreePath(agent.name);

      // Read the solution and copy to worktree
      const code = readFileSync(solutionPath(agent.name, rule.name), "utf-8");
      writeFileSync(join(dir, "solution.ts"), code);

      // Write rule-specific eslint config
      const eslintContent = rule.eslintConfig(dir);
      writeFileSync(join(dir, "eslint.config.mjs"), eslintContent);

      // Write tsconfig
      const tscontent = makeTsconfig(rule.tsconfigOverrides);
      writeFileSync(join(dir, "tsconfig.json"), tscontent);

      // Check compilation (without the tsconfig rule first for tsconfig rules)
      const baseTscontent = makeTsconfig();
      if (rule.kind === "tsconfig") {
        // First check if it compiles at all (without the strict option)
        writeFileSync(join(dir, "tsconfig.json"), baseTscontent);
      }
      const compilation = checkCompilation(dir);

      let violations = 0;
      let lintDetails: string | undefined;

      if (rule.kind === "tsconfig") {
        if (compilation.success) {
          // Now check with the strict option enabled
          const strictTscontent = makeTsconfig(rule.tsconfigOverrides);
          writeFileSync(join(dir, "tsconfig.json"), strictTscontent);
          const result = checkTsconfigRule(dir, rule.name);
          violations = result.violations;
          lintDetails = result.details;
        }
      } else if (compilation.success) {
        const result = checkLint(dir, rule.name);
        violations = result.violations;
        lintDetails = result.details;
      }

      let matchesDefault: "yes" | "no" | "inconclusive";
      if (!compilation.success) {
        matchesDefault = "inconclusive";
      } else if (violations === 0) {
        matchesDefault = "yes";
      } else if (violations > 0) {
        matchesDefault = "no";
      } else {
        matchesDefault = "inconclusive";
      }

      const status =
        matchesDefault === "yes"
          ? "DEFAULT"
          : matchesDefault === "no"
            ? "ALT"
            : "???";
      const compileStatus = compilation.success ? "OK" : "FAIL";
      console.log(
        `   [${agent.name}] compile=${compileStatus} violations=${violations} → ${status}`
      );

      agentResults.push({
        agent: agent.name,
        model: agent.model,
        code: code.slice(0, 2000),
        compiles: compilation.success,
        compileError: compilation.error,
        lintViolations: violations,
        lintDetails,
        matchesDefault,
      });
    }

    const defaultCount = agentResults.filter(
      (a) => a.matchesDefault === "yes"
    ).length;
    const altCount = agentResults.filter(
      (a) => a.matchesDefault === "no"
    ).length;
    const inconclusiveCount = agentResults.filter(
      (a) => a.matchesDefault === "inconclusive"
    ).length;

    let recommendation: "keep-default" | "flip" | "inconclusive";
    if (inconclusiveCount >= 4) {
      recommendation = "inconclusive";
    } else if (altCount > defaultCount) {
      recommendation = "flip";
    } else {
      recommendation = "keep-default";
    }

    console.log(
      `   Result: default=${defaultCount} alt=${altCount} inconclusive=${inconclusiveCount} → ${recommendation}`
    );

    allResults.push({
      rule: rule.name,
      kind: rule.kind,
      defaultValue: rule.defaultValue,
      alternativeValue: rule.alternativeValue,
      agents: agentResults,
      defaultCount,
      alternativeCount: altCount,
      inconclusiveCount,
      recommendation,
    });
  }

  // ── Write JSON results ──────────────────────────────────────────────────

  writeFileSync(
    join(ROOT, "experiment-results.json"),
    JSON.stringify(allResults, null, 2)
  );
  console.log(`\nWrote experiment-results.json`);

  // ── Generate report ─────────────────────────────────────────────────────

  generateReport(allResults);
}

// ─── Report Generation ───────────────────────────────────────────────────────

function generateReport(results: RuleResult[]): void {
  const lines: string[] = [];

  lines.push("# Claude's Natural TypeScript Style Preferences");
  lines.push("");
  lines.push(
    "An experiment to discover what TypeScript style choices Claude makes naturally,"
  );
  lines.push(
    "without any linting guidance. Each rule was tested with 6 agents:"
  );
  lines.push("2x Haiku 4.5, 2x Sonnet 4.6, 2x Opus 4.6.");
  lines.push("");
  lines.push(`**Date:** ${new Date().toISOString().split("T")[0]}`);
  lines.push(`**Rules tested:** ${results.length}`);
  lines.push(
    `**Total agents:** ${results.length * AGENTS.length}`
  );
  lines.push("");

  // Summary table
  lines.push("## Summary");
  lines.push("");
  lines.push(
    "| Rule | Kind | Default | Alternative | Default | Alt | N/A | Recommendation |"
  );
  lines.push(
    "|------|------|---------|-------------|---------|-----|-----|----------------|"
  );

  for (const r of results) {
    const rec =
      r.recommendation === "flip"
        ? "**FLIP**"
        : r.recommendation === "keep-default"
          ? "Keep"
          : "Inconclusive";
    lines.push(
      `| \`${r.rule}\` | ${r.kind} | ${r.defaultValue} | ${r.alternativeValue} | ${r.defaultCount}/6 | ${r.alternativeCount}/6 | ${r.inconclusiveCount}/6 | ${rec} |`
    );
  }

  lines.push("");

  // Flips section
  const flips = results.filter((r) => r.recommendation === "flip");
  if (flips.length > 0) {
    lines.push("## Recommended Config Changes");
    lines.push("");
    lines.push(
      "These rules should be overridden to match Claude's natural preferences:"
    );
    lines.push("");
    lines.push("```javascript");
    lines.push("rules: {");
    for (const f of flips) {
      if (f.kind === "option") {
        lines.push(
          `  "@typescript-eslint/${f.rule}": ["error", "${f.alternativeValue}"],`
        );
      } else if (f.kind === "on-off") {
        lines.push(`  "@typescript-eslint/${f.rule}": "off",`);
      }
    }
    lines.push("}");
    lines.push("```");
    lines.push("");
  }

  // Per-rule details
  lines.push("## Detailed Results");
  lines.push("");

  for (const r of results) {
    lines.push(`### \`${r.rule}\``);
    lines.push("");
    lines.push(`- **Kind:** ${r.kind}`);
    lines.push(`- **Default:** ${r.defaultValue}`);
    lines.push(`- **Alternative:** ${r.alternativeValue}`);
    lines.push(
      `- **Recommendation:** ${r.recommendation === "flip" ? "**FLIP** to " + r.alternativeValue : r.recommendation === "keep-default" ? "Keep " + r.defaultValue : "Inconclusive"}`
    );
    lines.push("");
    lines.push("| Agent | Model | Compiles | Violations | Matches Default |");
    lines.push("|-------|-------|----------|------------|-----------------|");

    for (const a of r.agents) {
      lines.push(
        `| ${a.agent} | ${a.model} | ${a.compiles ? "Yes" : "No"} | ${a.lintViolations} | ${a.matchesDefault} |`
      );
    }

    const sample = r.agents.find((a) => a.compiles);
    if (sample) {
      lines.push("");
      lines.push(
        `<details><summary>Sample code (${sample.agent})</summary>`
      );
      lines.push("");
      lines.push("```typescript");
      lines.push(sample.code);
      lines.push("```");
      lines.push("");
      lines.push("</details>");
    }

    lines.push("");
  }

  // Model agreement section
  lines.push("## Model Agreement Analysis");
  lines.push("");
  lines.push("| Model | Matches Default | Uses Alternative | Inconclusive |");
  lines.push("|-------|----------------|------------------|--------------|");

  for (const modelName of ["haiku", "sonnet", "opus"]) {
    let def = 0;
    let alt = 0;
    let inc = 0;
    for (const r of results) {
      for (const a of r.agents) {
        if (a.model !== modelName) continue;
        if (a.matchesDefault === "yes") def++;
        else if (a.matchesDefault === "no") alt++;
        else inc++;
      }
    }
    const total = def + alt + inc;
    if (total === 0) continue;
    const label =
      modelName === "haiku"
        ? "Haiku 4.5"
        : modelName === "sonnet"
          ? "Sonnet 4.6"
          : "Opus 4.6";
    lines.push(
      `| ${label} | ${def}/${total} (${Math.round((100 * def) / total)}%) | ${alt}/${total} (${Math.round((100 * alt) / total)}%) | ${inc}/${total} |`
    );
  }

  lines.push("");

  writeFileSync(join(ROOT, "experiment-report.md"), lines.join("\n"));
  console.log("Wrote experiment-report.md");
}

// ─── Run ─────────────────────────────────────────────────────────────────────

runAnalysis();
