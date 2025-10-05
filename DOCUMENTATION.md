# Luxury Labs - Complete Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [Security & RLS Policies](#security--rls-policies)
6. [Authentication System](#authentication-system)
7. [Component Structure](#component-structure)
8. [Edge Functions](#edge-functions)
9. [Design System](#design-system)
10. [Deployment](#deployment)
11. [Development Setup](#development-setup)
12. [API Reference](#api-reference)
13. [Known Issues](#known-issues)

---

## Project Overview

**Luxury Labs** is a comprehensive real estate investment and property management platform focused on luxury property flipping in Dubai. The platform connects investors, real estate agents, and administrators to manage the entire lifecycle of luxury property investments.

### Key Features
- **Multi-role system**: Administrator, Real Estate Agent, Investor, Client, Project Manager
- **Opportunity Management**: Property sourcing, evaluation, and approval workflows
- **Project Management**: Full lifecycle tracking from acquisition to sale
- **Investment Tracking**: Cap tables, allocations, payments, and returns
- **Document Management**: Secure storage and e-signature integration
- **Analytics**: Marketing, traffic, and financial reporting
- **CRM**: Contact management and investor relations

### Business Model
- Property flipping (renovation & resale)
- Syndicated investment funds
- Concierge services for HNWI clients

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │  Dashboard   │  │   Admin      │      │
│  │   Pages      │  │  Components  │  │   Panels     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │          State Management (Zustand)               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├── Supabase Client
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                    Supabase Backend                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  PostgreSQL  │  │   Auth       │  │   Storage    │       │
│  │  Database    │  │   System     │  │   Buckets    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌─────────────────────────────────────────────────┐         │
│  │          Edge Functions (Deno)                  │         │
│  │  • Email sending                                │         │
│  │  • Opportunity sharing                          │         │
│  │  • Document signatures                          │         │
│  │  • Property data extraction                     │         │
│  │  • Rate limiting                                │         │
│  └─────────────────────────────────────────────────┘         │
└───────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication Flow**
   ```
   User Login → Supabase Auth → Profile Lookup → Role Assignment → Dashboard Redirect
   ```

2. **Opportunity Workflow**
   ```
   Agent Sources Property → Admin Reviews → Approval → Share with Investors → 
   EOI Collection → Allocation → Convert to Project
   ```

3. **Project Lifecycle**
   ```
   Planning → Acquisition → Renovation → Marketing → Sale → Distribution
   ```

---

## Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Maps**: Mapbox GL + react-map-gl
- **Internationalization**: i18next + react-i18next

### Backend (Supabase)
- **Database**: PostgreSQL 15.x
- **Authentication**: Supabase Auth (JWT-based)
- **Storage**: Supabase Storage (4 buckets)
- **Edge Functions**: Deno runtime
- **Real-time**: Supabase Realtime (WebSocket)

### External Services
- **Email**: Resend API
- **Document Signing**: DocuSign/SignNow
- **Maps**: Mapbox
- **AI**: OpenAI API

### Development Tools
- **Package Manager**: bun
- **Linting**: ESLint
- **Testing**: Vitest + Testing Library
- **Version Control**: Git + GitHub

---

## Database Schema

### Core Tables Overview

#### User Management
- **profiles**: User profiles with role assignments
- **notification_preferences**: User notification settings

#### Opportunity Management
- **opportunities** (implied, not in schema but referenced)
- **opportunity_shares**: Shared opportunities with investors
- **opportunity_analytics**: View tracking and engagement
- **opportunity_investor_process**: Investor journey stages

#### Project Management
- **projects**: Main project records
- **ll_projects**: Luxury Labs specific project tracking
- **project_updates**: Communication to investors
- **ll_leads**: Lead management and qualification

#### Investment Management
- **investors** (implied from references)
- **allocations**: Investment commitments
- **cap_table_entries**: Ownership tracking
- **investment_payments**: Payment schedules and tracking
- **signature_requests**: E-signature workflow

#### Property & SPV Management
- **properties** (referenced)
- **ll_spvs**: Special Purpose Vehicles (legal entities)

#### Financial & Reporting
- **financial_reports**: Period-based financial statements
- **marketing_campaigns**: Campaign management
- **marketing_analytics**: Marketing performance
- **campaign_analytics**: Campaign-specific metrics
- **traffic_analytics**: Website analytics

#### CRM & Communications
- **contacts**: Unified contact management
- **calendar_events**: Scheduling system
- **investor_messages**: Investor communication threads

#### System & Security
- **audit_log**: System activity tracking
- **security_audit_log**: Security events
- **user_submissions**: Public form submissions
- **submission_rate_limits**: Rate limiting
- **user_actions**: User behavior analytics
- **referrals**: Referral program tracking
- **investor_questionnaires**: Lead qualification
- **investor_assessment**: Investor profiling
- **notifications**: In-app notifications

### Critical Relationships

```sql
-- User to Profile (1:1)
auth.users.id → profiles.user_id

-- Project Relationships
projects.property_id → properties.id
projects.opportunity_id → opportunities.id
ll_projects.spv_id → ll_spvs.id

-- Investment Chain
allocations.investor_id → investors.id
allocations.project_id → projects.id
cap_table_entries.project_id → projects.id
cap_table_entries.investor_id → investors.id

-- Signature Workflow
signature_requests.allocation_id → allocations.id
```

### Database Functions

#### Security Functions
```sql
-- Role Checking
is_admin(user_uuid uuid) → boolean
is_verified_admin(user_uuid uuid) → boolean
get_user_role(user_uuid uuid) → text
check_user_permission(user_uuid, resource_name, permission_type) → boolean

-- Investor Functions
get_current_investor_id() → uuid
```

#### Audit & Security
```sql
log_security_event(event_type, user_id, details, severity)
audit_referral_access() -- Trigger function
```

#### Rate Limiting
```sql
track_submission_rate_limit()
cleanup_rate_limits()
```

#### Data Masking
```sql
mask_referral_data(referral_data jsonb, user_role text) → jsonb
```

#### Analytics
```sql
get_button_analytics(start_date, end_date) → TABLE
```

#### User Management
```sql
handle_new_user() -- Auth trigger
handle_admin_signup() -- Special admin handling
promote_to_admin(user_email text)
```

#### Timestamps
```sql
update_updated_at_column() -- Generic trigger
```

---

## Security & RLS Policies

### Authentication & Authorization

#### Role Hierarchy
```
Administrator → Full access to all resources
├── Real Estate Director → Opportunity & project management
├── Real Estate Agent → Opportunity creation & management
├── Project Manager → Project execution
├── Finance Lead → Financial reporting
├── Marketing Lead → Marketing analytics
├── Investor → Portfolio view only
└── Client → Limited access to assigned projects
```

### Row-Level Security (RLS) Status

#### ✅ Tables with RLS Enabled
- profiles
- projects
- opportunities (implied)
- allocations
- cap_table_entries
- investment_payments
- investor_messages
- project_updates
- signature_requests
- financial_reports
- marketing_campaigns
- marketing_analytics
- campaign_analytics
- traffic_analytics
- contacts
- calendar_events
- opportunity_shares
- opportunity_analytics
- opportunity_investor_process
- user_actions
- investor_questionnaires
- investor_assessment
- notifications
- notification_preferences
- security_audit_log
- audit_log
- user_submissions
- submission_rate_limits
- referrals
- ll_spvs
- ll_projects
- ll_leads

#### ⚠️ CRITICAL SECURITY ISSUES

**Tables WITHOUT RLS (HIGH RISK):**
- **cap_table_snapshots** - Exposes all ownership data publicly
  - Impact: Historical investor positions visible to anyone
  - Fix: Enable RLS + restrict to admins and project investors

**Tables with WEAK RLS Policies:**
- **profiles** - Publicly readable with PII
  - Issue: No policy prevents unauthenticated access
  - Contains: Phone numbers, full names, email
  - Fix: Add explicit DENY policy for anonymous users

- **investor_questionnaires** - No SELECT policy
  - Issue: Anonymous INSERT allowed but no explicit SELECT restriction
  - Contains: Investment amounts, emails, phone, company data
  - Fix: Add SELECT policy for admins/directors only

### RLS Policy Patterns

#### Admin-Only Pattern
```sql
CREATE POLICY "admin_only" ON table_name
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'administrator'
  )
);
```

#### Owner-Only Pattern
```sql
CREATE POLICY "own_records" ON table_name
FOR SELECT USING (user_id = auth.uid());
```

#### Role-Based Pattern
```sql
CREATE POLICY "role_based" ON table_name
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = ANY(ARRAY['administrator', 'real_estate_director'])
  )
);
```

#### Investor Access Pattern
```sql
CREATE POLICY "investor_project_access" ON table_name
FOR SELECT USING (
  investor_id = get_current_investor_id() OR is_admin()
);
```

### Security Definer Functions

**Purpose**: Prevent recursive RLS checks

```sql
-- Example: Role checking without recursion
CREATE OR REPLACE FUNCTION is_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = user_uuid AND role = 'administrator'
  );
$$;
```

### Storage Bucket Policies

#### Public Buckets
- **marketing** - Public assets (logos, banners)
- **project-assets** - Public project images

#### Private Buckets
- **documents** - User documents (invoices, contracts)
- **reports** - Financial reports

**Storage RLS**: Not fully configured in schema (requires manual setup in Supabase Dashboard)

---

## Authentication System

### Implementation Details

#### Auth Provider
- **Type**: Supabase Auth (JWT-based)
- **Methods**: Email/Password (default)
- **Session Storage**: localStorage
- **Token Refresh**: Automatic via Supabase client

#### User Registration Flow

```typescript
// 1. User signs up
supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/`,
    data: {
      name: name,
      role: 'client' // Default role
    }
  }
})

// 2. Trigger: handle_new_user() or handle_admin_signup()
//    - Creates profile in public.profiles
//    - Assigns role (first user = admin, others = metadata role or 'client')

// 3. Email confirmation (if enabled)
//    - User clicks link
//    - Redirected to emailRedirectTo URL

// 4. User is authenticated
//    - Session stored in localStorage
//    - AuthContext provides user/session
```

#### Special Cases

**Admin Bootstrap**:
```sql
-- First user becomes administrator automatically
-- OR specific email: info@luxurylabs.ae
```

**Role Promotion**:
```sql
SELECT promote_to_admin('user@example.com');
```

#### Auth Context Structure

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{error}>;
  signUp: (email: string, password: string, name?: string) => Promise<{error}>;
  signOut: () => Promise<void>;
}
```

#### Protected Routes

```typescript
// Component wrapper
<ProtectedRoute>
  <DashboardLayout>
    <YourComponent />
  </DashboardLayout>
</ProtectedRoute>

// Role-based wrapper
<RoleBasedRoute allowedRoles={['administrator']}>
  <AdminComponent />
</RoleBasedRoute>
```

#### Session Persistence

- **Storage**: localStorage (automatic via Supabase client)
- **Refresh**: Automatic token refresh before expiry
- **Listener**: `onAuthStateChange` keeps session synced

**Implementation**:
```typescript
useEffect(() => {
  // Set up listener FIRST
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    }
  );

  // THEN check for existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
```

### Security Considerations

#### Current Configuration
- ✅ Email/password authentication
- ❌ Email confirmation disabled (faster dev testing)
- ⚠️ OTP expiry too long (see warnings)
- ❌ Leaked password protection disabled
- ❌ MFA not configured

#### Hardening Recommendations
1. Enable email confirmation for production
2. Reduce OTP expiry to < 1 hour
3. Enable leaked password protection
4. Add MFA for admin accounts
5. Implement password complexity requirements
6. Add rate limiting on auth endpoints

---

## Component Structure

### Directory Layout

```
src/
├── components/
│   ├── ui/                      # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── admin/                   # Admin-specific components
│   │   ├── UserManagement.tsx
│   │   ├── SystemOverview.tsx
│   │   ├── PropertyManagement.tsx
│   │   └── ...
│   ├── opportunities/           # Opportunity management
│   ├── projects/                # Project management
│   ├── modals/                  # Modal dialogs
│   ├── dashboards/              # Dashboard views
│   ├── luxury-labs/             # Business-specific components
│   ├── analytics/               # Analytics components
│   ├── documents/               # Document management
│   ├── workflows/               # Workflow components
│   └── ...
├── pages/                       # Route pages
│   ├── Landing.tsx
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── Properties.tsx
│   │   └── ...
│   └── ...
├── contexts/
│   ├── AuthContext.tsx          # Authentication state
│   └── RoleSwitchingContext.tsx # Role switching for admins
├── hooks/
│   ├── useProjects.ts
│   ├── useOpportunities.ts
│   ├── usePermissions.ts
│   └── ...
├── lib/
│   ├── utils.ts
│   ├── supabase-service.ts
│   └── ...
├── types/
│   ├── auth.ts
│   ├── projects.ts
│   └── opportunities.ts
└── integrations/
    └── supabase/
        ├── client.ts
        └── types.ts (auto-generated)
```

### Key Components

#### Layout Components

**DashboardLayout**
- Main application layout
- Sidebar navigation
- Top navigation bar
- Role-aware menu items

**AppSidebar**
- Role-based navigation menu
- Collapsible sections
- Active state indicators

**Navigation**
- Top bar with user menu
- Notification bell
- Theme toggle
- Language switcher

#### Dashboard Components

**UnifiedDashboard**
- Role-switching interface (admin feature)
- Dynamic dashboard based on role
- Quick stats overview
- Recent activities

**Role-Specific Dashboards**:
- **AdminDashboard**: System overview, user management, analytics
- **InvestorDashboard**: Portfolio, returns, opportunities
- **ClientDashboard**: Project status, documents
- **PartnerDashboard**: Collaborations, referrals

#### Business Logic Components

**OpportunityManagement**
- Opportunity listing/grid
- Filtering and search
- Status tracking
- Sharing functionality

**ProjectManagement**
- Project cards/list
- Timeline visualization
- Budget tracking
- Document attachments

**InvestorManagement**
- Investor profiles
- Investment history
- KYC verification
- Communication logs

#### Modal Components

**Strategy**: Modals for complex workflows

Examples:
- `ComprehensiveOpportunityModal`: Create/edit opportunities
- `UnifiedProjectModal`: Project creation wizard
- `InvestorAssessmentModal`: Investor questionnaire
- `UploadDocumentModal`: Document uploads

#### Utility Components

**ErrorBoundary**
- Catches React errors
- Displays fallback UI
- Logs errors

**LoadingSpinner**
- Consistent loading states
- Customizable sizes

**ProtectedRoute** / **RoleBasedRoute**
- Authentication guards
- Role-based access control

---

## Edge Functions

### Overview
Edge functions run on Deno runtime at the edge (close to users) for low-latency operations.

### Available Functions

#### 1. send-email
**Purpose**: Send transactional emails via Resend API

**Endpoint**: `/functions/v1/send-email`

**Payload**:
```typescript
{
  to: string[],
  subject: string,
  html: string,
  from?: string // defaults to configured sender
}
```

**Use Cases**:
- Welcome emails
- Opportunity sharing
- Investment confirmations
- Password resets

**Configuration**:
- Requires `RESEND_API_KEY` secret
- verify_jwt: false (public access)

#### 2. share-opportunity
**Purpose**: Share opportunity details with potential investors

**Endpoint**: `/functions/v1/share-opportunity`

**Payload**:
```typescript
{
  opportunityId: string,
  recipientEmail: string,
  recipientName?: string,
  message?: string,
  sharedBy: string
}
```

**Flow**:
1. Validates opportunity exists
2. Creates record in `opportunity_shares`
3. Sends email via Resend
4. Creates tracking record in `opportunity_analytics`

**Configuration**:
- verify_jwt: false
- Requires: RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

#### 3. track-opportunity-view
**Purpose**: Track opportunity views for analytics

**Endpoint**: `/functions/v1/track-opportunity-view`

**Payload**:
```typescript
{
  opportunityId: string,
  userId?: string,
  metadata?: {
    source?: string,
    referrer?: string,
    // ... other tracking data
  }
}
```

**Inserts to**: `opportunity_analytics` table

#### 4. extract-property-data
**Purpose**: AI-powered property data extraction from documents/listings

**Endpoint**: `/functions/v1/extract-property-data`

**Payload**:
```typescript
{
  source: string, // URL or text content
  type: 'url' | 'text'
}
```

**Returns**: Structured property data (address, price, specs, etc.)

**Configuration**:
- Requires: OPENAI_API_KEY
- Uses GPT model for extraction

#### 5. rate-limit-submissions
**Purpose**: Prevent spam on public forms

**Endpoint**: `/functions/v1/rate-limit-submissions`

**Logic**:
- Checks `submission_rate_limits` table
- Enforces 5 submissions per hour per IP
- Returns 429 if exceeded

**Configuration**:
- verify_jwt: false (runs before auth)

#### 6. send-signature
**Purpose**: Initiate e-signature workflow (DocuSign/SignNow)

**Endpoint**: `/functions/v1/send-signature`

**Payload**:
```typescript
{
  allocationId: string,
  signerEmail: string,
  signerName: string,
  documentUrl: string,
  vendor: 'docusign' | 'signnow'
}
```

**Flow**:
1. Creates signature request via vendor API
2. Inserts record in `signature_requests`
3. Sends notification email

#### 7. signature-webhook
**Purpose**: Handle signature completion callbacks from vendors

**Endpoint**: `/functions/v1/signature-webhook`

**Payload**: Vendor-specific webhook format

**Flow**:
1. Validates webhook signature
2. Updates `signature_requests.status`
3. Updates `allocations.status` if docs complete
4. Sends confirmation email

### Edge Function Configuration

**Global Settings** (supabase/config.toml):
```toml
[functions.function-name]
verify_jwt = false  # Allow unauthenticated access
```

**Environment Variables** (Supabase Secrets):
- OPENAI_API_KEY
- RESEND_API_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY
- MAPBOX_PUBLIC_TOKEN

**Deployment**: Automatic via Lovable/Supabase sync

---

## Design System

### Color Tokens (HSL)

**File**: `src/index.css`

#### Light Mode
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}
```

#### Dark Mode
```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... inverted colors */
}
```

### Typography

**Fonts**:
- **Headings**: League Spartan (weights: 400-800)
- **Body**: Montserrat (weights: 400, 600, 700)

**Scale**:
```css
text-xs: 0.75rem;
text-sm: 0.875rem;
text-base: 1rem;
text-lg: 1.125rem;
text-xl: 1.25rem;
text-2xl: 1.5rem;
text-3xl: 1.875rem;
text-4xl: 2.25rem;
```

### Component Variants

#### Button Variants
```typescript
variants: {
  default: "bg-primary text-primary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "border border-input bg-background",
  secondary: "bg-secondary text-secondary-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4"
}
```

#### Sizes
```typescript
sizes: {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10"
}
```

### Custom Classes

**Luxury Gradient** (brand accent):
```css
.luxury-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Usage**: Primary CTAs, hero sections, premium features

### Responsive Breakpoints

```javascript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### Design Principles

1. **Semantic Tokens**: Never use direct colors (e.g., `text-blue-500`), always use tokens (`text-primary`)
2. **Component Composition**: Build complex UIs from shadcn/ui primitives
3. **Consistent Spacing**: Use Tailwind's spacing scale (4px base unit)
4. **Accessible**: Minimum contrast ratios, keyboard navigation
5. **Dark Mode First**: Design considers both themes

---

## Deployment

### Production Environment

**Hosting**: Lovable Platform (auto-deployed)

**URL Structure**:
- Staging: `https://[project-name].lovable.app`
- Custom Domain: Configure in Project Settings → Domains

### Supabase Project

**Project ID**: `vzrdmjbcbhhyutppuxcf`

**Dashboard**: https://supabase.com/dashboard/project/vzrdmjbcbhhyutppuxcf

**Connection Strings**:
```
API URL: https://vzrdmjbcbhhyutppuxcf.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Environment Variables

**Frontend** (.env - already in codebase):
```bash
VITE_SUPABASE_URL=https://vzrdmjbcbhhyutppuxcf.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
```

**Backend** (Supabase Secrets):
- OPENAI_API_KEY
- RESEND_API_KEY
- SUPABASE_SERVICE_ROLE_KEY
- MAPBOX_PUBLIC_TOKEN

### Build Configuration

**Vite Config** (vite.config.ts):
```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Build Command**: `bun run build`
**Output**: `dist/` directory

### Deployment Checklist

#### Pre-Deployment
- [ ] Update Supabase URL configuration in Auth settings
- [ ] Set Site URL to production domain
- [ ] Add production domain to redirect URLs
- [ ] Enable email confirmation
- [ ] Review and apply security hardening
- [ ] Run database migrations
- [ ] Test edge functions
- [ ] Update CORS settings if needed

#### Post-Deployment
- [ ] Verify authentication flow
- [ ] Test file uploads (storage buckets)
- [ ] Check email delivery
- [ ] Validate RLS policies
- [ ] Monitor error logs
- [ ] Set up analytics tracking

### Continuous Deployment

**Via Lovable**:
1. Code changes in Lovable editor
2. Auto-syncs to GitHub (if connected)
3. Auto-deploys to staging
4. Click "Publish" for production

**Via GitHub** (if connected):
1. Push to main branch
2. Lovable auto-syncs changes
3. Triggers rebuild

### Database Migrations

**Location**: `supabase/migrations/`

**Running Migrations**:
1. Via Supabase Dashboard: SQL Editor → paste migration
2. Via Lovable: Use migration tool (prompts for approval)

**Rollback**: Use Supabase Dashboard → Database → Migrations → Revert

---

## Development Setup

### Prerequisites
- Node.js 18+ or Bun 1.x
- Git
- Supabase account
- Text editor (VS Code recommended)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd luxury-labs

# Install dependencies
bun install
# or
npm install

# Set up environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
bun run dev
# or
npm run dev
```

**Dev Server**: http://localhost:8080

### Project Structure

```
luxury-labs/
├── src/               # Source code
├── public/            # Static assets
├── supabase/
│   ├── functions/     # Edge functions
│   ├── migrations/    # Database migrations
│   └── config.toml    # Supabase config
├── .env               # Environment variables
├── index.html         # Entry HTML
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # Tailwind configuration
└── tsconfig.json      # TypeScript configuration
```

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes
   # Test locally
   
   # Commit
   git add .
   git commit -m "Add new feature"
   
   # Push
   git push origin feature/new-feature
   ```

2. **Database Changes**
   - Use Lovable migration tool for SQL changes
   - Creates versioned migration files
   - User approves before execution

3. **Component Development**
   - Use shadcn/ui as base: `npx shadcn-ui@latest add <component>`
   - Customize in `src/components/ui/`
   - Build business logic in domain folders

4. **Testing**
   ```bash
   # Run tests
   bun test
   # or
   npm test
   
   # Run specific test file
   bun test src/components/__tests__/Button.test.tsx
   ```

### Debugging

**Browser DevTools**:
- Network tab: API calls to Supabase
- Console: Error messages, logs
- React DevTools: Component hierarchy, state

**Supabase Logs**:
- Database: Dashboard → Logs → Postgres Logs
- Edge Functions: Dashboard → Functions → [function-name] → Logs
- Auth: Dashboard → Auth → Logs

**Common Issues**:
1. RLS blocking queries: Check policies, verify auth state
2. CORS errors: Update Supabase Auth site URL
3. Type errors: Regenerate types: `npx supabase gen types typescript`

### Code Quality

**Linting**:
```bash
bun run lint
```

**Type Checking**:
```bash
bun run type-check
```

**Format** (if configured):
```bash
bun run format
```

---

## API Reference

### Supabase Client

**Import**:
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### Authentication

```typescript
// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    emailRedirectTo: `${window.location.origin}/`,
    data: { name: 'User Name' }
  }
});

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign Out
await supabase.auth.signOut();

// Get Session
const { data: { session } } = await supabase.auth.getSession();

// Get User
const { data: { user } } = await supabase.auth.getUser();

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  // Handle auth state changes
});
```

### Database Queries

#### SELECT
```typescript
// Fetch all projects
const { data, error } = await supabase
  .from('projects')
  .select('*');

// Fetch with filters
const { data, error } = await supabase
  .from('projects')
  .select('*, properties(*)')  // Join with properties
  .eq('status', 'active')
  .gte('budget', 1000000)
  .order('created_at', { ascending: false })
  .limit(10);

// Fetch single record
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .single();
```

#### INSERT
```typescript
const { data, error } = await supabase
  .from('projects')
  .insert({
    name: 'New Project',
    status: 'planning',
    project_type: 'flip',
    budget: 5000000,
    created_by: user.id
  })
  .select()
  .single();
```

#### UPDATE
```typescript
const { data, error } = await supabase
  .from('projects')
  .update({ status: 'in_progress', percent_complete: 25 })
  .eq('id', projectId)
  .select()
  .single();
```

#### DELETE
```typescript
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

### Storage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('documents')
  .upload(`${userId}/file.pdf`, file, {
    cacheControl: '3600',
    upsert: false
  });

// Download file
const { data, error } = await supabase.storage
  .from('documents')
  .download('path/to/file.pdf');

// Get public URL
const { data } = supabase.storage
  .from('marketing')
  .getPublicUrl('public/logo.png');

// List files
const { data, error } = await supabase.storage
  .from('documents')
  .list(`${userId}/`, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' }
  });

// Delete file
const { error } = await supabase.storage
  .from('documents')
  .remove([`${userId}/file.pdf`]);
```

### Real-time Subscriptions

```typescript
// Subscribe to table changes
const channel = supabase
  .channel('projects-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'projects'
    },
    (payload) => {
      console.log('New project:', payload.new);
    }
  )
  .subscribe();

// Unsubscribe
channel.unsubscribe();

// Listen to all events on a table
const channel = supabase
  .channel('table-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',  // INSERT, UPDATE, DELETE
      schema: 'public',
      table: 'notifications'
    },
    (payload) => {
      console.log('Change:', payload);
    }
  )
  .subscribe();
```

### Edge Function Calls

```typescript
// Call edge function
const { data, error } = await supabase.functions.invoke('send-email', {
  body: {
    to: ['recipient@example.com'],
    subject: 'Hello',
    html: '<p>Email content</p>'
  }
});

// With auth
const { data, error } = await supabase.functions.invoke('protected-function', {
  headers: {
    Authorization: `Bearer ${session.access_token}`
  },
  body: { /* payload */ }
});
```

### Custom Hooks

#### useProjects
```typescript
import { useProjects } from '@/hooks/useProjects';

const { projects, loading, error, refetch } = useProjects({
  filters: { status: 'active' },
  orderBy: { column: 'created_at', ascending: false }
});
```

#### useOpportunities
```typescript
import { useOpportunities } from '@/hooks/useOpportunities';

const { opportunities, loading, createOpportunity, updateOpportunity } = useOpportunities();
```

#### usePermissions
```typescript
import { usePermissions } from '@/hooks/usePermissions';

const { hasPermission, canEdit, canDelete } = usePermissions();

if (hasPermission('project:update')) {
  // Show edit button
}
```

---

## Known Issues

### Critical Security Vulnerabilities

#### 1. **Public Access to Sensitive Data** 🔴 CRITICAL
**Tables Affected**:
- `profiles` - Contains phone numbers, full names, emails
- `investor_questionnaires` - Contains investment amounts, contact info
- `cap_table_snapshots` - RLS completely disabled

**Impact**: 
- Data scraping by competitors
- Phishing attacks using stolen contact info
- Exposure of investor financial positions

**Fix Required**:
```sql
-- profiles table
CREATE POLICY "Deny unauthenticated access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- investor_questionnaires
CREATE POLICY "Only admins can view questionnaires"
ON public.investor_questionnaires
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role IN ('administrator', 'real_estate_director')
  )
);

-- cap_table_snapshots
ALTER TABLE public.cap_table_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins and investors can view cap tables"
ON public.cap_table_snapshots
FOR SELECT
USING (
  is_admin() OR
  investor_id = get_current_investor_id()
);
```

#### 2. **RLS Policy Exists but Table Disabled** 🟠 HIGH
Some tables have policies defined but RLS is not enabled.

**Fix**: Run `ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;`

#### 3. **Authentication Configuration** 🟡 MEDIUM
- OTP expiry too long (security risk)
- Leaked password protection disabled
- Email confirmation disabled (dev mode)

**Production Fixes**:
1. Supabase Dashboard → Auth → Settings
2. Enable email confirmation
3. Reduce OTP expiry to < 1 hour
4. Enable breach password protection

#### 4. **Postgres Version Outdated** 🟡 MEDIUM
Security patches available for Postgres version.

**Fix**: Upgrade via Supabase Dashboard → Database → Upgrade

### Application Issues

#### 1. Type Errors
**Issue**: TypeScript strict mode errors in some components
**Status**: Non-blocking (tsconfig has `noUnusedVars` disabled)
**Fix**: Gradual refactoring to remove unused variables

#### 2. Missing Error Boundaries
**Issue**: Some routes lack error boundaries
**Status**: Can cause full app crash on component errors
**Fix**: Wrap more routes in `<ErrorBoundary>`

#### 3. Incomplete Loading States
**Issue**: Some queries don't show loading spinners
**Status**: Poor UX but functional
**Fix**: Add `<LoadingSpinner />` to async components

#### 4. Storage Policies Not Configured
**Issue**: Storage bucket RLS policies may not be set
**Status**: Unknown (requires manual check)
**Fix**: Verify in Supabase Dashboard → Storage → Policies

### Performance Concerns

#### 1. Large Bundle Size
**Issue**: Many dependencies increase load time
**Potential Fixes**:
- Code splitting with React.lazy()
- Tree-shaking unused libraries
- Lazy load analytics/charts

#### 2. Unoptimized Images
**Issue**: Some images not optimized
**Fix**: Use image optimization service or compress assets

#### 3. No Query Caching Strategy
**Issue**: Some queries refetch unnecessarily
**Fix**: Configure React Query `staleTime` and `cacheTime`

### User Experience

#### 1. No Offline Support
**Issue**: App requires internet connection
**Potential**: Implement service worker for basic offline functionality

#### 2. Mobile Responsiveness
**Issue**: Some admin panels not optimized for mobile
**Fix**: Test and fix breakpoints for < 768px screens

#### 3. Missing Internationalization
**Issue**: i18n configured but not all strings translated
**Status**: English works, other languages incomplete
**Fix**: Complete translations in `src/i18n/locales/`

---

## Maintenance & Support

### Regular Maintenance Tasks

**Weekly**:
- [ ] Review security audit logs
- [ ] Check error logs in Supabase
- [ ] Monitor database performance
- [ ] Review edge function logs

**Monthly**:
- [ ] Update dependencies (`bun update`)
- [ ] Review and optimize slow queries
- [ ] Clean up old audit logs
- [ ] Backup database
- [ ] Review RLS policies for new features

**Quarterly**:
- [ ] Security audit
- [ ] Performance review
- [ ] User feedback review
- [ ] Dependency security scan
- [ ] Postgres version upgrade

### Monitoring

**Supabase Dashboard**:
- Database size and growth
- API request volume
- Auth success rate
- Edge function invocations
- Storage usage

**Application Metrics** (to implement):
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)
- User analytics (Posthog/Mixpanel)

### Support Contacts

**Supabase Support**: https://supabase.com/support
**Lovable Support**: https://docs.lovable.dev/
**GitHub Issues**: [Your repo URL]/issues

### Backup Strategy

**Database**:
- Supabase automatic backups (7 days)
- Manual exports: Dashboard → Database → Backups

**Code**:
- GitHub repository (version controlled)
- Lovable version history

**Storage**:
- Consider periodic exports of critical documents

---

## Glossary

- **SPV**: Special Purpose Vehicle - Legal entity for each project
- **EOI**: Expression of Interest - Preliminary investment commitment
- **RLS**: Row-Level Security - Postgres security feature
- **Cap Table**: Capitalization Table - Ownership breakdown
- **HNWI**: High Net Worth Individual
- **JWT**: JSON Web Token - Auth mechanism
- **Edge Function**: Serverless function running at the edge
- **Flip**: Property renovation for resale
- **Allocation**: Committed investment amount to a project
- **Real-time**: WebSocket-based live data updates

---

## Appendix

### Useful Links

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Quick Commands

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build
bun test                 # Run tests
bun run lint             # Lint code

# Database
npx supabase gen types typescript --project-id vzrdmjbcbhhyutppuxcf > src/integrations/supabase/types.ts

# Deployment
git push origin main     # Deploy via Lovable (if GitHub connected)
```

### Contact Information

**Project**: Luxury Labs Real Estate Investment Platform
**Organization**: Luxury Labs LLC (Dubai, UAE)
**Admin Email**: info@luxurylabs.ae
**Website**: [Configure in deployment]

---

**Document Version**: 1.0
**Last Updated**: 2025
**Maintained By**: Development Team

---

## Next Steps for Handover

1. **Security Hardening** (URGENT):
   - Fix RLS issues on `profiles`, `investor_questionnaires`, `cap_table_snapshots`
   - Enable email confirmation
   - Configure production auth settings

2. **Documentation**:
   - Complete API documentation for all edge functions
   - Document business workflows
   - Create user guides for each role

3. **Testing**:
   - Write integration tests for critical flows
   - Load testing for scaling preparation
   - Security penetration testing

4. **Production Readiness**:
   - Set up monitoring and alerting
   - Configure backup procedures
   - Create runbook for common issues
   - Performance optimization

5. **Team Onboarding**:
   - Walkthrough of architecture
   - Database schema review
   - Code review of critical components
   - Access provisioning (Supabase, Lovable, GitHub)
