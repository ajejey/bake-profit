---
trigger: always_on
---

# Next.js Application Performance Guidelines

This document outlines key strategies and best practices for building a lightning-fast Next.js 15 application, Please follow them.

## 1. Data Fetching & Server Components

*   **Prioritize Server Components (RSC)**: Whenever possible, fetch data directly on the server using Server Components. This offers several benefits:
    *   Direct access to backend resources (databases, internal APIs).
    *   Enhanced security by preventing sensitive information (API keys, tokens) from being exposed to the client.
    *   Reduced client-server round-trips and main thread work on the client.
    *   Ability to perform multiple data fetches in a single server request, reducing waterfalls.
    *   Data fetching can occur closer to your data source, reducing latency.
*   **Server Actions for Mutations**: Use Server Actions for handling form submissions and data mutations. They provide a secure and efficient way to interact with your backend.
*   **Fetch Data Where Needed**: Don't over-fetch or pass props unnecessarily. If the same data is needed in multiple components in a tree, use `fetch` or `React.cache` directly in the component that needs it. `fetch` requests are automatically memoized.
*   **Avoid Route Handlers from Server Components**: Do not call Route Handlers from Server Components as this introduces an additional server request, creating an unnecessary waterfall. Route Handlers are best used when Client Components need to access backend resources.

## 2. Streaming & Suspense

*   **Progressive Rendering**: Utilize React's `Suspense` and Next.js's Loading UI to progressively render and stream parts of your UI to the client. This allows users to see and interact with parts of the page that don't require data immediately, while data-dependent sections show a loading state. This significantly improves perceived performance.

## 3. Data Fetching Patterns

*   **Parallel Data Fetching**: Whenever possible, initiate data requests in parallel. This reduces client-server waterfalls and the total time required to load data. Use `Promise.all` or similar patterns to fetch independent data concurrently.
*   **Preloading Data**: Implement the "preload pattern" to eagerly fetch data and prevent waterfalls. This involves creating a `preload` function that initiates data fetching without waiting for the component to render.
*   **`React.cache`**: Use `React.cache` to memoize data fetching functions. This ensures that the same data request is not re-executed if it's called multiple times within the same request lifecycle.
*   **`server-only` Package**: Use the `server-only` package to explicitly mark data fetching functions that should *only* run on the server. This provides a compile-time check to prevent accidental client-side usage of server-only code.

## 4. Caching

*   **Data Caching**: Understand and verify how your data requests are being cached. Leverage Next.js's caching mechanisms (e.g., `fetch` caching, `unstable_cache`) and explicitly opt into caching where appropriate. Ensure that requests not using `fetch` are also cached effectively.
*   **Static Assets**: Use the `public` directory for static assets like images. Next.js automatically caches these assets.

## 5. UI & Asset Optimization

*   **Next.js Image Component**: Always use the `<Image>` component for images. It automatically optimizes images (resizing, lazy loading, modern formats like WebP), prevents layout shift (CLS), and improves loading performance.
*   **Next.js Font Module**: Optimize fonts using the Font Module. It self-hosts font files, reduces external network requests, and prevents layout shift.
*   **Next.js Script Component**: Use the `<Script>` component for third-party scripts. It allows for deferring scripts and preventing them from blocking the main thread, improving initial page load.
*   **Forms and Validation**: Leverage Server Actions for form submissions, server-side validation, and error handling. This keeps validation logic on the server and reduces client-side JavaScript.
*   **ESLint**: Utilize ESLint with `eslint-plugin-jsx-a11y` to catch accessibility issues early in development, which contributes to a better user experience.

## 6. General Best Practices

*   **Core Web Vitals**: Regularly monitor and optimize for Core Web Vitals (LCP, FID, CLS) to ensure a good user experience.
*   **Bundle Analysis**: Analyze your production bundles to identify and eliminate unnecessary code or large dependencies.
*   **Minimize Client Components**: Move interactive elements (state, event handlers) into their own Client Components, keeping parent layouts and page structures as Server Components to minimize client-side JavaScript.
*   **Database Query Optimization**: Optimize all database queries to be as efficient as possible. Avoid sequential database calls by executing them in parallel or optimizing queries.
*   **User Understandable Error Messages**: Provide clear and user-friendly error messages.
*   **Loading States**: Implement loading states for all asynchronous operations to provide visual feedback to the user.

By adhering to these guidelines, we can build a highly performant and responsive Next.js application that provides an excellent user experience.