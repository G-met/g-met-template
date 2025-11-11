import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Pattern {
  code: string;
  description: string;
  model: string;
  serial: string;
  brand: { name: string };
  location: { name: string };
  responsible: { name: string };
  patternType: { name: string };
}

interface PatternDetailsProps {
  pattern: Pattern;
}

export function PatternDetails({ pattern }: PatternDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pattern.code}</CardTitle>
        <CardDescription>{pattern.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Modelo:</h3>
            <p>{pattern.model}</p>
          </div>
          <div>
            <h3 className="font-semibold">Serie:</h3>
            <p>{pattern.serial}</p>
          </div>
          <div>
            <h3 className="font-semibold">Marca:</h3>
            <p>{pattern.brand.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Ubicación:</h3>
            <p>{pattern.location.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Responsable:</h3>
            <p>{pattern.responsible.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Tipo de Patrón:</h3>
            <p>{pattern.patternType.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
