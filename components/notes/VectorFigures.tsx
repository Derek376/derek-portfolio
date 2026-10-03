import { animals } from "@/data/vector-lesson";

export function SizeNumberLine() {
  return (
    <figure>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Size number line; scroll horizontally on small screens"
      >
        <svg
          viewBox="0 0 640 150"
          role="img"
          aria-label="Animals positioned on a number line by size. Dog and crocodile are very close together."
          className="min-w-150 w-full"
        >
          <line x1="35" y1="80" x2="605" y2="80" stroke="#a3a3a3" />
          <text x="605" y="25" textAnchor="end" fontSize="12" fill="#525252">
            Size →
          </text>
          {[0, 0.5, 1].map((value) => (
            <g key={value}>
              <line
                x1={40 + value * 560}
                x2={40 + value * 560}
                y1="75"
                y2="85"
                stroke="#a3a3a3"
              />
              <text
                x={40 + value * 560}
                y="108"
                textAnchor="middle"
                fontSize="11"
                fill="#737373"
              >
                {value}
              </text>
            </g>
          ))}
          {animals
            .filter((animal) => animal.name !== "Wolf")
            .map((animal) => (
              <g key={animal.name}>
                <circle
                  cx={40 + animal.size * 560}
                  cy="80"
                  r="5"
                  fill="#262626"
                />
                <text
                  x={40 + animal.size * 560}
                  y={animal.name === "Crocodile" ? 30 : 50}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#262626"
                >
                  {animal.name}
                </text>
                <text
                  x={40 + animal.size * 560}
                  y="135"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#737373"
                >
                  {animal.size.toFixed(2)}
                </text>
              </g>
            ))}
        </svg>
      </div>
      <figcaption>
        Figure 1-1. Each animal becomes a single size score on a number line.
        Notice how close the dog and crocodile are.
      </figcaption>
    </figure>
  );
}

export function AnimalPlane() {
  const dog = animals.find((animal) => animal.name === "Dog")!;
  const crocodile = animals.find((animal) => animal.name === "Crocodile")!;
  return (
    <figure>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Animal coordinates; scroll horizontally on small screens"
      >
        <svg
          viewBox="0 0 640 400"
          role="img"
          aria-label="Animal coordinates on a plane with size and ferocity axes. Dog and crocodile are separated by the ferocity axis."
          className="min-w-150 w-full"
        >
          <line x1="50" y1="330" x2="600" y2="330" stroke="#a3a3a3" />
          <line x1="50" y1="330" x2="50" y2="35" stroke="#a3a3a3" />
          <text x="600" y="365" textAnchor="end" fontSize="12" fill="#525252">
            Size →
          </text>
          <text x="50" y="20" fontSize="12" fill="#525252">
            Ferocity ↑
          </text>
          <line
            x1={50 + dog.size * 530}
            y1={330 - dog.ferocity * 270}
            x2={50 + crocodile.size * 530}
            y2={330 - crocodile.ferocity * 270}
            stroke="#737373"
            strokeDasharray="5 5"
          />
          <text x="335" y="185" fontSize="12" fill="#525252">
            Distance ≈ 0.70
          </text>
          {animals.map((animal) => (
            <g key={animal.name}>
              <circle
                cx={50 + animal.size * 530}
                cy={330 - animal.ferocity * 270}
                r="5"
                fill="#262626"
              />
              <text
                x={50 + animal.size * 530}
                y={
                  330 -
                  animal.ferocity * 270 +
                  (animal.name === "Goldfish" ? -14 : 20)
                }
                textAnchor={animal.name === "Goldfish" ? "start" : "middle"}
                fontSize="12"
                fill="#525252"
              >
                {animal.name} ({animal.size.toFixed(2)},{" "}
                {animal.ferocity.toFixed(2)})
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption>
        Figure 1-2. A second dimension pulls the dog and crocodile apart.
        Wolves, tigers and crocodiles form a group of fierce animals in the
        upper-right region.
      </figcaption>
    </figure>
  );
}
