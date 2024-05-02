require("dotenv/config");
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// ID to access Champion's League on API
const COMPETITION_ID = 244;

const LIVE_SCORES_URL = `https://livescore-api.com/api-client/scores/live.json?key=${API_KEY}&secret=${API_SECRET}&competition_id=${COMPETITION_ID}`;
const FIXTURES_URL = `https://livescore-api.com/api-client/fixtures/matches.json?key=${API_KEY}&secret=${API_SECRET}&competition_id=${COMPETITION_ID}`;

async function fetchLiveMatches() {
  const url = LIVE_SCORES_URL;
  const response = await fetch(url);
  const data = await response.json();

  if (data && data.data) {
    const liveMatches = data.data.match;

    if (liveMatches && liveMatches.length > 0) {
      let liveMatchesMessage =
        "Here are the live matches for the UEFA Champions League:\n";
      liveMatches.forEach((match) => {
        liveMatchesMessage += `Match: ${match.home_name} vs ${match.away_name}, Status: ${match.status}\n`;
      });
      return liveMatchesMessage;
    } else {
      return "There are no live matches for the UEFA Champions League at the moment.";
    }
  } else {
    return "Could not retrieve live matches data.";
  }
}

async function fetchFixtures() {
  const url = FIXTURES_URL;
  const response = await fetch(url);
  const data = await response.json();

  if (data && data.data) {
    const championsLeagueFixtures = data.data.fixtures;

    if (championsLeagueFixtures) {
      let fixturesMessage =
        "Here are the upcoming fixtures for the UEFA Champions League:\n";
      championsLeagueFixtures.forEach((fixture) => {
        fixturesMessage += `Match: ${fixture.home_name} vs ${fixture.away_name}, Date: ${fixture.date}, Time: ${fixture.time}\n`;
      });
      return fixturesMessage;
    } else {
      return "Could not find the fixtures for the UEFA Champions League.";
    }
  } else {
    return "Could not retrieve fixtures data.";
  }
}

async function fetchMostRecentMatch() {
  let page = 1;
  let lastPageReached = false;
  let mostRecentMatch = null;

  while (!lastPageReached) {
    const historyUrl = `https://livescore-api.com/api-client/scores/history.json?key=${API_KEY}&secret=${API_SECRET}&competition_id=${COMPETITION_ID}&page=${page}`;
    const historyResponse = await fetch(historyUrl);
    const historyData = await historyResponse.json();
    if (
      historyData &&
      historyData.data &&
      historyData.data.match &&
      historyData.data.match.length > 0
    ) {
      const sortedMatches = historyData.data.match.sort(
        (a, b) => new Date(b.added) - new Date(a.added)
      );
      mostRecentMatch = sortedMatches[0];
      if (historyData.data.pages === page) {
        lastPageReached = true;
      } else {
        page++;
      }
    } else {
      lastPageReached = true;
    }
  }
  return mostRecentMatch;
}

async function fetchMatchEvents(matchId) {
  const url = `https://livescore-api.com/api-client/scores/events.json?key=${API_KEY}&secret=${API_SECRET}&id=${matchId}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data && data.data && data.data.event) {
    const matchEvents = data.data.event;
    let matchEventsMessage = "";
    if (matchEvents && matchEvents.length > 0) {
      matchEvents.forEach((event) => {
        matchEventsMessage += `Event: ${event.event}, Player: ${event.player}, Time: ${event.time}\n`;
      });
    } else {
      matchEventsMessage = "No events found for this match.";
    }
    return matchEventsMessage;
  } else {
    return "Could not retrieve match events data.";
  }
}

module.exports = {
  fetchLiveMatches,
  fetchFixtures,
  fetchMostRecentMatch,
  fetchMatchEvents,
};
