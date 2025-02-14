export function LiveStandings() {
    return (
        <div>
            Rules to score

The system awards points to group members according to the set rules to score. The system considers the following factors to calculate the users’ score:

    Exact scoreline (10p*)
    Goal difference (6p*)
    Outcome - winning team / draw - győztes/döntetlen (4p*)
    Number of goals scored by one of the teams (3p*)
    Total number of goals scored by the teams combined (2p*)
    Reverse goal difference - does not count in case of a draw  (1p*)

* These are the scoring rules set by default. The administrators of each group have the permission to modify the rules to score. 

The set rules to score determine the amount of points each member receive after each match. In each group, the administrator has the permission to customize the rules to score. To check the scoring rules for your group see the Description menu in the group. Depending on the set rules to score, it is possible that you receive 0 points for certain factors mentioned above (for example the given groups rules to score could award 0 points for Reverse scoreline or you could set the group’s scoring rules in a way that only Outcome scores points, etc.). 

The group administrators can also set, whether the points scored after a given match should be accumulated or not:

    According to the default rules to score (Accumulate scoring factors: Yes), the subscores for all correctly pitched scoring factors will be added up. For example, in case of predicting the exact scoreline correctly, the system adds up all the subscores of the above mentioned scoring factors except the Reverse scoreline points (see detailed explanation below).
    In the case of opposite setting (Accumulate scoring factors: No) the members of the group - according to the set rules to score - will be awarded with the score of the single highest correctly predicted scoring factor. For example, in the case of predicting the exact scoreline correctly, the points received will be equal with the points set in the scoring rules for Exact scoreline (if Exact scoreline is set to be the highest scoring factor).

Also, the rules to score can be set to award double points for matches in the play-off rounds (following the group stage). 
How do you gain points? (In case of scoring factor accumulation)

Below you can find examples on how the points are awarded when the default set rules to score are in effect. After the final whistle of each match, the predictions pitched are displayed in the upper row, and the actual result of the match should be highlighted below. 

You predicted the exact scoreline correctly:
Exact scoreline (10p) + Goal difference (6p) + Outcome (4p) + Goals scored by one of the teams (3p) + Total goals scored (2p) = 25p

The pitched prediction matched none of the scoring factors = 0p

Outcome = 4p:
You predicted the winner of the match, but guessed incorrect the Goal difference, the Goals scored by one of the teams and the Total goals scored 

Reverse goal difference = 1p:
You predicted the exact scoreline to be 3-4, meaning a -1 goal difference from Belgiums point of view. The result of the match was 2-1, which is a +1 goal difference from Belgiums point of view, so you are awarded 1 point for Reverse goal difference (you did not predict right the number of goals scored by either team nor the goals total). 

Correctly predicted draw (but the exact scoreline is incorrect):
In this case the ‘Reverse goal difference does not count.  Goal difference (6p) + Outcome (4p) = 10p

You predicted the outcome and one teams goals correctly:
You correctly predicted Albania to win the match and also, that Switzerland will score 0 goals. Outcome (4p) + Goals scored by one of the teams (3p) = 7p

Goal difference:
You predicted the exact scoreline to be 5-4, the match ended 2-1. You correctly predicted France to win and you also got the goal difference right. Goal difference (6p) + ‘Outcome’ (4p) = 10p
        </div>
    )
}