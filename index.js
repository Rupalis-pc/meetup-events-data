const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const fs = require("fs");
require("dotenv").config();
const cors = require("cors");

const Event = require("./models/event.model");
const PORT = process.env.PORT;

// const jsonData = fs.readFileSync("event.json", "utf-8"); //read json file
// const allEventsData = JSON.parse(jsonData); //convert in readable format

const app = express();
app.use(express.json());
app.use(cors());

initializeDatabase();

async function seedData() {
  try {
    for (const eventData of allEventsData) {
      const newEvent = await new Event({
        name: eventData.name,
        hostedBy: eventData.hostedBy,
        details: eventData.details,
        dressCode: eventData.dressCode,
        isAgeRestriction: eventData.isAgeRestriction,
        eventTags: eventData.eventTags,
        type: eventData.type,
        startDate: eventData.startDate,
        startTime: eventData.startTime,
        endDate: eventData.endDate,
        endTime: eventData.endTime,
        address: eventData.address,
        price: eventData.price,
        speakers: eventData.speakers,
        imgUrl: eventData.imgUrl,
      });
      newEvent.save();
    }
    console.log("Seeding complete.");
  } catch (error) {
    console.log("Error seeding data to database.", error);
  }
}

// seedData();

app.get("/events", async (req, res) => {
  try {
    const allEvents = await Event.find();
    console.log(allEvents);
    if (allEvents.length > 0) {
      res.json(allEvents);
    } else {
      res.status(404).json({ error: "Data not found." });
    }
  } catch (error) {
    console.log("Failed to fetch events data.");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    console.log(event);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    console.log("Failed to fetch events data.");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    console.log(newEvent);
    if (newEvent) {
      res.status(201).json({ message: "New Event added successfully." });
    } else {
      res.status(404).json({ error: "Data not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to post data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
