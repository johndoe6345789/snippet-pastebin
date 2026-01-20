# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - navigation [ref=e8]:
          - button "previous" [disabled] [ref=e9]:
            - img "previous" [ref=e10]
          - button "next" [disabled] [ref=e12]:
            - img "next" [ref=e13]
          - generic [ref=e15]: 1 of 1 error
          - generic [ref=e16]:
            - text: Next.js (15.1.3) is outdated
            - link "(learn more)" [ref=e18] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e19] [cursor=pointer]:
          - img [ref=e21]
      - generic [ref=e24]:
        - heading "Unhandled Runtime Error" [level=1] [ref=e25]
        - generic [ref=e26]:
          - button "Copy error stack" [ref=e27] [cursor=pointer]:
            - img [ref=e28]
          - link "Learn more about enabling Node.js inspector for server code with Chrome DevTools" [ref=e31] [cursor=pointer]:
            - /url: https://nextjs.org/docs/app/building-your-application/configuring/debugging#server-side-code
            - img [ref=e32]
      - paragraph [ref=e35]: "ReferenceError: React is not defined"
    - generic [ref=e36]:
      - heading "Source" [level=2] [ref=e37]
      - generic [ref=e38]:
        - link "src/components/ui/dropdown-menu.tsx (41:18) @ React" [ref=e40] [cursor=pointer]:
          - generic [ref=e41]: src/components/ui/dropdown-menu.tsx (41:18) @ React
          - img [ref=e42]
        - generic [ref=e46]: "39 | } 40 | > 41 | if (asChild && React.isValidElement(children)) { | ^ 42 | return React.cloneElement(children as React.ReactElement, { 43 | onClick: handleClick, 44 | ...props,"
      - button "Show ignored frames" [ref=e47] [cursor=pointer]
```