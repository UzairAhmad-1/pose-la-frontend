import { Card } from "../ui/Card";
import { ComplementaryModule } from "../../types";

interface ComplementaryModulesProps {
  modules: ComplementaryModule[];
}

export const ComplementaryModules: React.FC<ComplementaryModulesProps> = ({
  modules,
}) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-black text-center">
        Complementary Modules
      </h2>
      <p className="text-black text-center">
        Tools and resources to enrich your emotional exploration journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Card key={module.id} className="text-center">
            <h3 className="font-semibold text-black mb-2">{module.title}</h3>
            <p className="text-black text-sm">{module.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
