// Team data with abbreviations, logo paths, and colors
const teams = {
    "Chennai Super Kings": { abbreviation: "CSK", logo: "logos/csk.png", color: "#F9CD05" },
    "Delhi Capitals": { abbreviation: "DC", logo: "logos/dc.png", color: "#004BA0" },
    "Mumbai Indians": { abbreviation: "MI", logo: "logos/mi.png", color: "#045093" },
    "Kolkata Knight Riders": { abbreviation: "KKR", logo: "logos/kkr.png", color: "#3F1651" },
    "Sunrisers Hyderabad": { abbreviation: "SRH", logo: "logos/srh.png", color: "#F27321" },
    "Rajasthan Royals": { abbreviation: "RR", logo: "logos/rr.png", color: "#EA1A8E" },
    "Royal Challengers Bengaluru": { abbreviation: "RCB", logo: "logos/rcb.png", color: "#DA191A" },
    "Punjab Kings": { abbreviation: "PBKS", logo: "logos/pbks.png", color: "#D71920" },
    "Lucknow Super Giants": { abbreviation: "LSG", logo: "logos/lsg.png", color: "#2EB5E4" },
    "Gujarat Titans": { abbreviation: "GT", logo: "logos/gt.png", color: "#1C7C54" }
};

// Populate dropdowns
function populateTeamDropdowns() {
    const teamDropdowns = document.querySelectorAll("select");
    teamDropdowns.forEach(dropdown => {
        dropdown.innerHTML = ""; // Clear existing options
        Object.keys(teams).forEach(teamName => {
            const option = document.createElement("option");
            option.value = teamName;
            option.textContent = `${teams[teamName].abbreviation} - ${teamName}`;
            dropdown.appendChild(option);
        });
    });
}
populateTeamDropdowns();

// Team Selection Form Submission
document.getElementById("teamSelectionForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const playerName = document.getElementById("playerName").value.trim();
    const rideOrDie = document.getElementById("rideOrDie").value;
    const darkHorse = document.getElementById("darkHorse").value;
    const dislike = document.getElementById("dislike").value;

    if (rideOrDie === darkHorse || rideOrDie === dislike || darkHorse === dislike) {
        alert("Each team must be unique. Please select different teams.");
        return;
    }

    const players = JSON.parse(localStorage.getItem("players")) || [];
    players.push({ player: playerName, teams: { T1: rideOrDie, T2: darkHorse, T3: dislike }, points: { T1: 0, T2: 0, T3: 0 } });
    localStorage.setItem("players", JSON.stringify(players));
    document.getElementById("teamSelectionForm").reset();
    alert(`Teams for ${playerName} submitted successfully!`);
});

// Update Points
document.getElementById("updateForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const homeTeam = document.getElementById("homeTeam").value;
    const awayTeam = document.getElementById("awayTeam").value;
    const result = document.getElementById("result").value;

    const players = JSON.parse(localStorage.getItem("players")) || [];
    players.forEach(player => {
        const { teams, points } = player;
        if (result === "homeWin") {
            if (teams.T1 === homeTeam) points.T1 += 3;
            if (teams.T2 === homeTeam) points.T2 += 2;
            if (teams.T3 === awayTeam) points.T3 += 1;
        } else if (result === "awayWin") {
            if (teams.T1 === awayTeam) points.T1 += 3;
            if (teams.T2 === awayTeam) points.T2 += 2;
            if (teams.T3 === homeTeam) points.T3 += 1;
        } else if (result === "noResult") {
            if (teams.T1 === homeTeam || teams.T1 === awayTeam) points.T1 += 1.5;
            if (teams.T2 === homeTeam || teams.T2 === awayTeam) points.T2 += 1;
            if (teams.T3 === homeTeam || teams.T3 === awayTeam) points.T3 += 0.5;
        }
    });

    localStorage.setItem("players", JSON.stringify(players));
    alert(`Points updated successfully for ${homeTeam} vs ${awayTeam} (${result}).`);
    document.getElementById("updateForm").reset();
});
