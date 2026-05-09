I need you to design a Hero section component for an e-commerce homepage that follows a mobile-first, fully responsive approach.

### Requirements:

**Mobile-First Design:**
- Start with mobile (320px - 480px) as the primary design target
- Ensure the component looks and functions perfectly on small screens first
- Prioritize simplicity, vertical layouts, and touch-friendly interfaces (48px+ tap targets)
- Minimize unnecessary elements on mobile

**Responsive Breakpoints:**
- Mobile: 320px - 480px
- Tablet (portrait): 481px - 768px
- Tablet (landscape): 769px - 1024px
- Desktop: 1025px - 1440px
- Large desktop: 1441px+

**Key Principles:**
1. Use fluid typography and spacing (rem/em units, CSS variables)
2. Implement flexible layouts (CSS Grid, Flexbox) that adapt naturally
3. Use CSS media queries for major layout shifts (mobile → tablet → desktop)
4. Ensure touch targets are minimum 44-48px on mobile
5. Optimize images and content for each breakpoint
6. Test horizontal/vertical orientation changes

**Accessibility:**
- WCAG 2.1 AA compliant
- Proper semantic HTML
- Sufficient color contrast (4.5:1 for text)
- Keyboard navigation support
- ARIA labels where needed

**Performance:**
- Lazy load images where applicable
- Minimize CSS/JS for mobile
- Optimize bundle size
- Reduce reflows/repaints

**Styling Approach:**
- Use Tailwind CSS and/or Material UI
- Implement dark mode support if applicable
- Use CSS custom properties for theming

### Component Specifications:
- Component name: Hero section
- Primary use case: [e-commerce homepage]
- Required props/features: [carousel slider for banners , search bar , category filter , promotions banner , CTA button]
- Interactions needed: [carousel slider for banners , search bar , category filter , promotions banner , CTA button]
- Content considerations: [carousel slider for banners , search bar , category filter , promotions banner , CTA button]

### Deliverables:
1. Responsive component code
2. Mobile → desktop layout progression
3. Breakpoint-specific styling explanation
4. Mobile interaction patterns (touch, swipe, etc.)
5. Accessibility checklist

Please provide clean, production-ready code with clear comments explaining responsive behavior at each breakpoint.