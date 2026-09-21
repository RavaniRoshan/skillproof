// Diff processor for SkillProof CLI
import fs from "fs";

export class DiffProcessor {
  static async process(basePath: string, headPath: string): Promise<any> {
    const baseContent = JSON.parse(fs.readFileSync(basePath, "utf-8"));
    const headContent = JSON.parse(fs.readFileSync(headPath, "utf-8"));

    const result = {
      capabilities: {
        added: [] as any[],
        removed: [] as any[],
        unchanged: [] as any[],
      },
      exitCode: 0,
    };

    const baseCaps = baseContent.capabilities || {};
    const headCaps = headContent.capabilities || {};

    const allCapKeys = new Set([
      ...Object.keys(baseCaps),
      ...Object.keys(headCaps),
    ]);

    for (const key of allCapKeys) {
      if (!baseCaps[key] && headCaps[key]) {
        result.capabilities.added.push({
          capability: key,
          value: headCaps[key],
        });
        result.exitCode = 2;
      } else if (baseCaps[key] && !headCaps[key]) {
        result.capabilities.removed.push({
          capability: key,
          value: baseCaps[key],
        });
      } else if (baseCaps[key] && headCaps[key]) {
        const baseValue = JSON.stringify(baseCaps[key]);
        const headValue = JSON.stringify(headCaps[key]);
        if (baseValue !== headValue) {
          result.capabilities.added.push({
            capability: key,
            value: headCaps[key],
          });
        } else {
          result.capabilities.unchanged.push({
            capability: key,
            value: headCaps[key],
          });
        }
      }
    }

    return result;
  }
}

export default DiffProcessor;
