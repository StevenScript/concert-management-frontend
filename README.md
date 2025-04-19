## This is the unfinished front end meant to work with:
-https://github.com/StevenScript/concertManagement_Server

## Concert Management Backend

## **Author:** Steven Norris  
## **Date:** April 19, 2025


A React/MUI single​-page application for browsing concerts, artists, venues, and purchasing tickets. It talks to a Spring Boot backend via JWT​-protected REST endpoints.
Due to time constraints, it is unfinished. It needs a lot of QOL, style changes, placeholder replacement.

De to time retraint, I have not deployed to AWS/Docker. 

----


## 🚀 Getting Started

1. **Clone** this repo  
   ```bash
   git clone <your​-repo​-url>
   cd concert-management-frontend
   ```

2. **Install** dependencies  
   ```bash
   npm install
   ```

3. **Configure** your backend URL  
   Create a `.env` in the project root with:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```
   (Defaults to `http://localhost:8080` if not set.)

4. **Run** in development  
   ```bash
   npm start
   ```
   App will open at `http://localhost:3000`.

5. **Run** tests  
   ```bash
   npm test
   ```

---

## 🔑 Authentication

- **Register** → `POST /api/register`  
- **Login**    → `POST /api/login`  
- JWT is stored in `localStorage` and sent automatically on all subsequent requests.

---

## 📖 User Stories & Pages

### Public

1. **Home / Upcoming Events**  
   - **Story:** See a list of upcoming concerts.  
   - **Page:** `Home.jsx`  
   - **API:** `GET /events/upcoming`

2. **Artist Browsing & Details**  
   - **Story:** Browse artists & view details (venues, tickets).  
   - **Pages:**  
     - `ArtistList.jsx` → `GET /artists`  
     - `ArtistDetails.jsx` →
       - `GET /artists/{id}`  
       - `GET /artists/{id}/ticket-count`  
       - `GET /artists/{id}/venues`

3. **Event Exploration & Ticket Purchase**  
   - **Story:** View event info & purchase tickets.  
   - **Pages:**  
     - `EventList.jsx` → `GET /events`  
     - `EventDetails.jsx` →
       - `GET /events/{id}`  
       - `GET /events/{id}/tickets`  
       - `GET /events/{id}/ticket-count`  
     - `TicketPurchase.jsx` → `POST /tickets`

4. **Venue Information**  
   - **Story:** Browse venues & see associated events/artists.  
   - **Pages:**  
     - `VenueList.jsx` → `GET /venues`  
     - `VenueDetails.jsx` →
       - `GET /venues/{id}`  
       - `GET /venues/{id}/artists`  
       - `GET /venues/{id}/upcoming-events`

---

### Admin

> All admin routes are wrapped in `<ProtectedRoute requiredRole="ADMIN">…</ProtectedRoute>`.

1. **Dashboard & Overview**  
   - **Page:** `AdminDashboard.jsx`

2. **Artist Management**  
   - **Story:** Create, update, view artists.  
   - **Page:** `ManageArtists.jsx`  
   - **API:**  
     - `GET /artists`  
     - `POST /artists`  
     - `PUT /artists/{id}`

3. **Event Management**  
   - **Story:** Create/update events & assign artists.  
   - **Page:** `ManageEvents.jsx`  
   - **API:**  
     - `GET /events`  
     - `POST /events`  
     - `PUT /events/{id}`  
     - `POST /events/{eventId}/artists/{artistId}`

4. **Venue Management**  
   - **Story:** Create/update venues.  
   - **Page:** `ManageVenues.jsx`  
   - **API:**  
     - `GET /venues`  
     - `POST /venues`  
     - `PUT /venues/{id}`

5. **Ticket Oversight**  
   - **Story:** View & update tickets.  
   - **Page:** `ManageTickets.jsx`  
   - **API:**  
     - `GET /tickets`  
     - `PUT /tickets/{id}`

---

## 🔗 Full API Reference

> Base URL is `${REACT_APP_API_URL}`

### Authentication
```
POST /api/register
POST /api/login
```

### Public Data
```
GET  /events
GET  /events/upcoming
GET  /events/{id}
GET  /events/{id}/tickets
GET  /events/{id}/ticket-count
GET  /events/artist/{artistId}

GET  /artists
GET  /artists/{id}
GET  /artists/{id}/events
GET  /artists/{id}/ticket-count
GET  /artists/{id}/venues

GET  /venues
GET  /venues/{id}
GET  /venues/{id}/artists
GET  /venues/{id}/upcoming-events

GET  /tickets
GET  /tickets/{id}
POST /tickets
PUT  /tickets/{id}
```

### Admin​-Only (requires `Authorization: Bearer <token>`)
```
POST /artists
PUT  /artists/{id}

POST /events
PUT  /events/{id}
POST /events/{eventId}/artists/{artistId}

POST /venues
PUT  /venues/{id}

PUT  /tickets/{id}
```

---

## 🎨 Styles & Theming

- Components use MUI for layout & theming.  
- Global overrides (colors, spacing) live in `src/utils/StyledComponents.jsx`.  


