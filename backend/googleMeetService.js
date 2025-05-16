const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// googleMeetService.js
async function scheduleGoogleMeet(doctorName, patientEmail, scheduledDateTime) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const start = new Date(scheduledDateTime);
  const end = new Date(start.getTime() + 30 * 60000); // 30 minutes later

  const event = {
    summary: `Appointment with Dr. ${doctorName}`,
    description: `Online appointment via Google Meet with Dr. ${doctorName}`,
    start: { dateTime: start.toISOString(), timeZone: 'Asia/Kolkata' },
    end: { dateTime: end.toISOString(), timeZone: 'Asia/Kolkata' },
    attendees: [{ email: patientEmail }],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    }
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  // Return both the meet link and event ID
  return {
    meetLink: response.data.hangoutLink,
    eventId: response.data.id
  };
}

// Function to delete a Google Calendar event
async function deleteGoogleCalendarEvent(eventId) {
  if (!eventId) {
    console.error('No event ID provided for deletion');
    return false;
  }

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    
    console.log(`Successfully deleted Google Calendar event: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error);
    return false;
  }
}

module.exports = {
  scheduleGoogleMeet,
  deleteGoogleCalendarEvent
};
