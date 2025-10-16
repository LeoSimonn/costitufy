/**
 * Estimates the number of words from audio duration.
 * @param minutes - The duration of the audio in minutes.
 * @param wpm - Words per minute.
 * @param languageFactor - A multiplier for language-specific word density.
 * @returns The estimated number of words.
 */
export function estimateWordsFromAudio(minutes: number, wpm: number, languageFactor: number): number {
    if (minutes < 0 || wpm < 0 || languageFactor < 0) return 0;
    return Math.ceil(minutes * wpm * languageFactor);
}

/**
 * Estimates the number of tokens from a word count.
 * Uses the heuristic that 1 token is approx 0.75 words, so words * 1.33.
 * @param words - The number of words.
 * @returns The estimated number of tokens.
 */
export function estimateTokensFromWords(words: number): number {
    if (words < 0) return 0;
    return Math.ceil(words * (4 / 3)); // 1.333...
}

/**
 * Calculates the cost for an LLM based on input and output tokens.
 * @param inputTokens - Number of input tokens.
 * @param outputTokens - Number of output tokens.
 * @param cachedInputTokens - Number of cached input tokens.
 * @param inputPriceUSD - Price per scale for input.
 * @param outputPriceUSD - Price per scale for output.
 * @param cachedInputPriceUSD - Price per scale for cached input.
 * @param scale - The unit scale (e.g., 1,000,000 for per million tokens).
 * @returns The cost in USD.
 */
export function calculateLlmCost(
    inputTokens: number, 
    outputTokens: number, 
    cachedInputTokens: number,
    inputPriceUSD: number, 
    outputPriceUSD: number,
    cachedInputPriceUSD: number,
    scale: number
): number {
    if (scale === 0) return 0;
    const inputCost = (inputTokens / scale) * inputPriceUSD;
    const cachedInputCost = (cachedInputTokens / scale) * cachedInputPriceUSD;
    const outputCost = (outputTokens / scale) * outputPriceUSD;
    return inputCost + outputCost + cachedInputCost;
}

/**
 * A generic cost calculation function for single-input pricing models.
 * @param count - The number of units (e.g., minutes, images, characters).
 * @param pricePerScale - The price for a given scale of units.
 * @param scale - The unit scale (e.g., 1 for per-unit, 1,000,000 for per-million).
 * @returns The cost in USD.
 */
export function calculateCost(count: number, pricePerScale: number, scale: number): number {
    if (count < 0 || pricePerScale < 0 || scale <= 0) return 0;
    return (count / scale) * pricePerScale;
}

/**
 * Calculates the cost for transcription based on audio duration.
 * @param minutes - The duration of the audio in minutes.
 * @param pricePerMinuteUSD - The price per minute in USD.
 * @returns The cost in USD.
 * @deprecated Use calculateCost instead for consistency.
 */
export function calculateTranscriptionCost(minutes: number, pricePerMinuteUSD: number): number {
    return calculateCost(minutes, pricePerMinuteUSD, 1);
}