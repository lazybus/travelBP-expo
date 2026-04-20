# travelBP

travelBP is an Expo + React Native travel planning app for the Bruce Peninsula.

The goal is not just to show visitors where to eat, stay, and explore. The app is designed around the realities that actually shape a Bruce Peninsula trip: parking reservations, ferry and boat timing, weather and wind, sparse logistics, seasonal hours, and realistic daily pacing.

This repository currently contains a working frontend prototype for iOS, Android, and web. It uses curated mock data and local device storage to demonstrate the core experience before any backend or CMS integration is added.

## Vision

The Bruce Peninsula is a difficult region to plan casually. A great travel app here needs to do more than list attractions.

travelBP is being built to help users:

- plan a single day trip or a multi-day vacation
- group days into one trip
- browse accommodations, food, activities, groceries, and logistics in one place
- understand reservation and timing constraints before building an itinerary
- filter places by practical criteria like category, town, booking requirements, and party fit
- see places on a map and move directly into itinerary planning
- create an editable day plan that behaves more like a lightweight calendar than a wishlist

The long-term goal is a hybrid content product:

- curated local editorial data for Bruce Peninsula-specific knowledge
- selective API integrations for lodging, weather, and conditions
- strong mobile planning workflows for real travelers on the road

## Current Status

Current state: working frontend prototype

Included today:

- Expo Router app for Android, iOS, and web
- dashboard with Bruce-focused travel messaging and mock conditions
- discover screen with shared filters
- route-based place detail pages
- map screen with a native map on mobile and a web map on desktop
- editable planner with local persistence using AsyncStorage
- mock curated content for accommodations, food, activities, groceries, and logistics
- lightweight itinerary validation for party size, reservation-sensitive stops, and day pacing

Not implemented yet:

- backend API
- CMS or admin panel
- real weather or marine forecast integration
- lodging provider integration
- notifications
- accounts or cloud sync
- live routing and travel-time APIs

## Why This App Exists

Most general-purpose travel apps fail in places like the Bruce Peninsula because they optimize for discovery rather than logistics.

This project treats the following as first-class planning inputs:

- advance parking requirements
- ferry and boat dependencies
- weather-sensitive activities
- groceries and supplies
- gas and EV charging
- public washrooms and practical stops
- seasonal operations
- realistic time allocation between destinations

That Bruce-specific focus is the core product idea.

## Current Feature Walkthrough

### Dashboard

The dashboard frames the app around Bruce Peninsula trip reality rather than generic travel inspiration.

It currently shows:

- mock weather, wind, and water-risk conditions
- trip day and stop counts
- itinerary warnings derived from the active plan
- featured content lanes for permits, logistics, and weather-aware planning

### Discover

The discover surface is the main browse experience for curated places.

Current behavior:

- shared search across place names, summaries, towns, tags, and amenities
- category filtering
- town filtering
- booking-required filtering
- party-fit filtering
- year-round filtering
- direct navigation to place detail pages
- add-to-planner actions from the browse list

### Place Detail

Each place has a dedicated detail route that surfaces planning context, not just marketing copy.

Current fields include:

- subcategory
- address
- summary
- hours
- seasonality
- party size fit
- amenities
- planning notes
- featured editorial note
- add-to-day action

### Map

The map is no longer a placeholder.

Current implementation:

- native uses `react-native-maps`
- web uses `pigeon-maps`
- shared filters are reused from the discover experience
- selecting a marker routes into the same detail page used elsewhere

### Planner

The planner is the strongest interactive part of the current prototype.

Users can currently:

- rename the trip
- change traveler count
- add trip days
- select the active day
- edit day title and date
- add places to the plan
- edit stop times
- adjust stop durations
- edit notes per stop
- reorder stops
- remove stops
- keep all of that data saved locally on device

Validation currently warns about:

- advance parking requirements
- boat or ferry dependent outings
- party size mismatches
- overpacked days

## Tech Stack

### App Framework

- Expo
- React Native
- Expo Router
- TypeScript

### Maps

- `react-native-maps` for native
- `pigeon-maps` for web

### State and Persistence

- React context providers for shared app state
- AsyncStorage for persisted local planner state

### UI and Navigation

- React Navigation via Expo Router
- Expo font loading and splash handling
- custom light/dark palette setup

## Project Structure

```text
app/
  (tabs)/
    index.tsx          # dashboard
    discover.tsx       # list and filter experience
    map.tsx            # web/native map experience
    planner.tsx        # editable itinerary builder
  place/
    [placeId].tsx      # place detail route
  _layout.tsx          # app shell and providers

src/
  features/
    map/
      components/      # platform-specific map components
    places/
      components/      # filters and place UI support
      data/            # curated mock content
      domain/          # place types
      services/        # filtering rules
      state/           # places provider
    planner/
      domain/          # trip/day/stop types
      services/        # itinerary validation
      state/           # planner provider and persistence

constants/
  Colors.ts            # app color system

components/
  ...                  # shared UI helpers from Expo scaffold + app helpers
```

## Data Model Notes

The current prototype uses curated mock content in `src/features/places/data/mock.ts`.

Each place can include:

- category and subcategory
- town and area
- address
- summary and featured note
- hours and seasonality
- booking requirement
- amenities
- planning notes
- party size fit
- coordinates
- default planner duration

This is intentionally shaped to support a future CMS without rethinking the frontend domain model.

## Running the Project

### Prerequisites

- Node.js 20+
- npm
- Expo-compatible Android emulator, physical device, or browser

### Install dependencies

```bash
npm install
```

### Start the Expo dev server

```bash
npm run start
```

From the Expo terminal:

- press `w` for web
- press `a` for Android
- scan the QR code with Expo Go on a physical device

### Run directly on web

```bash
npm run web
```

### Run directly on Android

```bash
npm run android
```

### iOS note

The project includes iOS support through Expo, but local iOS simulator builds require macOS. On Windows, testing iOS typically means using Expo Go on a physical device.

## Validation Commands

Type-check the project:

```bash
npx tsc --noEmit
```

Validate the web bundle:

```bash
npx expo export --platform web
```

## Theme Behavior

The project currently uses system theme behavior on native and a forced light theme on web.

That means:

- desktop/browser currently renders the light palette
- Android and iOS can follow the device theme setting

This is implementation detail, not final product direction.

## What "Backend" Means Right Now

There is no backend service in this repository yet.

Current data sources:

- curated mock place content from local source files
- mock weather and condition values from local source files
- local planner persistence using AsyncStorage

So today this repo is best described as a frontend prototype with local state, not a full-stack app.

## Planned Backend and Content Direction

The expected next-stage architecture is:

- curated content managed through a CMS
- thin server-side adapters for external APIs
- weather and marine-condition integrations
- lodging provider integration for search and outbound booking links
- optional future account sync and collaborative planning

Likely future backend responsibilities:

- CMS content delivery
- image/media hosting
- lodging API proxying
- conditions aggregation
- notification scheduling
- optional saved trips beyond local device storage

## Roadmap

### Near-term

- replace mock content with CMS-backed data
- add richer place media and editorial content
- improve planner validation with better routing assumptions
- add reminders and notification scheduling
- add better mobile UI for day editing and stop management

### Mid-term

- weather and marine forecast integration
- lodging inventory and outbound booking links
- map clustering and richer geospatial interactions
- offline-aware content hydration strategy
- export/share itinerary output

### Long-term

- cloud sync
- collaborative trip planning
- seasonal editorial campaigns
- deeper logistics layers like washrooms, refill stations, ferry coordination, and cell dead zones

## Known Limitations

- data is mocked and limited in scope
- planner validation is intentionally simple
- map behavior has only been validated through build/export and current app flows, not full production hardening
- there is no auth, API, or remote content source
- conditions are illustrative, not live

## Contribution Notes

This project is still early and product direction matters more than polish in every file.

If you extend it, try to preserve these priorities:

- Bruce Peninsula-specific planning value over generic tourism UX
- clean boundaries between curated content, planner state, and external integrations
- local-first behavior where it improves reliability on the road
- pragmatic feature delivery over premature backend complexity

## Repository Summary

travelBP is currently a strong prototype for a Bruce Peninsula trip planner with real browse, map, detail, and editable itinerary flows. The next major leap is moving from local mock content to a real content and integration layer without losing the Bruce-specific planning model that makes the app useful.