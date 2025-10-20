import { HeroSection } from "./components/ui/HeroSection";
import { EmotionalSpace, ComplementaryModule } from "./types";
import { Navbar } from "./components/layout/Navbar";

const emotionalSpaces: EmotionalSpace[] = [
  {
    id: "women-space",
    title: "WOMEN'S SPACE",
    description:
      "Support specifically designed for women, exploring challenges, transitions, and unique strengths of the feminine experience. Find here a space of sisterhood and deep understanding.",
    ctaText: "WEAR →",
  },
  {
    id: "men-space",
    title: "MEN'S SPACE",
    description:
      "A dedicated journey for men to explore their emotional world, relationships, and identity. A safe space to express, understand, and transform the deepest aspects of their being.",
    ctaText: "WEAR →",
  },
  {
    id: "universal-space",
    title: "UNIVERSAL SPACE",
    description:
      "An inclusive space that transcends genders, focused on common human experiences. Explore here the emotions, relationships, and challenges that unite us all in our shared humanity.",
    ctaText: "WEAR →",
  },
];

const complementaryModules: ComplementaryModule[] = [
  {
    id: "rebuilding",
    title: "I'm rebuilding myself",
    description: "Take back control of your story.",
  },
  {
    id: "translation",
    title: "Good reaction",
    description:
      "When she says that, what does he hear? When he says that, what does she hear?",
  },
  {
    id: "scanner",
    title: "Relational scanner",
    description: "Analyze your relationship dynamics.",
  },
  {
    id: "seduction",
    title: "Seductive energy",
    description: "Awaken your authentic charisma.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section - Simplified like the design */}
          <HeroSection />
          <div className="h-px bg-gray-300 my-8"></div>

          {/* Journeys and Main Spaces Section */}
          <section className="space-y-8 mb-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-black">
                JOURNEYS AND MAIN SPACES
              </h2>
              <p className="text-black max-w-3xl mx-auto">
                Each space dedicated to you is an invitation to express your
                emotions, understand what you're going through, and move forward
                at your own pace, with complete kindness.
              </p>
            </div>

            <div className="space-y-8">
              {emotionalSpaces.map((space, index) => (
                <div key={space.id} className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-black">
                      {space.title}
                    </h3>
                    <p className="text-black leading-relaxed">
                      {space.description}
                    </p>
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
                      {space.ctaText}
                    </button>
                  </div>
                  {index < emotionalSpaces.length - 1 && (
                    <div className="h-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-gray-300 my-12"></div>

          {/* Complementary Modules */}
          <section className="space-y-8 mb-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-black">
                COMPLEMENTARY MODULES
              </h2>
              <p className="text-black max-w-3xl mx-auto">
                Tools and resources to enrich your emotional exploration
                journey.
              </p>
            </div>

            <div className="space-y-6">
              {complementaryModules.map((module, index) => (
                <div key={module.id} className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {module.title}
                    </h3>
                    <p className="text-black text-sm">{module.description}</p>
                  </div>
                  {index < complementaryModules.length - 1 && (
                    <div className="h-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-gray-300 my-12"></div>

          {/* Final CTA Section */}
          <section className="text-center space-y-6 py-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-black">
                Ready to begin your inner journey?
              </h3>
              <p className="text-black max-w-2xl mx-auto">
                Every step counts in self-discovery. Let yourself be guided with
                gentleness and kindness.
              </p>
            </div>
            <button className="bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg">
              START WITH SOYA
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
