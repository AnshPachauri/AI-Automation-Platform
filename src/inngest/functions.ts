import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

// Define the AI clients
const googleAI = createGoogleGenerativeAI();
const openAI = createOpenAI();
const anthropicAI = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text",
        generateText,
        {
        model: googleAI('gemini-2.5-flash'),
        system: 'You are an expert AI assistant that helps users automate tasks.',
        prompt: 'What is 2 + 2',
        experimental_telemetry: {
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true,
        },
    })
    return geminiSteps;
  },
);