import { SCORING_METHODS } from './scoringMethods';

export class UserScoreTracker {
    totalScore: number = 0;
    methodCounts: Record<string, number> = {};
    name: string;

    constructor(name:string) {
        this.name = name;
        for (const method in SCORING_METHODS) {
            this.methodCounts[method] = 0;
        }
    }

    evaluatePrediction(hs: number, as: number, phs: number, pas: number): void {
        const singleGamePoints = UserScoreTracker.evaluateSingleGamePrediction(hs,as,phs,pas);
        this.totalScore+= singleGamePoints.points;
        this.methodCounts[singleGamePoints.methodName]++;
    }

    static evaluateSingleGamePrediction(hs: number, as: number, phs: number, pas: number): {points:number,methodName:string } {
        for (const [methodName, methodData] of Object.entries(SCORING_METHODS)) {
            if (methodData.calculation(hs, as, phs, pas)) {
                return {
                    points:methodData.points,
                    methodName
                }
            }
        }
        return {points:0,methodName:""}
    }

    getTotalScore(): number {
        return this.totalScore;
    }

    getMethodCounts(): Record<string, number> {
        return this.methodCounts;
    }
}