import type { RepoSummary } from "../types";
import type { Config } from "../utils/config";

export function buildCategoryPlannerPrompt(
  repos: RepoSummary[],
  config: Config,
): string {
  const repoList = repos
    .map(
      (r) =>
        `- ${r.owner}/${r.name}: ${r.description || "No description"} [${r.language || "Unknown"}] (${r.stars} stars)`,
    )
    .join("\n");

  return `You are an expert at organizing GitHub Stars.
Below is a list of ${repos.length} starred repositories.

## Repository List:
${repoList}

## Requirements:
Plan **no more than ${config.maxCategories}** categories to effectively classify these repositories. 

## Category Naming Rules (Important!):
- Format: "Topic: Subtopic" (e.g., "Web: Frontend", "AI: Coding Assistant")
- **DO NOT create categories for programming languages** (e.g., avoid "Lang: Python", "Lang: Rust"). Group by the *purpose* or *function* of the tool instead.
- **Minimum 4-5 repositories per category**; if a group is too small, merge it into a broader category.
- **Maximum ${config.listNameMaxLength} characters** (including spaces and colon)

## Major Category Examples (Functional, not Language-based):
- **OS**: Linux, MacOS, Windows, Mobile (Group all OS-specific tools here)
- **Web**: Frontend, Backend, UI Components, DevTools
- **AI**: LLMs, Agents, RAG, Image Generation
- **System**: Utilities, Window Managers, Kernel
- **MC**: Server Cores, Client Mods, Plugin APIs
- **Infra**: Docker, Database, Security, Networking
- **Tools**: CLI Apps, Productivity, Gaming

## Category Planning Principles:
1. **OS Specificity**: Always create specific categories like "OS: Linux" or "OS: MacOS" if you see multiple repositories belonging to those operating systems.
2. **Focus on usage**: What does the tool *do*? (e.g., "Networking: Proxy" is better than "Lang: Go")
3. **Broad grouping**: If you see many single-repo languages, group them under "Dev Tools: Miscellaneous" instead of individual language lists.
4. **Distribution**: Aim for 5-10 broad, functional categories that cover the majority of the stars.

Identify the most important categories for these repositories (max ${config.maxCategories}). Each category name must be within ${config.listNameMaxLength} characters!`;
}
