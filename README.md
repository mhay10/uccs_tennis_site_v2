# UCCS Tennis Site V2

A website for managing multiple World Team Tennis (WTT) tournaments and providing a public view of courts and scores of the currently active tournament.

## Installation

The website uses a `.env` file to store database credentials and other sensitive information. The `.env` file should be located in the root directory of the project. The following variables are used:


```bash
# MongoDB connection details
DB_URL="<database_url>"
DB_USERNAME="<database_username>"
DB_PASSWORD="<database_password>"

# Credentials to access admin page
ADMIN_USERNAME="<admin_username>"
ADMIN_PASSWORD="<admin_password>"
```

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
	pools: [{ id, [teams], [{ team1, team2, team1_score, team2_score }] }],
	brackets: [{ id, [teams], [{ team1, team2, team1_score, team2_score }] }],

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

There is also another document that stores the current active tournament id. This document uses the following structure:

```json
{
    _id: "ballin",
    active_tournament: "tournament_id"
}
```

The website uses the following collection format:
```yaml
# Database name
tournaments:
    current_active # Stores the current active tournament id
    details # Stores the details of each tournament
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
