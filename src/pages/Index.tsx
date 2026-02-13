import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400">
      {/* Top Nav */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400">
        <div className="glass-navbar glass-effect px-3 py-2 rounded-full flex items-center gap-1">
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => scrollToId("work")}
          >
            Work
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => scrollToId("film")}
          >
            Film
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => scrollToId("ai")}
          >
            AI
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => scrollToId("about")}
          >
            About
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      {/* Hero Section */}
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* Video Background */}
  <video
    className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-black/40 to-zinc-900/50"
    src="/videos/hero.mp4"
    autoPlay
    muted
    loop
    playsInline
  />

  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Main Content */}
  <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
    <h1 className="font-bagel text-5xl md:text-7xl text-white text-shadow-strong leading-tight">
      Jingchuan (Carlton) Shi
    </h1>

    <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto">
      Film + AI visual creator. I craft cinematic short films and generative
      visuals with a design-forward, story-first approach.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        className="glass-effect hover:glass-effect gentle-animation px-8 py-3"
        style={{
          background: "var(--accent-blue)",
          borderColor: "rgba(255,255,255,0.3)",
        }}
        onClick={() => scrollToId("work")}
      >
        View Work
      </Button>

      <Button
        variant="outline"
        className="glass-effect hover:glass-effect gentle-animation px-8 py-3 text-white border-white/30"
        onClick={() => scrollToId("about")}
      >
        About Me
      </Button>
    </div>
  </div>

  {/* Optional Floating Elements */}
  <div className="absolute top-20 left-20 w-4 h-4 bg-accent-blue rounded-full float-gentle opacity-60" />
  <div className="absolute top-40 right-32 w-6 h-6 bg-accent-emerald rounded-full drift-left opacity-40" />
  <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-accent-purple rounded-full drift-right opacity-50" />
</section>


      {/* Step 2: Work Entry (Film / AI) */}
      <section id="work" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 font-bagel">
            Selected Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 glass-effect gentle-animation hover:elevated-shadow">
              <h3 className="text-2xl font-semibold mb-3">Film Projects</h3>
              <p className="text-muted-foreground mb-6">
                Narrative shorts, cinematography work, and film marketing pieces.
              </p>
              <Button
                className="glass-effect hover:glass-effect"
                onClick={() => scrollToId("film")}
              >
                View Film
              </Button>
            </Card>

            <Card className="p-8 glass-effect gentle-animation hover:elevated-shadow">
              <h3 className="text-2xl font-semibold mb-3">AI / Generative</h3>
              <p className="text-muted-foreground mb-6">
                Image & video generation workflows, concept frames, and experiments.
              </p>
              <Button
                className="glass-effect hover:glass-effect"
                onClick={() => scrollToId("ai")}
              >
                View AI Work
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Film Section (placeholder) */}
      <section id="film" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 font-bagel">Film</h2>
          <p className="text-center text-muted-foreground">
            Add your film projects here (thumbnails, reels, and case studies).
          </p>
        </div>
      </section>

      {/* AI Section (placeholder) */}
      <section id="ai" className="py-20 px-4 bg-white/20 backdrop-blur-sm scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 font-bagel">
            AI / Generative
          </h2>
          <p className="text-center text-muted-foreground">
            Add your AI image/video work here (prompts, workflows, results).
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold font-bagel">About</h2>

          <div className="space-y-6 text-muted-foreground text-lg">
            <p>
              I create cinematic short films and AI-driven visuals, focusing on
              atmosphere, story tension, and design-forward composition.
            </p>
            <p>
              This site is a living portfolio. Next up: project pages, reels,
              and case studies for film marketing + AI media workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button
              variant="outline"
              className="glass-effect hover:glass-effect gentle-animation px-8 py-3"
              onClick={() => scrollToId("palette")}
            >
              Design System
            </Button>
          </div>
        </div>
      </section>

      {/* Color Palette (kept from your existing page) */}
      <section id="palette" className="py-20 px-4 bg-white/20 backdrop-blur-sm scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-bagel">
            Color Palette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center subtle-shadow gentle-animation hover:elevated-shadow">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{ backgroundColor: "var(--accent-blue)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Accent Blue</h3>
              <p className="text-muted-foreground">#2563eb</p>
            </Card>

            <Card className="p-8 text-center subtle-shadow gentle-animation hover:elevated-shadow">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{ backgroundColor: "var(--accent-emerald)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Accent Emerald</h3>
              <p className="text-muted-foreground">#059669</p>
            </Card>

            <Card className="p-8 text-center subtle-shadow gentle-animation hover:elevated-shadow">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{ backgroundColor: "var(--accent-purple)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Accent Purple</h3>
              <p className="text-muted-foreground">#7c3aed</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
