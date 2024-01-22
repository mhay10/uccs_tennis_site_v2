# UCCS Tennis Tournament Manager

A tournament manager for tournaments hosted by UCCS Club Tennis. The program consists of two main components: an Excel file and a web server.

## Usage

### Excel File

The Excel file serves are the core hub for managing scores, brackets, and the schedule for the tournament. The tournament organizer can input and update information related to matches and the schedule. The Excel file is equipped with functionality to generate brackets from pool play quickly, allowing teams to continue playing without waiting for calculations to be done by hand.

<u>**Features**</u>

- **Score Management:** Easily record and update match scores for each team
- **Bracket Generation:** Automatically generate tournament brackets based on pool play data.
- **Dynamic Scheduling:** Create and modify the tournament schedule with ease
- **Integration with Web Server:** The Excel file seamlessly integrates with the web server to upload specified tables, ensuring near real-time updates and accessibility for participants and organizers

### Web Server

The web server is responsible for presenting the tournament information in a user-friendly manner. It receives relevant tables from the Excel file and displays them on a web interface accessible to users. The web server consists of two main components aswell: a static frontend and an asset server.

<u>**Features**</u>

- **User-Friendly Display:** Presents pools, brackets, and the schedule in an intuitive and visually appealing manner
- **Near Real-Time Updates:** Frequently syncs with the Excel file to reflect the latest changes in the pool, scores, brackets, and the schedule
- **Accessibility:** Participants and organizers can access information from any device with an internet connection

## Getting Started

Follow these instructions to get the project up and running.

**IMPORTANT:** Do not skip any sections. Each section assumes that the previous sections have been completed.

### Web Server

There are two parts to the web server: the static frontend and the asset server. The static frontend is responsible for displaying the tournament information to users. The asset server is responsible for serving the data uploaded by the Excel file.

#### <u>Asset Server</u>

The asset server is meant to be self-hosted. You will need to have [Docker](https://www.docker.com/) installed on your machine to run the asset server and have an account registered with [Zrok](https://zrok.io).

- Clone the repository to your machine
- Navigate to the `web_server_assets` directory
- Run the following command to build the Docker image:
  - You will need your Zrok token to build the image. You can find it on the [Zrok dashboard](https://api.zrok.io) by selecting your email and then selecting _Enable Your Environment_.
  - Replace `<zrok_token>` with your zrok group token and `<domain_name>` with your desired domain name.
    - The domain must be a unique alphanumeric string. For example, `mydomain` is valid, but `my-domain` is not.

```bash
docker image build -t uccs_tennis_site_v2_assets --build-arg zrok_token=<zrok_token> --build-arg zrok_domain=<domain_name> .
```

Run the following command to start the Docker container:

```bash
docker run -d --rm --name uccs_tennis_site_v2_assets uccs_tennis_site_v2_assets
```

#### <u>Static Frontend</u>

The static frontend is meant to be hosted using [Cloudflare Pages](https://pages.cloudflare.com/). You will need to have a Cloudflare account to host the static frontend.

- Change `urlPrefix` in `web_server/src/lib/index.ts` to your asset server URL.
- Follow the instructions on the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/get-started/guide) to create webpage .
  - Use the following information when prompted:
    - Framework preset: `SvelteKit`
    - Build command: `npm run build`
    - Root directory: `web_server`

### Excel File

The Excel file is used on your local machine. You will need to have Excel installed on your machine to run the Excel file. The excel file is located in the folder `excel_file`. You can open the file by double-clicking on it.

**IMPORTANT:** Be sure to enable macros when opening the Excel file. Macros are required for the Excel file to function properly.

#### <u>Tournament Setup</u>

When setting up the Excel file, you will need to specify the following information in the _TOURNAMENT DETAILS_ sheet:

- Number of teams
- Number of brackets
- Size of each bracket
- Asset server URL

#### <u>Adding & Assigning Teams</u>

To add teams to the tournament, use the _Team List_ sheet. You will need to enter a team name and a team ID for each team. The team ID must be unique and is used to identify teams in the Excel file.

To assign teams to pools, use the _Pools_ sheet. You will need to select teams from the dropdown menu for each pool. If a team has already been assigned to another pool and is selected again, the team will be highlighted in red.

#### <u>Recording Scores & Generating Brackets</u>

To record pool scores use the _USER INTERFACE_ sheet. From the dropdown menu, select the team you want to record a score for. Then, enter the score for the team in the corresponding cells. Press **Save Pool** to save the scores.

To generate brackets, use the _USER INTERFACE_ sheet. Press **Create Brackets** to generate brackets from the pool play data. The brackets will be displayed in the **Gold Bracket**, **Silver Bracket**, **Bronze Bracket**, or **Copper Bracket** sheets.

You can also create brackets without any teams by pressing **Create PreBrackets for Scheduling**. This will create empty brackets with byes for each bracket. You can then create matches for each bracket and assign matches using the _SCHEDULE_ sheet.

#### <u>Creating & Modifying the Schedule</u>

To assign matches courts, use the _SCHEDULE_ sheet to move matches to the desired court. You can also change the time of the match by changing the time in the corresponding cell. The end time of the match will be automatically updated.

To create matches for pool play, click the **Create Pool Matches** button on the _SCHEDULE_ sheet. This will create matches for each pool. The matches will be displayed in the **Pool Matches** sheet.

**IMPORTANT:** You will have to manually create matches for the brackets.

## Contributing

Contributions to the UCCS Tennis Tournament Manager are welcome. If you have ideas for improvement or bug fixes, feel free to submit pull requests.

## Acknowledgments

One of my friends had created a similar Excel file and was looking for a way to show people the scores and schedule more easily. I decided to take up the project and started developing this.
