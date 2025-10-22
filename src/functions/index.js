const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Secret token from environment config
const ADMIN_TOKEN = functions.config().admin.token; 

exports.deleteBooking = functions.https.onCall(async (data, context) => {
  const { id, token } = data;

  if (token !== ADMIN_TOKEN) {
    throw new functions.https.HttpsError("permission-denied", "Invalid admin token.");
  }

  if (!id) {
    throw new functions.https.HttpsError("invalid-argument", "Booking ID is required.");
  }

  try {
    await db.collection("bookings").doc(id).delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw new functions.https.HttpsError("internal", "Failed to delete booking.");
  }
});
