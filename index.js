 // ███████╗ █████╗ ██╗  ██╗███████╗    ██╗     ██╗███╗   ██╗██╗  ██╗     ██████╗██╗     ██╗   ██╗██████╗ 
  //██╔════╝██╔══██╗██║ ██╔╝██╔════╝    ██║     ██║████╗  ██║██║ ██╔╝    ██╔════╝██║     ██║   ██║██╔══██╗
  //█████╗  ███████║█████╔╝ █████╗      ██║     ██║██╔██╗ ██║█████╔╝     ██║     ██║     ██║   ██║██████╔╝
  //██╔══╝  ██╔══██║██╔═██╗ ██╔══╝      ██║     ██║██║╚██╗██║██╔═██╗     ██║     ██║     ██║   ██║██╔══██╗
  //██║     ██║  ██║██║  ██╗███████╗    ███████╗██║██║ ╚████║██║  ██╗    ╚██████╗███████╗╚██████╔╝██████╔╝
  //╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝     ╚═════╝╚══════╝ ╚═════╝ ╚═════╝ 
                                                      // ลบพ่องตาย นะจ้ะจุบๆ

const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'รูป1',
    'รูป2',
    'รูป3',
    // ใส่เพิ่มได้ถ้าเองต้องการ รูปใหญ่
];

let currentLargeImageIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
    console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
    var startedAt = Date.now();
    console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

    setInterval(() => {
        const currentTime = getCurrentTime();
        const currentDate = getCurrentDate();

        const r = new Discord.RichPresence()
            .setApplicationId('ใส่ ID บอท')
            .setType('STREAMING')
            .setState('เอาเม็ดม่วงฟรีๆ เขามาดิส') // คำที่ขึ้น
            .setName('เม็ดม่วง By FL CLUB') // คำที่ขึ้น
            .setDetails(` 〈⏰${currentTime}〉 «» 〈${client.user.username}〉 `) // เวลาเเละชื่อของความเท่
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`〈${currentDate}〉|〈🛸 ${Math.round(client.ws.ping)} m/s〉`) // status
            .setAssetsLargeImage(largeImages[currentLargeImageIndex]) // รูปใหญ่ไปใส่ข้างบน
            .setAssetsSmallImage('ลิ้งค์รูปเล็ก') // รูปเล็ก
            .setAssetsSmallText('เม็ดม่วง By Fl Club') // ปุ่ม
            .addButton('เข้าดิส', 'https://discord.gg/TuUB3ZMKdw') // ลิ้งค์ปุ่ม

        client.user.setActivity(r);

        // ปรับเปลียนไปรูปต่อไป
        currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
    }, 1000); // ปรับเวลา เปลียนรูปใหญ่
});

function getCurrentDate() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = a.toLocaleDateString("en-US", c);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
    return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
