# Capstone Experience Report

## 1. What Worked

- **Agentic Workflow:** Using Antigravity with a `.agent` spec allowed for seamless TDD. The AI drafted tests before code, ensuring 100% logic coverage.
- **MCP Integration:** Leveraging the Next.js MCP server provided the IDE with deep context of the App Router, reducing boilerplate errors.

## 2. Challenges & Solutions

- **Multi-Repo Management:** Handling Git submodules was initially a hurdle. I solved this by maintaining a parent 'orchestration' repo for context and a submodule for the implementation.
- **Context Isolation:** Ensuring the AI looked at the `context/` folder before coding required strict instruction in the `.agent/rules.md`.
- **MCP Integration Challenge:** Encountered an issue where the AI Agent preferred its internal knowledge base over the active Next.js MCP server.
- **Solution:** Refined the prompt engineering to explicitly call tool-specific functions and verified server socket connection in the IDE settings to ensure the agent was grounded in the real-time project state.

## 3. Reflection

- **AI Collaboration:** The shift from 'AI as a writer' to 'AI as an agentic partner' (following specs and running tests) significantly increased development speed.
