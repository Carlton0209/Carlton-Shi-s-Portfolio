// Mirrors the Creative Technologist resume built on 2026-11-02 (resume-workspace-20261102/work/build_resumes.py).
// Website and downloadable PDF share this content; workflows are independent studies documented on /works/aigc.
export const resume = {
  "name": "Jingchuan (Carlton) Shi",
  "headline": "Creative Technologist · AI Workflows & Generative Production",
  "location": "Syracuse, NY",
  "relocation": "Open to relocation: Los Angeles",
  "phone": "315-395-2313",
  "email": "jshi77@syr.edu",
  "linkedIn": "https://www.linkedin.com/in/carltonshi0209",
  "portfolio": "https://carlton0209.github.io/Carlton-Shi-s-Portfolio/",
  "socialLikes": "100K+",
  "summary": "Creative technologist who builds the AI tooling creative teams use every day. Rebuilds manual, judgment-heavy production processes as repeatable agent workflows with review and QC steps, ships the assets they produce, and trains the teams that run them. Workflow throughput gains up to 30%; social content past 100K likes.",
  "skills": [
    {
      "label": "AI Systems & Agents",
      "value": "Agent skill design, prompt architecture, structured-output schemas, Anthropic / OpenAI / Groq / OpenRouter APIs with fallback routing, multi-model prompt portability, Claude Code"
    },
    {
      "label": "Generative Media",
      "value": "ComfyUI (custom Python nodes), LoRA training, Flux, SDXL, ControlNet, IP-Adapter, Seedance 2.0/2.5, MiniMax H3 (Hailuo), Kling, Runway, Midjourney, Suno"
    },
    {
      "label": "Prototyping & Production",
      "value": "Python, FastAPI, React, Next.js, Docker Compose, Linux GPU servers; After Effects, DaVinci Resolve, Premiere Pro, Nuke, Unreal Engine, Blender, Maya, Houdini"
    },
    {
      "label": "Creative Ops & Governance",
      "value": "Airtable asset systems, version control, C2PA provenance, cross-team workflow design, team training and documentation, KPI analysis"
    }
  ],
  "experiences": [
    {
      "company": "Flynn Agency",
      "location": "Pittsford, NY",
      "role": "AI Technical Artist",
      "dates": "Jun 2026 – Present",
      "bullets": [
        "Built an internal agent skill that turns a one-line creative brief into a production-ready AIGC video prompt with shot-level control over expression, dialogue timing, action and camera motion; now the team's default starting point instead of hand-written prompts.",
        "Standardized prompt structure across Seedance and MiniMax H3 so a brief can be re-run on a newer model without a rewrite, tying output quality to the model rather than the prompt writer.",
        "Designed the creative team's ComfyUI pipeline end to end (model selection, prompt templating, generation, QC, delivery) and ran it on 5 live client projects."
      ]
    },
    {
      "company": "Highland Film Group (The Avenue)",
      "location": "Los Angeles, CA",
      "role": "U.S. Domestic Marketing & Distribution",
      "dates": "Jan 2026 – Mar 2026",
      "bullets": [
        "Built an LLM-driven agent for social content creation, adopted by the marketing team as a standing part of their workflow and raising content throughput by at least 30%.",
        "Designed an Airtable asset system for 6 film titles, replacing ad-hoc file handoffs with versioned tracking and shared status across marketing, sales and creative.",
        "Produced campaign-ready trailers, promos, posters, and theatrical and digital release assets across multiple titles."
      ]
    },
    {
      "company": "SXSW",
      "location": "Austin, TX",
      "role": "Invited Advisor",
      "dates": "Sep 2025 – Mar 2026",
      "bullets": [
        "Built AI tools to screen startup eligibility, raising the number of companies processed by over 80% year over year."
      ]
    },
    {
      "company": "F.O.U.N.D.",
      "location": "New York, NY",
      "role": "Web Design Artist (part-time)",
      "dates": "Sep 2025 – Jun 2026",
      "bullets": [
        "Designed responsive layouts and modular interactive components with JavaScript-driven interactions."
      ]
    },
    {
      "company": "JOYME",
      "location": "Beijing, China",
      "role": "AI Technical Artist",
      "dates": "Feb 2025 – Jun 2025",
      "bullets": [
        "Led research and design teams applying generative AI to previsualization, concept iteration and look development.",
        "Designed AI-assisted VFX pipelines for face replacement, character enhancement and asset reuse, cutting shot turnaround roughly 20%."
      ]
    },
    {
      "company": "NetEase",
      "location": "Beijing, China",
      "role": "Video Editor",
      "dates": "Feb 2025 – Mar 2025",
      "bullets": [
        "Produced fast-turnaround short-form cinematic content with VFX, motion graphics and color grading (DaVinci Resolve, After Effects); clips earned 100K+ likes across TikTok and WeChat Official Accounts."
      ]
    },
    {
      "company": "Studio KAY",
      "location": "Busan, South Korea",
      "role": "Graphic Artist Intern",
      "dates": "Jun 2023 – Jan 2024",
      "bullets": [
        "Built digital-human assets and VFX elements for XR campaigns; optimized Unreal Engine and Maya render setups to cut render time by 20%."
      ]
    }
  ],
  "workflows": [
    {
      "name": "Footwear product fidelity",
      "text": "MiniMax H3 shots from source footage and product photos; malformed side logos removed with reviewed motion tracks and the original artwork composited back in perspective (1080 × 1920, 24 fps)."
    },
    {
      "name": "Identity consistency",
      "text": "face, wardrobe and light held across four camera angles and a garment swap with Qwen Image Edit 2511 and angle, consistency and Lightning LoRAs."
    }
  ],
  "projects": [
    {
      "name": "LINEAGE",
      "label": "AI content provenance and compliance platform (MVP)",
      "href": "https://lineage-puce.vercel.app/",
      "bullets": [
        "Records prompts, tools, source assets, model usage and output hashes so each AI-assisted deliverable ships with a signed C2PA-superset manifest; FastAPI ledger, Next.js dashboard, browser extension, offline Docker Compose deploy.",
        "Owned the non-engineering surface too: market research, five user personas, brand system, 14-slide investor deck."
      ]
    },
    {
      "name": "RealLife AI",
      "label": "AI photo-enhancement platform",
      "href": "https://reallife-ai-eib5.vercel.app/",
      "bullets": [
        "Trained a custom two-stage LoRA and built the ComfyUI pipeline behind a photo-enhancement platform that keeps subject identity; React / Vite / Tailwind front end on Vercel."
      ]
    }
  ],
  "education": [
    {
      "degree": "M.S., Advanced Media Management",
      "school": "Syracuse University, S.I. Newhouse School of Public Communications",
      "dates": "2025 – 2026"
    },
    {
      "degree": "B.A., Film Studies",
      "school": "Zhongnan University of Economics and Law",
      "dates": ""
    },
    {
      "degree": "B.E., Film & VFX",
      "school": "Dongseo University",
      "dates": ""
    }
  ],
  "training": "Advanced Learning Algorithms, DeepLearning.AI (2025) · Applied ML in Python, Univ. of Michigan (2026) · AIGC, Newhouse (2025)"
} as const
