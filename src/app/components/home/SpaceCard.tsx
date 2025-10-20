import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmotionalSpace } from "../../types";

interface SpaceCardProps {
  space: EmotionalSpace;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <Card className="space-y-4">
      <h3 className="text-xl font-semibold text-black">{space.title}</h3>
      <p className="text-black text-sm leading-relaxed">{space.description}</p>
      <Button variant="primary" className="w-full">
        {space.ctaText}
      </Button>
    </Card>
  );
};
