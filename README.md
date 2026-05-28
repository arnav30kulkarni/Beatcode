# About Beatcode: 

BeatCode is a backend REST API that helps competitive programmers log, organize, and systematically review their mistakes across platforms like LeetCode and Codeforces. Instead of re-solving problems blindly, BeatCode builds a structured mistake library tied to concepts — so you know exactly where your weak spots are and when to revisit them.

## Features (Phase 1 — Backend)

- Mistake Tracking — Log mistakes with problem links, concept tags, mistake type, and notes. Add, edit, and delete entries.
- Concept-based Organization — Every mistake belongs to a concept (e.g. Sliding Window, DP, Graphs). Sort and filter your mistakes by concept.
- Concept README — Each concept has a living markdown note that aggregates all your mistakes and insights over time — your own personal knowledge base.
- Revision List — Surfaces concepts you haven't revisited in the longest time, so nothing falls through the cracks.
- Progress Tracking — Mistake distribution per concept and recent activity — know where you're bleeding points.
- Authentication — Secure JWT-based auth with bcrypt password hashing.

## Tech stacks: 

> Backend:

`Language`: `Typescript`

- Framework - Express.js 
- Database - PostgreSQL 
- ORM - Prisma
- Validation - Zod
- Auth - Jwt + Bcrypt 
- API testing - 
---
