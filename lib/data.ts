import { Provider, Service, Model, Price, FxRate, Currency, ServiceType, Unit } from '../types';

export const PROVIDERS: Provider[] = [
    { id: 1, name: 'OpenAI' },
    { id: 2, name: 'Google' },
];

export const SERVICES: Service[] = [
    { id: 1, providerId: 1, name: ServiceType.Chat, displayName: 'Chat / Text' },
    { id: 2, providerId: 2, name: ServiceType.Chat, displayName: 'Chat / Text' },
    { id: 3, providerId: 1, name: ServiceType.ImageGeneration, displayName: 'Image Generation' },
    { id: 4, providerId: 1, name: ServiceType.Transcription, displayName: 'Transcription' },
    { id: 5, providerId: 1, name: ServiceType.TTS, displayName: 'Speech Generation (TTS)'},
    { id: 6, providerId: 1, name: ServiceType.Video, displayName: 'Video Generation' },
    { id: 7, providerId: 1, name: ServiceType.Embeddings, displayName: 'Embeddings' },
    { id: 8, providerId: 2, name: ServiceType.ImageGeneration, displayName: 'Image Generation' },
    { id: 9, providerId: 2, name: ServiceType.Transcription, displayName: 'Transcription' },
    { id: 10, providerId: 2, name: ServiceType.TTS, displayName: 'Speech Generation (TTS)' },
    { id: 11, providerId: 2, name: ServiceType.Video, displayName: 'Video Generation' },
];

// Helper to create models, starting ID from 1
let modelIdCounter = 1;
const models: Omit<Model, 'id'>[] = [
    // --- Google ---
    // Chat
    { serviceId: 2, name: 'Gemini 2.5 Pro', group: 'Gemini 2.5', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 2, name: 'Gemini 2.5 Flash', group: 'Gemini 2.5', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 2, name: 'Gemini 1.5 Pro', group: 'Gemini 1.5', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 2, name: 'Gemini 1.5 Flash', group: 'Gemini 1.5', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    // Image Gen
    { serviceId: 8, name: 'gemini-2.5-flash-image', group: 'Gemini Image', inputUnit: Unit.Images, outputUnit: null },
    // Transcription
    { serviceId: 9, name: 'gemini-2.5-flash-native-audio', group: 'Gemini Audio', inputUnit: Unit.Minutes, outputUnit: null },
    // TTS
    { serviceId: 10, name: 'gemini-2.5-flash-preview-tts', group: 'Gemini TTS', inputUnit: Unit.Characters, outputUnit: null },
    // Video
    { serviceId: 11, name: 'veo-3.1-fast-generate-preview', group: 'Veo', inputUnit: Unit.Seconds, outputUnit: null },
    { serviceId: 11, name: 'veo-3.1-generate-preview', group: 'Veo', inputUnit: Unit.Seconds, outputUnit: null },

    // --- OpenAI ---
    // Text
    { serviceId: 1, name: 'gpt-5', group: 'GPT-5 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-5-mini', group: 'GPT-5 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-5-nano', group: 'GPT-5 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-5-pro', group: 'GPT-5 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4.1', group: 'GPT-4.1 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4.1-mini', group: 'GPT-4.1 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4.1-nano', group: 'GPT-4.1 Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o', group: 'GPT-4o Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-2024-05-13', group: 'GPT-4o Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-mini', group: 'GPT-4o Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o1', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o1-pro', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o3-pro', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o3', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o3-deep-research', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o4-mini', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o4-mini-deep-research', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o3-mini', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o1-mini', group: 'O-Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'computer-use-preview', group: 'Other', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-realtime', group: 'Realtime Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-realtime-mini', group: 'Realtime Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-realtime-preview', group: 'Realtime Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-mini-realtime-preview', group: 'Realtime Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-audio', group: 'Audio Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-audio-mini', group: 'Audio Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-audio-preview', group: 'Audio Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-mini-audio-preview', group: 'Audio Series', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    // Fine-Tuned Models (Inference pricing)
    { serviceId: 1, name: 'o4-mini-2025-04-16', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'o4-mini-2025-04-16 with data sharing', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4.1-2025-04-14', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4.1-mini-2025-04-14', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4.1-nano-2025-04-14', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-2024-08-06', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-4o-mini-2024-07-18', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'gpt-3.5-turbo (fine-tuned)', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'davinci-002 (fine-tuned)', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    { serviceId: 1, name: 'babbage-002 (fine-tuned)', group: 'Fine-Tuned', inputUnit: Unit.Tokens, outputUnit: Unit.Tokens },
    // Image Generation
    { serviceId: 3, name: 'gpt-image-1', group: 'GPT Image', inputUnit: Unit.Images, outputUnit: null },
    { serviceId: 3, name: 'gpt-image-1-mini', group: 'GPT Image', inputUnit: Unit.Images, outputUnit: null },
    { serviceId: 3, name: 'DALL-E 3', group: 'DALL-E', inputUnit: Unit.Images, outputUnit: null },
    { serviceId: 3, name: 'DALL-E 2', group: 'DALL-E', inputUnit: Unit.Images, outputUnit: null },
    // Transcription
    { serviceId: 4, name: 'gpt-4o-transcribe', group: 'GPT-4o Transcribe', inputUnit: Unit.Minutes, outputUnit: null },
    { serviceId: 4, name: 'gpt-4o-mini-transcribe', group: 'GPT-4o Transcribe', inputUnit: Unit.Minutes, outputUnit: null },
    { serviceId: 4, name: 'Whisper', group: 'Whisper', inputUnit: Unit.Minutes, outputUnit: null },
    // TTS
    { serviceId: 5, name: 'gpt-4o-mini-tts', group: 'GPT-4o TTS', inputUnit: Unit.Characters, outputUnit: null },
    { serviceId: 5, name: 'TTS', group: 'TTS', inputUnit: Unit.Characters, outputUnit: null },
    { serviceId: 5, name: 'TTS HD', group: 'TTS', inputUnit: Unit.Characters, outputUnit: null },
    // Video
    { serviceId: 6, name: 'sora-2', group: 'Sora', inputUnit: Unit.Seconds, outputUnit: null },
    { serviceId: 6, name: 'sora-2-pro', group: 'Sora', inputUnit: Unit.Seconds, outputUnit: null },
    // Embeddings
    { serviceId: 7, name: 'text-embedding-3-small', group: 'Embeddings', inputUnit: Unit.Tokens, outputUnit: null },
    { serviceId: 7, name: 'text-embedding-3-large', group: 'Embeddings', inputUnit: Unit.Tokens, outputUnit: null },
    { serviceId: 7, name: 'text-embedding-ada-002', group: 'Embeddings', inputUnit: Unit.Tokens, outputUnit: null },
];
export const MODELS: Model[] = models.map(m => ({ ...m, id: modelIdCounter++ }));

// Helper to find model ID by name
const getModelId = (name: string) => {
    const model = MODELS.find(m => m.name === name);
    if (!model) throw new Error(`Model "${name}" not found!`);
    return model.id;
};

// Helper to create prices, starting ID from 1
let priceIdCounter = 1;
const prices: Omit<Price, 'id'>[] = [
    // --- GOOGLE ---
    { modelId: getModelId('Gemini 2.5 Pro'), tier: 'Standard', inputPriceUSD: 7.50, cachedInputPriceUSD: 0, outputPriceUSD: 60.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'google', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('Gemini 2.5 Flash'), tier: 'Standard', inputPriceUSD: 0.625, cachedInputPriceUSD: 0, outputPriceUSD: 5.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'google', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('Gemini 1.5 Pro'), tier: 'Standard', inputPriceUSD: 3.50, cachedInputPriceUSD: 0, outputPriceUSD: 10.50, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'google', effectiveFrom: '2024-05-14', isDemo: false },
    { modelId: getModelId('Gemini 1.5 Flash'), tier: 'Standard', inputPriceUSD: 0.35, cachedInputPriceUSD: 0, outputPriceUSD: 1.05, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'google', effectiveFrom: '2024-05-14', isDemo: false },
    { modelId: getModelId('gemini-2.5-flash-image'), tier: 'Standard', inputPriceUSD: 0.0025, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per image', sourceUrl: 'google', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gemini-2.5-flash-native-audio'), tier: 'Standard', inputPriceUSD: 0.12, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per minute ($0.002/sec)', sourceUrl: 'google', effectiveFrom: '2024-09-01', isDemo: false },
    { modelId: getModelId('gemini-2.5-flash-preview-tts'), tier: 'Standard', inputPriceUSD: 2.00, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M characters', sourceUrl: 'google', effectiveFrom: '2024-09-01', isDemo: false },
    { modelId: getModelId('veo-3.1-fast-generate-preview'), tier: 'Standard', inputPriceUSD: 0.025, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per second', sourceUrl: 'google', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('veo-3.1-generate-preview'), tier: 'Standard', inputPriceUSD: 0.05, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per second', sourceUrl: 'google', effectiveFrom: '2024-08-01', isDemo: false },
    
    // --- OPENAI BATCH TIER ---
    { modelId: getModelId('gpt-5'), tier: 'Batch', inputPriceUSD: 0.625, cachedInputPriceUSD: 0.0625, outputPriceUSD: 5.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-mini'), tier: 'Batch', inputPriceUSD: 0.125, cachedInputPriceUSD: 0.0125, outputPriceUSD: 1.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-nano'), tier: 'Batch', inputPriceUSD: 0.025, cachedInputPriceUSD: 0.0025, outputPriceUSD: 0.20, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4o-mini-2024-07-18'), tier: 'Batch', inputPriceUSD: 0.15, cachedInputPriceUSD: 0.075, outputPriceUSD: 0.60, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2024-07-18', isDemo: false },
    { modelId: getModelId('gpt-3.5-turbo (fine-tuned)'), tier: 'Batch', inputPriceUSD: 1.50, cachedInputPriceUSD: 0, outputPriceUSD: 3.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2023-08-22', isDemo: false },
    { modelId: getModelId('text-embedding-3-small'), tier: 'Batch', inputPriceUSD: 0.01, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-01-25', isDemo: false },
    { modelId: getModelId('text-embedding-3-large'), tier: 'Batch', inputPriceUSD: 0.065, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-01-25', isDemo: false },
    { modelId: getModelId('text-embedding-ada-002'), tier: 'Batch', inputPriceUSD: 0.05, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2022-12-01', isDemo: false },
    
    // --- OPENAI FLEX TIER ---
    { modelId: getModelId('gpt-5'), tier: 'Flex', inputPriceUSD: 0.625, cachedInputPriceUSD: 0.0625, outputPriceUSD: 5.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-mini'), tier: 'Flex', inputPriceUSD: 0.125, cachedInputPriceUSD: 0.0125, outputPriceUSD: 1.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-nano'), tier: 'Flex', inputPriceUSD: 0.025, cachedInputPriceUSD: 0.0025, outputPriceUSD: 0.20, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o3'), tier: 'Flex', inputPriceUSD: 1.00, cachedInputPriceUSD: 0.25, outputPriceUSD: 4.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o4-mini'), tier: 'Flex', inputPriceUSD: 0.55, cachedInputPriceUSD: 0.138, outputPriceUSD: 2.20, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },

    // --- OPENAI STANDARD TIER ---
    { modelId: getModelId('gpt-5'), tier: 'Standard', inputPriceUSD: 1.25, cachedInputPriceUSD: 0.125, outputPriceUSD: 10.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-mini'), tier: 'Standard', inputPriceUSD: 0.25, cachedInputPriceUSD: 0.025, outputPriceUSD: 2.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-nano'), tier: 'Standard', inputPriceUSD: 0.05, cachedInputPriceUSD: 0.005, outputPriceUSD: 0.40, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-pro'), tier: 'Standard', inputPriceUSD: 15.00, cachedInputPriceUSD: 0, outputPriceUSD: 120.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4.1'), tier: 'Standard', inputPriceUSD: 2.00, cachedInputPriceUSD: 0.50, outputPriceUSD: 8.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4.1-mini'), tier: 'Standard', inputPriceUSD: 0.40, cachedInputPriceUSD: 0.10, outputPriceUSD: 1.60, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4.1-nano'), tier: 'Standard', inputPriceUSD: 0.10, cachedInputPriceUSD: 0.025, outputPriceUSD: 0.40, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4o'), tier: 'Standard', inputPriceUSD: 2.50, cachedInputPriceUSD: 1.25, outputPriceUSD: 10.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-05-13', isDemo: false },
    { modelId: getModelId('gpt-4o-2024-05-13'), tier: 'Standard', inputPriceUSD: 5.00, cachedInputPriceUSD: 0, outputPriceUSD: 15.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-05-13', isDemo: false },
    { modelId: getModelId('gpt-4o-mini'), tier: 'Standard', inputPriceUSD: 0.15, cachedInputPriceUSD: 0.075, outputPriceUSD: 0.60, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-05-13', isDemo: false },
    { modelId: getModelId('gpt-realtime'), tier: 'Standard', inputPriceUSD: 4.00, cachedInputPriceUSD: 0.40, outputPriceUSD: 16.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-realtime-mini'), tier: 'Standard', inputPriceUSD: 0.60, cachedInputPriceUSD: 0.06, outputPriceUSD: 2.40, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o1'), tier: 'Standard', inputPriceUSD: 15.00, cachedInputPriceUSD: 7.50, outputPriceUSD: 60.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o1-pro'), tier: 'Standard', inputPriceUSD: 150.00, cachedInputPriceUSD: 0, outputPriceUSD: 600.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o3-pro'), tier: 'Standard', inputPriceUSD: 20.00, cachedInputPriceUSD: 0, outputPriceUSD: 80.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o3'), tier: 'Standard', inputPriceUSD: 2.00, cachedInputPriceUSD: 0.50, outputPriceUSD: 8.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o3-deep-research'), tier: 'Standard', inputPriceUSD: 10.00, cachedInputPriceUSD: 2.50, outputPriceUSD: 40.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o4-mini'), tier: 'Standard', inputPriceUSD: 1.10, cachedInputPriceUSD: 0.275, outputPriceUSD: 4.40, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o4-mini-deep-research'), tier: 'Standard', inputPriceUSD: 2.00, cachedInputPriceUSD: 0.50, outputPriceUSD: 8.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o3-mini'), tier: 'Standard', inputPriceUSD: 1.10, cachedInputPriceUSD: 0.55, outputPriceUSD: 4.40, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o1-mini'), tier: 'Standard', inputPriceUSD: 1.10, cachedInputPriceUSD: 0.55, outputPriceUSD: 4.40, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('computer-use-preview'), tier: 'Standard', inputPriceUSD: 3.00, cachedInputPriceUSD: 0, outputPriceUSD: 12.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-image-1'), tier: 'Standard', inputPriceUSD: 5.00, cachedInputPriceUSD: 1.25, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-image-1-mini'), tier: 'Standard', inputPriceUSD: 2.00, cachedInputPriceUSD: 0.20, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o4-mini-2025-04-16'), tier: 'Standard', inputPriceUSD: 4.00, cachedInputPriceUSD: 1.00, outputPriceUSD: 16.00, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2025-04-16', isDemo: false },
    { modelId: getModelId('o4-mini-2025-04-16 with data sharing'), tier: 'Standard', inputPriceUSD: 2.00, cachedInputPriceUSD: 0.50, outputPriceUSD: 8.00, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2025-04-16', isDemo: false },
    { modelId: getModelId('gpt-4.1-2025-04-14'), tier: 'Standard', inputPriceUSD: 3.00, cachedInputPriceUSD: 0.75, outputPriceUSD: 12.00, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2025-04-14', isDemo: false },
    { modelId: getModelId('gpt-4.1-mini-2025-04-14'), tier: 'Standard', inputPriceUSD: 0.80, cachedInputPriceUSD: 0.20, outputPriceUSD: 3.20, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2025-04-14', isDemo: false },
    { modelId: getModelId('gpt-4.1-nano-2025-04-14'), tier: 'Standard', inputPriceUSD: 0.20, cachedInputPriceUSD: 0.05, outputPriceUSD: 0.80, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2025-04-14', isDemo: false },
    { modelId: getModelId('gpt-4o-2024-08-06'), tier: 'Standard', inputPriceUSD: 3.75, cachedInputPriceUSD: 1.875, outputPriceUSD: 15.00, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2024-08-06', isDemo: false },
    { modelId: getModelId('gpt-4o-mini-2024-07-18'), tier: 'Standard', inputPriceUSD: 0.30, cachedInputPriceUSD: 0.15, outputPriceUSD: 1.20, scale: 1000000, unitNotes: 'per 1M tokens (fine-tuned)', sourceUrl: 'openai', effectiveFrom: '2024-07-18', isDemo: false },
    { modelId: getModelId('gpt-3.5-turbo (fine-tuned)'), tier: 'Standard', inputPriceUSD: 3.00, cachedInputPriceUSD: 0, outputPriceUSD: 6.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2023-08-22', isDemo: false },
    { modelId: getModelId('DALL-E 3'), tier: 'Standard', inputPriceUSD: 0.04, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per image (1024x1024)', sourceUrl: 'openai', effectiveFrom: '2023-11-06', isDemo: false },
    { modelId: getModelId('DALL-E 3'), tier: 'HD', inputPriceUSD: 0.08, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per image (1024x1024)', sourceUrl: 'openai', effectiveFrom: '2023-11-06', isDemo: false },
    { modelId: getModelId('DALL-E 2'), tier: 'Standard', inputPriceUSD: 0.016, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per image (1024x1024)', sourceUrl: 'openai', effectiveFrom: '2022-09-01', isDemo: false },
    { modelId: getModelId('Whisper'), tier: 'Standard', inputPriceUSD: 0.006, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per minute', sourceUrl: 'openai', effectiveFrom: '2023-03-01', isDemo: false },
    { modelId: getModelId('TTS'), tier: 'Standard', inputPriceUSD: 15.00, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M characters', sourceUrl: 'openai', effectiveFrom: '2023-11-06', isDemo: false },
    { modelId: getModelId('TTS HD'), tier: 'Standard', inputPriceUSD: 30.00, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M characters', sourceUrl: 'openai', effectiveFrom: '2023-11-06', isDemo: false },
    { modelId: getModelId('sora-2'), tier: 'Standard', inputPriceUSD: 0.10, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per second (720p)', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('sora-2-pro'), tier: 'Standard', inputPriceUSD: 0.30, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1, unitNotes: 'per second (720p)', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('text-embedding-3-small'), tier: 'Standard', inputPriceUSD: 0.02, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-01-25', isDemo: false },
    { modelId: getModelId('text-embedding-3-large'), tier: 'Standard', inputPriceUSD: 0.13, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-01-25', isDemo: false },
    { modelId: getModelId('text-embedding-ada-002'), tier: 'Standard', inputPriceUSD: 0.10, cachedInputPriceUSD: 0, outputPriceUSD: 0, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2022-12-01', isDemo: false },

    // --- OPENAI PRIORITY TIER ---
    { modelId: getModelId('gpt-5'), tier: 'Priority', inputPriceUSD: 2.50, cachedInputPriceUSD: 0.25, outputPriceUSD: 20.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-5-mini'), tier: 'Priority', inputPriceUSD: 0.45, cachedInputPriceUSD: 0.045, outputPriceUSD: 3.60, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4.1'), tier: 'Priority', inputPriceUSD: 3.50, cachedInputPriceUSD: 0.875, outputPriceUSD: 14.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4.1-mini'), tier: 'Priority', inputPriceUSD: 0.70, cachedInputPriceUSD: 0.175, outputPriceUSD: 2.80, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4.1-nano'), tier: 'Priority', inputPriceUSD: 0.20, cachedInputPriceUSD: 0.05, outputPriceUSD: 0.80, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4o'), tier: 'Priority', inputPriceUSD: 4.25, cachedInputPriceUSD: 2.125, outputPriceUSD: 17.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4o-2024-05-13'), tier: 'Priority', inputPriceUSD: 8.75, cachedInputPriceUSD: 0, outputPriceUSD: 26.25, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('gpt-4o-mini'), tier: 'Priority', inputPriceUSD: 0.25, cachedInputPriceUSD: 0.125, outputPriceUSD: 1.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o3'), tier: 'Priority', inputPriceUSD: 3.50, cachedInputPriceUSD: 0.875, outputPriceUSD: 14.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
    { modelId: getModelId('o4-mini'), tier: 'Priority', inputPriceUSD: 2.00, cachedInputPriceUSD: 0.50, outputPriceUSD: 8.00, scale: 1000000, unitNotes: 'per 1M tokens', sourceUrl: 'openai', effectiveFrom: '2024-08-01', isDemo: false },
];
export const PRICE_CATALOG: Price[] = prices.map(p => ({...p, id: priceIdCounter++}));


export const FX_RATES: FxRate[] = [
    { id: 1, base: Currency.USD, quote: Currency.BRL, rate: 5.30, source: 'seed', asOfDate: new Date().toISOString().split('T')[0], isDemo: true },
];