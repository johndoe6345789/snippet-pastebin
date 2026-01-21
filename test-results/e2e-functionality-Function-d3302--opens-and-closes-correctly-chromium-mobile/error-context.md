# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Toggle navigation menu" [active] [ref=e8]:
            - img [ref=e9]
          - img [ref=e12]
          - text: CodeSnippet
        - generic [ref=e15]:
          - img [ref=e16]
          - text: Local
    - main [ref=e18]:
      - generic [ref=e20]:
        - alert [ref=e21]:
          - img [ref=e22]
          - heading "Workspace ready" [level=5] [ref=e24]
          - generic [ref=e25]: Running in local-first mode so you can work offline without a backend.
        - alert [ref=e26]:
          - img [ref=e27]
          - heading "Cloud backend unavailable" [level=5] [ref=e29]
          - generic [ref=e30]: No Flask backend detected. Saving and loading will stay on this device until a server URL is configured.
      - generic [ref=e32]:
        - heading "My Snippets" [level=1] [ref=e33]
        - paragraph [ref=e34]: Save, organize, and share your code snippets
    - contentinfo [ref=e35]:
      - generic [ref=e37]:
        - paragraph [ref=e38]: Save, organize, and share your code snippets with beautiful syntax highlighting and live execution
        - paragraph [ref=e39]: Supports React preview and Python execution via Pyodide
  - region "Notifications alt+T"
```