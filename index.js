const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});
const express = require("express");
const app = express();
const port = 8000;
app.get("/", (req, res) => res.send("Succesfully"));
app.listen(port, () =>
  console.log(`Your app is listening at http://localhost:${port}`),
);

const token =
  "NTIyNzM5OTEwMDI1Njc0NzUz.GCP708.MScqMX8tuloIdfDmfC47IPXETEMlJ8OWFauJBw";

const text1 = "I";
const text2 = "LOVE";
const text3 = "U";
const Image =
  "https://cdn.discordapp.com/attachments/1105860649294237846/1159864609197539328/147632.gif?ex=65329318&is=65201e18&hm=8829f4fe076d7fe2a2cac51d69bafb0977157623a9a881ac71a32782217c7633&";
const Thumbnail =
  "https://cdn.discordapp.com/emojis/1159862803327352924.gif?size=96&quality=lossless";

const nameButtonone = "Shall we";
const linkButtonone =
  "https://open.spotify.com/track/42TLIkJ2kFSY0WlCBjqzhB?si=8d7e147239db411f";

const stateTexts = [`﹝ ${text1} ﹞`, `﹝ ${text2} ﹞`, `﹝ ${text3} ﹞`];

app.get("/", (req, res) => {
  res.send("Working!");
});

client.on("ready", async () => {
  console.log(`Login to ${client.user.username} Succesfully`);
  let currentStateIndex = 0;

  const temperature = getTemperature();
  const user = new Discord.RichPresence()
    .setApplicationId("1112701450150232085")
    .setType("STREAMING")
    .setURL("https://www.twitch.tv/flexzy")
    .setName("d1zzyyyy")
    .setStartTimestamp(Date.now())
    .setAssetsLargeText(
      `🌡️・${temperature.toFixed(1)} °C | 💧・${Math.round(
        client.ws.ping,
      )} m/s`,
    )
    .setAssetsLargeImage(Image)
    .setAssetsSmallImage(Thumbnail)
    .addButton(nameButtonone, linkButtonone);

  client.user.setActivity(user);

  setInterval(() => {
    const nextState = stateTexts[currentStateIndex];
    currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
    user.setDetails(`⏰・${getCurrentTime()}・${client.user.username}`);
    user.setState(nextState);
    client.user.setActivity(user);
  }, 5000);
});
function getCurrentTime() {
  const a = new Date(Date());
  const c = {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hour24: false,
  };
  return a.toLocaleTimeString("th-TH", c);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getTemperature() {
  const center = 25;
  const variance = 5;
  const temperature = center + (Math.random() * variance * 2 - variance);
  return temperature;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
shuffleArray(stateTexts);
client.login(token);
