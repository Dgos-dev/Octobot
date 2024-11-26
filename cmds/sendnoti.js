const axios = require("axios");
const { resolve } = require("path");

module.exports = {
    description: "Sends A Notification to All GC",
    role: "admin",
    cooldown: 15,
    async execute(api, event, args, commands) {
        const threadList = await api.getThreadList(25, null, ["INBOX"]);
        let sentCount = 0;
        const custom = args.join(" ");

        async function sendMessage(thread) {
            try {
                await api.sendMessage(
                    `༒☯𝐀𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐦𝐞𝐧𝐭 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐚𝐝𝐦𝐢𝐧☯༒:\n---------\n${custom}`,
                    thread.threadID
                );
                sentCount++;
            } catch (error) {
                console.error("Error sending a message:", error);
            }
        }

        for (const thread of threadList) {
            if (sentCount >= 20) {
                break;
            }
            if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
                await sendMessage(thread);
            }
        }

        if (sentCount > 0) {
            api.sendMessage(`› ༒☯Master Donrel Your Message has been sent successfully☯༒.`, event.threadID, event.messageID);
        } else {
            api.sendMessage(
                "› No eligible group threads found to send the message to.",
                event.threadID
            );
        }
    }
};
