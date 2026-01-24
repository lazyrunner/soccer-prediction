export type ScoringMethod = {
    points: number;
    description: string;
    displayName: string;
    calculation: (hs: number, as: number, phs: number, pas: number) => boolean;
};

export const SCORING_METHODS: Record<string, ScoringMethod> = {
    exactScoreline: {
        displayName:"Exact Scoreline",
        points: 10,
        description: "The scoreline exactly matches the outcome",
        calculation(hs, as, phs, pas) {
            return hs === phs && as === pas;
        }
    },
    goalDifference: {
        displayName:"Goal Difference",
        points: 6,
        description: "The difference in goal is equal",
        calculation(hs, as, phs, pas) {
            return (hs - as) === (phs - pas);
        }
    },
    outcome: {
        displayName:"Outcome",
        points: 4,
        description: "Correctly predicted match outcome (win/draw/loss)",
        calculation(hs, as, phs, pas) {
            const actualOutcome = Math.sign(hs - as);
            const predictedOutcome = Math.sign(phs - pas);
            return actualOutcome === predictedOutcome;
        }
    },
    singleTeamScore: {
        displayName:"Single Team Score",
        points: 2,
        description: "Correct score for one of the teams",
        calculation(hs, as, phs, pas) {
            return hs === phs || as === pas;
        }
    },
    reverseGoalDiff: {
        displayName:"Reverse Goal Diff",
        points: 1,
        description: "Goal difference is correct but teams are reversed",
        calculation(hs, as, phs, pas) {
            return (hs - as) === (pas - phs);
        }
    }
};