import { ModelProvider } from '@/libs/agent-runtime';
import { genUserLLMConfig } from '@/utils/genUserLLMConfig';

export const DEFAULT_LLM_CONFIG = genUserLLMConfig({
  groq: {
    enabled: true,
  },
  ollama: {
    enabled: true,
    fetchOnClient: true,
  },
});

export const DEFAULT_MODEL = 'llama-3.2-90b-vision-preview';
export const DEFAULT_EMBEDDING_MODEL = 'text-embedding-3-small';

export const DEFAULT_PROVIDER = ModelProvider.Groq;
