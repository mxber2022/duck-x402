import { z } from "zod";

export function createUtilityTools() {
  return [
    {
      name: "add",
      schema: {
        title: "Addition Tool",
        description: "Add two numbers",
        inputSchema: { a: z.number(), b: z.number() }
      },
      handler: async ({ a, b }) => {
        try {
          console.log(`Performing addition: ${a} + ${b}`);
          const result = a + b;
          console.log(`Addition result: ${result}`);
          return {
            content: [{ type: "text", text: String(result) }]
          };
        } catch (error) {
          console.error("Failed to perform addition:", error.message);
          throw new Error(`Failed to perform addition: ${error.message}`);
        }
      }
    }
  ];
}
