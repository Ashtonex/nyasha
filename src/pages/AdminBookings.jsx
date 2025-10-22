import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [tokenInput, setTokenInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  const SECRET_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "bookings"));
      let data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by date
      data.sort((a, b) => {
        const aDate = a.date?.toDate ? a.date.toDate() : new Date(a.date);
        const bDate = b.date?.toDate ? b.date.toDate() : new Date(b.date);
        return sortNewestFirst ? bDate - aDate : aDate - bDate;
      });

      console.log("Fetched bookings:", data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      alert("Booking deleted successfully");
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  const handleLogin = () => {
    if (tokenInput.trim() === SECRET_TOKEN) {
      setAuthenticated(true);
      fetchBookings();
    } else {
      alert("Invalid token");
    }
  };

  const toggleSortOrder = () => {
    setSortNewestFirst(!sortNewestFirst);
  };

  if (!authenticated) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "#b35b6b" }}>Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin token"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginRight: 10,
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#b35b6b",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ color: "#b35b6b", textAlign: "center" }}>Bookings Dashboard</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={fetchBookings}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#25b35b",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
        <button
          onClick={toggleSortOrder}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Sort: {sortNewestFirst ? "Newest First" : "Oldest First"}
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading bookings...</p>}

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No bookings found.</p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ background: "#f7f7f7", color: "#b35b6b" }}>
                <th style={{ padding: 10 }}>Name</th>
                <th style={{ padding: 10 }}>Email</th>
                <th style={{ padding: 10 }}>Phone</th>
                <th style={{ padding: 10 }}>Event Type</th>
                <th style={{ padding: 10 }}>Venue</th>
                <th style={{ padding: 10 }}>Guests</th>
                <th style={{ padding: 10 }}>Package</th>
                <th style={{ padding: 10 }}>Budget</th>
                <th style={{ padding: 10 }}>Date</th>
                <th style={{ padding: 10 }}>Message</th>
                <th style={{ padding: 10 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 10 }}>{b.name || "-"}</td>
                  <td style={{ padding: 10 }}>{b.email || "-"}</td>
                  <td style={{ padding: 10 }}>{b.phone || "-"}</td>
                  <td style={{ padding: 10 }}>{b.eventType || "-"}</td>
                  <td style={{ padding: 10 }}>{b.venue || "-"}</td>
                  <td style={{ padding: 10 }}>{b.guests || "-"}</td>
                  <td style={{ padding: 10 }}>{b.package || "-"}</td>
                  <td style={{ padding: 10 }}>{b.budget || "-"}</td>
                  <td style={{ padding: 10 }}>
                    {b.date && b.date.toDate
                      ? b.date.toDate().toLocaleDateString()
                      : b.date
                      ? new Date(b.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td style={{ padding: 10, maxWidth: 200, whiteSpace: "pre-wrap" }}>
                    {b.message || "-"}
                  </td>
                  <td style={{ padding: 10 }}>
                    <button
                      onClick={() => handleDelete(b.id)}
                      style={{
                        background: "#b35b6b",
                        border: "none",
                        color: "#fff",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
