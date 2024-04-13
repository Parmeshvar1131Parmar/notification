const db = require("../../config/database");

async function getNotifications() {
  try {
    const sql = `
      SELECT n.*, u.username AS related_username, t.content AS tweet_content
      FROM notifications n
      LEFT JOIN users u ON n.related_user_id = u.id
      LEFT JOIN tweets t ON n.tweet_id = t.id
      WHERE n.user_id = 1
      ORDER BY n.created_at DESC
    `;
    const notifications = await db.query(sql);
    console.log("Raw Notifications:", notifications);
    const flattenedNotifications = notifications.flat(); // Flatten nested arrays
    const formattedNotifications = flattenedNotifications.map((row) => ({
      id: row.id,
      type: row.type,
      related_user_id: row.related_user_id,
      related_username: row.related_username,
      tweet_content: row.tweet_content,
      created_at: row.created_at,
    }));
    console.log(formattedNotifications);
    return formattedNotifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

module.exports = {
  getNotifications,
};
