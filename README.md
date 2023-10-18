# UCCS Tennis Site V2

A website for managing multiple World Team Tennis (WTT) tournaments and providing a public view of courts and scores of the currently active tournament

## Database

The website uses a MongoDB document database. Each tournament document uses the following structure:

```javascript
{
	// Tournament Info
	id: tournament_id,
	name: tournament_name,
	active: boolean,

	// Team Organization
	teams: [{ id, name }],
	pools: [{ id, [teams] }],
	brackets: [{ id, [teams] }],

	// Scores
	pool_scores: [
		{ pool_id, team1, team2, team1_score team2_score }
	],
	bracket_scores: [
		{ bracket_id, team1, team2, team1_score, team2_score, stage }
	],

	// Pool play results
	pool_results: [sorted/ranked teams],

	// Court Scheduling
	schedules: [
		{ id, start, end, team1, team2, courts }
	],
	upcoming_matches: [{ team1, team2 }],
	finished_matches: [{ team1, team2 }]
}
```

## Calculations

This website can sort teams into brackets by automating the necessary calculations. The calculations or done by the following steps:

1. Calculate the results for each pool
	- No tie: Number of wins
	- 2 way tie: Higher number of games won
	- 3 or more way tie: Win % (games won / total games)
2. Merge the pools into a master list
	- Add an arbitrary number based on pool result to the team's win percentage
		- 1st place: **`+4`**
		- 2nd place: **`+3`**
		- 3rd place: **`+2`**
		- 4th place: **`+1`**  
	- Once all teams added to master list, sort the master list based on win percentage
