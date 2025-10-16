// FIX: Removed a self-referential import which was causing declaration conflicts for the enums below.

export enum Currency {
    USD = 'USD',
    BRL = 'BRL'
}

export enum ServiceType {
    Transcription = 'transcription',
    Chat = 'chat-completions',
    ImageGeneration = 'image-generation',
    TTS = 'tts',
    Video = 'video',
    Embeddings = 'embeddings',
    FineTuning = 'fine-tuning'
}

export enum Unit {
    Tokens = 'tokens',
    Minutes = 'minutes',
    Characters = 'characters',
    Images = 'images',
    Seconds = 'seconds'
}

export enum EstimationMode {
    Exact = 'exact',
    Estimate = 'estimate'
}

export enum BillingCycle {
    Monthly = 'monthly',
    Yearly = 'yearly',
    PerUse = 'per_use'
}

export interface Provider {
    id: number;
    name: string;
}

export interface Service {
    id: number;
    providerId: number;
    name: ServiceType;
    displayName: string;
}

export interface Model {
    id: number;
    serviceId: number;
    name: string;
    group?: string;
    inputUnit: Unit;
    outputUnit: Unit | null;
}

export interface Price {
    id: number;
    modelId: number;
    tier: string;
    inputPriceUSD: number;
    cachedInputPriceUSD: number;
    outputPriceUSD: number;
    scale: number; // e.g., 1_000_000 for per million tokens
    unitNotes: string;
    sourceUrl: string;
    effectiveFrom: string;
    isDemo: boolean;
}

export interface FxRate {
    id: number;
    base: Currency;
    quote: Currency;
    rate: number;
    source: string;
    asOfDate: string;
    isDemo: boolean;
}

export interface ScenarioStep {
    id: string;
    providerId: number;
    serviceId: number;
    modelId: number;
    tier: string;
    estimationMode: EstimationMode;
    chainInput?: boolean;
    // Volume
    audioMinutes?: number;
    inputWords?: number;
    outputWords?: number;
    inputTokens?: number;
    cachedInputTokens?: number;
    outputTokens?: number;
    imageCount?: number;
    characterCount?: number;
    videoSeconds?: number;
    // Calculated
    estimatedWords?: number;
    estimatedInputTokens: number;
    estimatedOutputTokens: number;
    cost: number;
}

export interface FixedCost {
    id: string;
    name: string;
    cycle: BillingCycle;
    amount: number;
    currency: Currency;
}

export interface Assumptions {
    wpm: number;
    languageFactor: number;
    runsPerMonth: number;
}
