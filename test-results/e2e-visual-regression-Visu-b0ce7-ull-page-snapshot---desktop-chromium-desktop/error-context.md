# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Toggle navigation menu" [ref=e8]:
            - img [ref=e9]
          - img [ref=e12]
          - text: CodeSnippet
        - generic [ref=e15]:
          - img [ref=e16]
          - generic [ref=e18]: Local
    - main [ref=e19]:
      - generic [ref=e21]:
        - alert [ref=e22]:
          - img [ref=e23]
          - heading "Workspace ready" [level=5] [ref=e25]
          - generic [ref=e26]: Running in local-first mode so you can work offline without a backend.
        - alert [ref=e27]:
          - img [ref=e28]
          - heading "Cloud backend unavailable" [level=5] [ref=e30]
          - generic [ref=e31]: No Flask backend detected. Saving and loading will stay on this device until a server URL is configured.
      - generic [ref=e33]:
        - heading "My Snippets" [level=1] [ref=e34]
        - paragraph [ref=e35]: Save, organize, and share your code snippets
    - contentinfo [ref=e36]:
      - generic [ref=e38]:
        - paragraph [ref=e39]: Save, organize, and share your code snippets with beautiful syntax highlighting and live execution
        - paragraph [ref=e40]: Supports React preview and Python execution via Pyodide
  - region "Notifications alt+T"
  - alert [ref=e41]
```