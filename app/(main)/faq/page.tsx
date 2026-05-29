export default function FAQ() {
  const scoringFactors = [
    { factor: "Exact scoreline", points: 10 },
    { factor: "Goal difference", points: 6 },
    { factor: "Outcome (win / draw)", points: 4 },
    { factor: "Goals scored by one team", points: 3 },
    { factor: "Reverse goal difference", points: 1 },
  ];


  return (
    <div className="max-w-3xl mx-auto space-y-10 py-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Everything you need to know about how scoring works in Soccer Prediction.
        </p>
      </div>

      {/* Scoring factors */}
      <section>
        <h2 className="text-xl font-semibold mb-4">How are points calculated?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          After each match the system checks your prediction against the actual result and awards
          points for every factor you got right. Default values are shown below — group admins
          can customize these.
        </p>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Scoring factor</th>
                <th className="text-right px-4 py-3 font-medium">Default points</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {scoringFactors.map(({ factor, points }) => (
                <tr key={factor} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3">{factor}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">{points}p</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          * Admins can set any factor to 0 points, effectively disabling it for their group.
        </p>
      </section>


    </div>
  );
}
