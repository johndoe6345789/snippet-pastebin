# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - button "next" [disabled] [ref=e11]:
            - img "next" [ref=e12]
          - generic [ref=e14]: 1 of 1 error
          - generic [ref=e15]:
            - text: Next.js (15.1.3) is outdated
            - link "(learn more)" [ref=e17] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e18] [cursor=pointer]:
          - img [ref=e20]
      - generic [ref=e23]:
        - heading "Unhandled Runtime Error" [level=1] [ref=e24]
        - generic [ref=e25]:
          - button "Copy error stack" [ref=e26] [cursor=pointer]:
            - img [ref=e27]
          - link "Learn more about enabling Node.js inspector for server code with Chrome DevTools" [ref=e30] [cursor=pointer]:
            - /url: https://nextjs.org/docs/app/building-your-application/configuring/debugging#server-side-code
            - img [ref=e31]
      - paragraph [ref=e34]: "TypeError: Cannot read properties of undefined (reading 'DEV')"
    - generic [ref=e35]:
      - heading "Source" [level=2] [ref=e36]
      - generic [ref=e37]:
        - link "src/components/error/ErrorFallback.tsx (13:7) @ ErrorFallback" [ref=e39] [cursor=pointer]:
          - generic [ref=e40]: src/components/error/ErrorFallback.tsx (13:7) @ ErrorFallback
          - img [ref=e41]
        - generic [ref=e45]: "11 | 12 | export function ErrorFallback({ error }: ErrorFallbackProps) { > 13 | if (import.meta.env.DEV) throw error; | ^ 14 | 15 | const [isStackOpen, setIsStackOpen] = useState(false); 16 | const [copied, setCopied] = useState(false);"
      - button "Show ignored frames" [ref=e46] [cursor=pointer]
```