// Reviewed against the user-provided Resume.pdf and delivered portfolio projects (2026-10-24).
// Website and downloadable PDF share this content; new works are labeled as concepts.
export const resume = {
  "name": "Jingchuan (Carlton) Shi",
  "headline": "AI Creative Designer · Generative Media, Web & Email",
  "location": "Syracuse, NY",
  "phone": "315-395-2313",
  "email": "jshi77@syr.edu",
  "linkedIn": "https://www.linkedin.com/in/carltonshi0209",
  "portfolio": "https://carlton0209.github.io/Carlton-Shi-s-Portfolio/",
  "socialLikes": "100K+",
  "summary": "AI creative designer and technical artist delivering image, video, and VFX assets for agency and film marketing teams. Combines generative production with Figma component systems, responsive web layouts, and HTML email design. Builds reusable prompting tools and ComfyUI pipelines adopted in client work.",
  "skills": [
    {
      "label": "Figma & Campaign Design",
      "value": "Auto Layout, components, variants, variables, interactive prototypes, responsive layouts, HTML email, plain-text alternatives"
    },
    {
      "label": "Generative Image & Video",
      "value": "ComfyUI (custom nodes, Triton / SageAttention optimization), custom LoRA training, Flux, SDXL, ControlNet, IPAdapter, Seedance 2.0/2.5, MiniMax H3 (Hailuo), Kling, Runway, Midjourney, Suno"
    },
    {
      "label": "Design, Motion & VFX",
      "value": "Photoshop, After Effects, Premiere Pro, DaVinci Resolve, Nuke, compositing, color grading, Unreal Engine, Blender, Maya, Houdini, XR"
    },
    {
      "label": "Prompting & Agents",
      "value": "Prompt architecture, agent skill design, structured-output schemas, Anthropic / OpenAI / Groq / OpenRouter API integration, fallback routing, multi-model prompt portability"
    },
    {
      "label": "Creative Operations",
      "value": "Airtable asset systems, version control, cross-team workflow design, Google Analytics, KPI analysis, SEO"
    },
    {
      "label": "Engineering",
      "value": "Python, FastAPI, JavaScript, React, Next.js, HTML/CSS, Docker Compose, Git, SQL, PyTorch/CUDA environment tuning"
    }
  ],
  "experiences": [
    {
      "company": "Flynn Agency",
      "location": "Pittsford, NY",
      "role": "AI Technical Artist",
      "dates": "Jun 2026 – Present",
      "bullets": [
        "Built and operated an end-to-end ComfyUI production workflow across 5 live client projects, covering model selection, prompt templating, generation, quality control, and delivery.",
        "Developed an internal agent skill that translates one-line briefs into video-generation prompts with shot-level control over facial expression, dialogue timing, action, and camera motion; adopted as the team's default starting point.",
        "Standardized prompt structures across Seedance and MiniMax H3 to support reuse of creative briefs across models."
      ]
    },
    {
      "company": "Highland Film Group (The Avenue)",
      "location": "Los Angeles, CA",
      "role": "U.S. Domestic Marketing & Distribution",
      "dates": "Jan 2026 – Mar 2026",
      "bullets": [
        "Produced campaign-ready trailers, promos, posters, and theatrical and digital release assets across multiple film titles, translating creative direction into finished deliverables.",
        "Built an LLM-driven social-content agent adopted by the marketing team, increasing content throughput by at least 30%.",
        "Designed an Airtable asset system for 6 film titles, replacing ad hoc handoffs with version tracking and shared status visibility across marketing, sales, and creative."
      ]
    },
    {
      "company": "SXSW",
      "location": "Austin, TX",
      "role": "Invited Advisor",
      "dates": "Sep 2025 – Mar 2026",
      "bullets": [
        "Invited to SXSW as an advisor to discuss generative AI; developed startup eligibility screening tools that increased the number of companies processed by over 80% year over year."
      ]
    },
    {
      "company": "F.O.U.N.D. (part-time)",
      "location": "New York, NY",
      "role": "Web Design Artist",
      "dates": "Sep 2025 – Jun 2026",
      "bullets": [
        "Designed responsive layouts and modular interactive components; implemented JavaScript interactions and dynamic content to maintain visual consistency and shorten iteration cycles."
      ]
    },
    {
      "company": "JOYME",
      "location": "Beijing, China",
      "role": "AI Technical Artist",
      "dates": "Feb 2025 – Jun 2025",
      "bullets": [
        "Designed AI-assisted VFX workflows for facial replacement, character enhancement, and asset reuse, reducing shot turnaround by roughly 20%.",
        "Integrated generative AI outputs into live-action footage using ComfyUI and node-based compositing.",
        "Led research and design teams applying generative AI to previsualization, concept iteration, and look development."
      ]
    },
    {
      "company": "NetEase",
      "location": "Beijing, China",
      "role": "Video Editor",
      "dates": "Feb 2025 – Mar 2025",
      "bullets": [
        "Produced fast-turnaround short-form cinematic content with VFX, motion graphics, and color grading in DaVinci Resolve and After Effects; clips earned over 100K likes across TikTok and WeChat Official Accounts."
      ]
    },
    {
      "company": "Studio KAY",
      "location": "Busan, South Korea",
      "role": "Graphic Artist Intern",
      "dates": "Jun 2023 – Jan 2024",
      "bullets": [
        "Built digital-human assets and VFX elements for XR and immersive-media campaigns; optimized Unreal Engine and Maya render setups to reduce render time by 20%."
      ]
    }
  ],
  "projects": [
    {
      "name": "DAYMARK",
      "label": "Email design · Self-initiated, AI-assisted concept",
      "href": "https://carlton0209.github.io/Carlton-Shi-s-Portfolio/works/daymark-email",
      "bullets": [
        "Created three coordinated lifecycle email concepts—welcome, product spotlight, and preference reset—with desktop/mobile Figma variants, reusable modules, and light/dark color variables.",
        "Delivered responsive HTML and plain-text templates; checked 320, 375, and 640 px browser layouts, dark styling, and images-off states, and published an interactive portfolio case."
      ]
    },
    {
      "name": "OFF HOURS",
      "label": "Campaign & responsive design · Self-initiated concept",
      "href": "https://carlton0209.github.io/Carlton-Shi-s-Portfolio/works/off-hours",
      "bullets": [
        "Developed an AI-assisted outdoor campaign with six product views and square, portrait, and story creative, extending one visual direction across product pages and email layouts.",
        "Built native Figma components, variants, and shared variables; linked desktop/mobile prototypes with gallery switching, scrolling, and CTA navigation, then implemented the portfolio case in React."
      ]
    },
    {
      "name": "RealLife AI",
      "label": "AI photo-enhancement platform",
      "href": "https://reallife-ai-eib5.vercel.app/",
      "bullets": [
        "Built a photo-enhancement platform using a custom two-stage LoRA and ComfyUI pipeline for photorealistic results that preserve subject identity; developed the React / Vite / Tailwind front end on Vercel."
      ]
    },
    {
      "name": "LINEAGE",
      "label": "AI content provenance and compliance platform (MVP)",
      "href": "https://lineage-puce.vercel.app/",
      "bullets": [
        "Shipped a monorepo with a FastAPI ledger, Next.js dashboard, browser extension, six-stage verification pipeline, and Ed25519-signed C2PA-superset manifests; packaged offline deployment with Docker Compose.",
        "Conducted market research and developed five user personas, a brand system, and a 14-slide investor deck."
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
  "training": "Advanced Learning Algorithms, DeepLearning.AI (2025) | Applied ML in Python, Univ. of Michigan (2026) | AIGC, Newhouse (2025)"
} as const
