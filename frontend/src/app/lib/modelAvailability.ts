import { MODELS, type ModelOption } from "../components/assistant/ModelToggle";

export type ModelProvider = "claude" | "gemini" | "openai";

export function getModelProvider(modelId: string): ModelProvider | null {
    const model = MODELS.find((m) => m.id === modelId);
    if (!model) return null;
    if (model.group === "Anthropic") return "claude";
    if (model.group === "Google") return "gemini";
    return "openai";
}

export function isModelAvailable(
    modelId: string,
    apiKeys: { claudeApiKey: string | null; geminiApiKey: string | null; openaiApiKey: string | null },
): boolean {
    const provider = getModelProvider(modelId);
    if (!provider) return false;
    if (provider === "claude") return !!apiKeys.claudeApiKey?.trim();
    if (provider === "openai") return !!apiKeys.openaiApiKey?.trim();
    return !!apiKeys.geminiApiKey?.trim();
}

export function isProviderAvailable(
    provider: ModelProvider,
    apiKeys: { claudeApiKey: string | null; geminiApiKey: string | null; openaiApiKey: string | null },
): boolean {
    if (provider === "claude") return !!apiKeys.claudeApiKey?.trim();
    if (provider === "openai") return !!apiKeys.openaiApiKey?.trim();
    return !!apiKeys.geminiApiKey?.trim();
}

export function providerLabel(provider: ModelProvider): string {
    if (provider === "claude") return "Anthropic (Claude)";
    if (provider === "openai") return "OpenAI";
    return "Google (Gemini)";
}

export function modelGroupToProvider(
    group: ModelOption["group"],
): ModelProvider {
    if (group === "Anthropic") return "claude";
    if (group === "OpenAI") return "openai";
    return "gemini";
}
