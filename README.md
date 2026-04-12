# VenueFlow

## Overview & Chosen Vertical
**Vertical:** Live Event & Physical Venue Experience

VenueFlow is a smart, real-time crowd management assistant engineered to optimize the physical event experience at large-scale sporting venues. By providing attendees with a dynamic digital dashboard, VenueFlow aims to eliminate the friction points of attending large events: standing in congested lines, navigating overly packed concourses, and managing unpredictable waiting times.

## Approach and Logic
We approached this problem by treating the physical venue as a dynamic data system. Attendees need instant visibility into the "health" of the stadium.
1. **Real-time Engine**: We built a Node.js + Socket.io backend that continually streams simulated wait times and crowd densities to connected clients.
2. **Contextual Intelligence**: The React frontend visually represents this data across a "Live Crowd Map" and a priority-sorted "Live Wait Times" list.
3. **Event Sync**: When traffic peaks in one sector (such as a food stall runtime queue or a congested gate), the UI dynamically pulses with color-coded alerts (Green/Orange/Red), subconsciously directing the user to make optimal pathing choices. 

## How the Solution Works
1. **Frontend**: The React (Vite) application connects to the backend upon load. It pulls down the static layout (Amenities, Gates, Zones).
2. **Real-Time Data Layer**: A WebSocket connection initializes directly to the server. Real-time changes are pumped to the frontend UI seamlessly.
3. **UI Representation**: `Map.jsx` interprets stadium zones dynamically. `AmenitiesList.jsx` aggregates queue times logically so the user can easily find the quickest bathroom. 
4. **Google Maps Integration**: The system renders a `ParkingMap` using the Google Maps platform to give users visibility into the exterior stadium parameters, solving the "first mile" connection to the physical venue.

## Accessibility & Inclusive Design
VenueFlow is built to be usable by everyone, particularly addressing the chaos of physical venues. We meet accessibility standards through the following implementations:
- **WCAG High-Contrast Toggle**: Users can enable "Accessibility Mode" with a single click, instantly transforming the vibrant UI into an ultra-high contrast, black-on-white schematic.
- **Dynamic Text Scaling**: Activating accessibility mode proportionally increases root `rem` font sizes, allowing visually impaired users to quickly read crowd alerts without squinting.
- **Semantic ARIA Structuring**: `aria-live` and `aria-label` tags are wired into the components to ensure screen readers sequentially announce real-time alerts without blocking normal operation.

## Meaningful Integration of Google Services
We have successfully integrated the **Google Maps Embed API** directly into our React interface. 
- **Purpose:** While our internal Heatmap handles the concourse, the Google Maps integration serves as our **Exterior Transit Tracker**. It allows us to pinpoint the stadium and display routing pathways to the specific external gates that our WebSocket backend identifies as "Low Traffic". 
- **Tech Setup:** It utilizes a secure, keyless iframe Embed API structure natively supported by Google for basic location drops like Stadiums, ensuring the app works perfectly for presentation without needing expensive billing constraints during the hackathon evaluation phase.

## Assumptions Made
- We assume attendees have access to mobile devices connected to the stadium's local high-speed WiFi or 5G coverage, as real-time sync is crucial.
- Managers have IoT sensors capable of capturing the underlying density data that our Express backend simulates.
