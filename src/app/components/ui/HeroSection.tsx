import { Button } from "../ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="text-center space-y-6 py-12">
      <h1 className="text-4xl font-bold text-black">POSE-LA</h1>
      <h2 className="text-xl text-gray-700">
        SOYA, the intelligence that understands your emotions
      </h2>

      <div className="max-w-2xl mx-auto">
        <p className="text-black text-lg leading-relaxed">
          You don't have to carry that weight in silence. The unspoken words,
          the emotions that crush you — they all have a place here. Each emotion
          holds a hidden truth. By exploring them, you move toward a clearer
          understanding of yourself.
        </p>
      </div>

      <Button>Begin with SOYA</Button>
    </section>
  );
};
