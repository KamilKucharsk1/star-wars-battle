# Product Requirements Document

## 1. Cel projektu  
Stworzyć aplikację "Star Wars Battle", która pozwala losować dwie karty (osoby lub statki kosmiczne) i wyłaniać zwycięzcę na podstawie wspólnej cechy (masa vs. liczba członków załogi).


---

## 2. Zakres funkcjonalny

### Frontend  
- **Bitwa niezależna od przeglądania zasobów**: System bitwy działa niezależnie od wyboru kategorii w sekcji "Existing Resources"
- **Losowanie dwóch zasobów tego samego typu**: **people vs people** lub **starships vs starships** (bez opcji mieszanej)
- Wyświetlanie podstawowych atrybutów:  
  - Dla osób w bitwie: `name`, `mass`  
  - Dla statków w bitwie: `name`, `crew`  
  - W sekcji przeglądania zasobów: pełne atrybuty (`height`, `gender`, `manufacturer`, `model` itp.)
- **Porównanie jednolitej cechy**: większa **masa** (people vs people) vs. większa **liczba załogi** (starships vs starships)  
- Deklaracja zwycięzcy na podstawie wyższego atrybutu  
- Przycisk **"Play Again"** powtarzający losowanie  
- **Zrealizowane bonusy:**  
  1. ✅ Licznik zwycięstw („Left wins: X / Right wins: Y")  
  2. ✅ Wybór typu bitwy (toggle people/starships) - niezależny od przeglądania zasobów
  3. ✅ Użycie Material‑UI z komponentem `<Card>` o responsywnych wymiarach
  4. ✅ **Optymalizacje wydajności**: React.useCallback, useMemo, brak niepotrzebnych re-renderów
  5. ✅ **Stabilny layout**: Placeholder dla wyników bitwy zapobiegający "skakaniu" strony
  6. ✅ **Mobile responsiveness**: Pełna responsywność dla urządzeń mobilnych

### Backend  
- Zintegrowane API w ramach aplikacji Next.js (Route Handlers, Server Actions)
- GraphQL API (przez Route Handler w `app/api/graphql`) dla operacji odczytu (Queries)
- Server Actions dla operacji zapisu (Mutations: CRUD dla **people** i **starships**)
- Inspiracja: SWAPI (https://swapi.co/documentation)  
- Implementacja w **Next.js + TypeScript**, z wykorzystaniem `Drizzle ORM` i `SQLite` (dla developmentu)
- **Zrealizowane bonusy:**  
  1. ✅ Baza danych **SQLite** zamiast danych "hardcoded"
  2. ✅ Wykorzystanie lokalnego developmentu z pełnym API

---

## 3. User Stories & Kryteria Akceptacji

1. **Jako** użytkownik  
   **chcę** wylosować dwie karty tego samego typu  
   **aby** zobaczyć, kto wygra battle na podstawie tej samej cechy  
   **AC**: Po kliknięciu `Play Again` wyświetlają się dwie karty tego samego typu z danymi i wynikiem porównania.

2. **Jako** użytkownik  
   **chcę** kliknąć "Play Again"  
   **aby** rozpocząć nową rozgrywkę z wybranymi parametrami  
   **AC**: Po kliknięciu przycisku karty się odświeżają zgodnie z wybranym typem bitwy.

3. **Jako** użytkownik  
   **chcę** widzieć licznik zwycięstw obu stron  
   **aby** wiedzieć, która strona prowadzi  
   **AC**: ✅ Po każdej rozgrywce odpowiednia liczba przy zwycięzcy się zwiększa.

4. **Jako** użytkownik  
   **chcę** wybrać typ bitwy niezależnie od przeglądania zasobów  
   **aby** kontrolować rodzaj rozgrywki bez wpływu na sekcję "Existing Resources"  
   **AC**: ✅ Toggle wyboru typu bitwy działa niezależnie od kategorii w sekcji zasobów.

5. **Jako** użytkownik  
   **chcę** płynnie przełączać między typami bitwy  
   **aby** doświadczenie było responsywne bez migania i skakania  
   **AC**: ✅ Zmiana people ↔ starships jest płynna, bez re-renderowania strony, z zachowanym layoutem.

6. **Jako** użytkownik  
   **chcę** przeglądać istniejące zasoby niezależnie od bitwy  
   **aby** zapoznać się z danymi bez wpływu na rozgrywkę  
   **AC**: ✅ Sekcja "Existing Resources" działa niezależnie od systemu bitwy.

7. **Jako** deweloper  
   **chcę** mieć CRUD w GraphQL i Server Actions
   **aby** zarządzać danymi people/starships przez API  
   **AC**: ✅ Query (GraphQL) i Mutations (Server Actions) działają zgodnie ze specyfikacją.

8. **Jako** użytkownik mobile  
   **chcę** korzystać z aplikacji na telefonie/tablecie  
   **aby** mieć pełną funkcjonalność na wszystkich urządzeniach  
   **AC**: ✅ Aplikacja jest w pełni responsywna z optymalizacjami dla mobile.

---

## 4. Optymalizacje wydajności (zrealizowane)

### Frontend
- ✅ **React Performance**: 
  - `useCallback` dla handlerów eventów
  - `useMemo` dla ciężkich obliczeń
  - Eliminacja niepotrzebnych re-renderów przy zmianie typu bitwy
- ✅ **Layout Stability**: 
  - Responsywne wymiary kart dostosowane do urządzenia
  - Placeholder dla wyników zapobiegający layout shift
  - Płynne przejścia bez migania
- ✅ **Data Fetching**: 
  - TanStack Query z efektywnym cachingiem
  - Równoległe ładowanie danych people i starships
- ✅ **Mobile Optimization**:
  - Responsive breakpoints dla wszystkich komponentów
  - Touch-friendly interface elements
  - Optimized font sizes and spacing for mobile

### UX Improvements
- ✅ **Intuicyjny interfejs**: Brak komunikatów o niekompatybilności
- ✅ **Responsywność**: Natychmiastowa reakcja na zmianę typu bitwy
- ✅ **Stability**: Brak skakania strony przy zmianie zawartości
- ✅ **Mobile UX**: Dotyk-przyjazne elementy, responsywny layout

---

## 5. Mobile Responsiveness & Cross-Device Compatibility

### 📱 **Mobile-First Design**
- **Responsive Grid System**: Material-UI Grid z breakpoints `xs`, `sm`, `md`, `lg`
- **Adaptive Card Sizes**: 
  - Mobile (xs): 280px max width, 180px height, full width
  - Desktop (sm+): 300px width, 200px height, fixed dimensions
- **Touch-Friendly Elements**:
  - Minimum 44px touch target sizes
  - Increased padding and spacing on mobile
  - Optimized button sizes for finger interaction

### 🎨 **Visual Adaptations**
- **Typography Scaling**:
  - Titles: 1.875rem (mobile) → 3rem (desktop)
  - Body text: 0.875rem (mobile) → 1rem (desktop)
  - Buttons: 0.875rem (mobile) → 1rem (desktop)
- **Spacing System**:
  - Reduced margins and padding on mobile
  - Optimized gap between elements
  - Container padding: 16px (mobile) → 32px (desktop)

### 📐 **Layout Adaptations**
- **Battle Section**:
  - Mobile: Cards stack vertically (xs: 12)
  - Tablet: Cards side by side (sm: 6)
  - Desktop: Centered layout (md: 5)
- **Resource Section**:
  - Mobile: Stacked vertically (column direction)
  - Desktop: Side by side (row direction)
- **Navigation Controls**:
  - Mobile: Stacked button layout
  - Desktop: Horizontal button layout

### 🔧 **Technical Implementation**
```tsx
// Responsive breakpoints w Material-UI
sx={{
  fontSize: { xs: '0.875rem', sm: '1rem' },
  padding: { xs: 2, sm: 3 },
  width: { xs: '100%', md: 350 }
}}
```

### ✅ **Tested Devices**
- **Mobile**: iPhone X viewport (375×812)
- **Tablet**: iPad-like dimensions
- **Desktop**: 1280×720 and above
- **Cross-browser**: Chrome, Safari, Firefox

---

## 6. Testy

- **Frontend**  
  - Unit tests: React Testing Library + Jest  
  - E2E: Cypress (test przepływu losowania, przycisku Play Again, niezależności sekcji)
  - **Performance tests**: Sprawdzenie braku niepotrzebnych re-renderów
  - **Mobile tests**: Cypress mobile viewport testing

- **Backend**  
  - Testy jednostkowe dla Server Actions i logiki biznesowej: Jest
  - Testy integracyjne dla Route Handler'a GraphQL z bazą danych

---

## 7. Architektura i narzędzia

- **Architektura**: Aplikacja Fullstack oparta na **Next.js App Router**
- **Frontend**:  
  - React + TypeScript z optymalizacjami wydajności
  - Material‑UI (komponenty Card, Button) z responsywnymi wymiarami
  - TanStack Query do komunikacji z GraphQL API
  - **Performance**: useCallback, useMemo, stable layout
  - **Responsiveness**: Mobile-first design z Material-UI breakpoints

- **Backend (zintegrowany)**:  
  - Next.js Route Handlers (dla GraphQL Queries)
  - Next.js Server Actions (dla CRUD Mutations)
  - Apollo Server (`@apollo/server`) do obsługi logiki GraphQL
  - Drizzle ORM do komunikacji z bazą danych
  - SQLite jako baza danych (development)

---

## 8. Stan realizacji

### ✅ Zrealizowane funkcjonalności
1. **Niezależny system bitwy** - oddzielony od przeglądania zasobów
2. **Optymalizacje wydajności** - brak niepotrzebnych re-renderów
3. **Stabilny layout** - responsywne wymiary kart, placeholder dla wyników
4. **Płynne UX** - eliminacja migania i skakania strony
5. **Licznik zwycięstw** - persistentny przez sesję
6. **Material-UI design** - profesjonalny wygląd z dobrym UX
7. **GraphQL + Server Actions** - pełne API backend
8. **Database integration** - SQLite z Drizzle ORM
9. **📱 Mobile Responsiveness** - pełna responsywność na wszystkich urządzeniach

### 🔄 Możliwe rozszerzenia (future scope)
1. **Deployment na Vercel** z PostgreSQL
2. **Pagination** w zapytaniach GraphQL
3. **Dodatkowe atrybuty** w kartach bitwy
4. **Animacje** przejść między kartami
5. **PWA features** dla lepszego mobile experience

---

## 9. Jakość i najlepsze praktyki (zrealizowane)

- ✅ **Czytelność i organizacja kodu**  
  - Modularna struktura, jednolite nazewnictwo, separacja odpowiedzialności
  - Hooks optymalizacyjne (useCallback, useMemo)
- ✅ **Wydajność**  
  - Brak wycieków pamięci i nadmiernych renderów w React  
  - Optymalne wykorzystanie React patterns
- ✅ **UX Excellence**
  - Responsywny interfejs bez migania
  - Intuicyjne zachowanie przy zmianie parametrów
  - Stabilny layout bez layout shift
  - **Mobile-optimized UX** z touch-friendly elements
- **Bezpieczeństwo**  
  - Walidacja i sanitacja danych wejściowych w Server Actions i GraphQL
- **Dokumentacja**  
  - README z opisem architektury i instrukcją uruchomienia  
  - Komentarze w miejscach kluczowych 
- ✅ **Cross-Device Compatibility**
  - Pełna responsywność na mobile, tablet, desktop
  - Tested na różnych viewport sizes
  - Touch-optimized interface 