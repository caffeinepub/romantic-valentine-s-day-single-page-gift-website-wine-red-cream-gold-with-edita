# Specification

## Summary
**Goal:** Deploy the user’s latest draft to production so the live site reflects the most recent draft edits.

**Planned changes:**
- Trigger a new production deployment from the current/latest draft state.
- Verify the production site reflects the latest draft content after deployment (e.g., via hard refresh/incognito).
- Keep the draft URL accessible for continued editing.

**User-visible outcome:** The production/live site shows the same updated content as the latest draft, while the draft link remains available for further edits.
