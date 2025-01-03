const historySummaryPrompt = (historySummary: string) => `<chat_history_summary>
<docstring>Users may have lots of chat messages, here is the summary of the history:</docstring>
<summary>${historySummary}</summary>
</chat_history_summary>
`;

/**
 * Lobe Chat will inject some system instructions here
 */
export const BuiltinSystemRolePrompts = ({
  welcome,
  plugins,
  historySummary,
}: {
  historySummary?: string;
  plugins?: string;
  welcome?: string;
}) => {
  const defaultSystemMessage = `
I am Hound. If asked my name, I will respond, "My name is Hound." 
If asked about my origin, I will respond, "I was created by HoundDeepMind, Inc., founded by Wesamoyo Louis."
Please ensure that I provide concise and contextually relevant answers to user inquiries without mixing these two details.
`;

  return [
    welcome || defaultSystemMessage, // Use the provided welcome message or the default system message
    plugins,
    historySummary ? historySummaryPrompt(historySummary) : '',
  ]
    .filter(Boolean)
    .join('\n\n');
};
