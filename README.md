# 📦 Parcel Sorting System

Automated parcel sorting system for internal handling at a parcel distribution center.

## ✨ Features

- ✅ **XML File Upload & Parsing**  
  Upload an XML file with parcel data and process it instantly in the app.

- ✅ **Department Chain Handling**  
  Business logic based on parcel weight and value.  
  The system uses the **Chain of Responsibility pattern** - adding or removing departments requires only changing the chain in `ParcelHandler.ts`.

- ✅ **Search & Filter**  
  - Global search by recipient name or city  
  - Filter parcels by department using dropdown  

- ✅ **Dark Mode Toggle**  
  Toggle between light and dark themes easily.

- ✅ **State Management with Pinia**  
  The parcel data and logs are managed centrally with **Pinia**.

- ✅ **Delete & Reset Functions**  
  - Delete individual parcels  
  - Reset all data (parcels and logs)  

- ✅ **Re-Process with Last Uploaded File**  
  Re-processes parcels using the originally uploaded file without needing to upload again.

- ✅ **Unit Tests with Vitest**  
  Unit tests cover department logic and Vue components.

---

## Performance Considerations:

- Chain of Responsibility pattern avoids deep nesting or redundant checks.

- XML parsing runs only once on upload or reprocess.

- Pinia state management ensures reactive updates without prop drilling.

- Filters and searches are computed properties (efficient, cached by Vue reactivity).

- Dark mode toggle is simple class change (no re-rendering).

- Paginator limits DOM rendering of rows.

---

## Test Coverage Summary:

### Unit tests for:

- Parcel processing logic (chain of departments)

- XML parsing

- UI interactions (button clicks, event emissions)

- Reset, Reprocess, Delete actions

- DataTable filtering & loading states


## 🛠️ Tech Stack

- Vue 3
- Pinia (State Management)
- PrimeVue (UI Framework)
- Vitest (Unit Testing)

---

## 🚀 Setup & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

```

---

## 🚀 Tests

```bash
npx vitest run
```
