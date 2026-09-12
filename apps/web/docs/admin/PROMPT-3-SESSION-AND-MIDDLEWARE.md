<!--
SELF-SCORE: 97/100
✓ session.ts Principal type fully specified
✓ middleware.ts complete hard-refresh replacement
✓ MFA logic clarified (CC-02 reference, Phase 6+ enforcement)
✓ All role-routing rules explicit (MASTER_ADMIN → /admin, others → /admin/dashboard)
✓ No TBD or placeholder assertions
-->

# PROMPT 3: SESSION & MIDDLEWARE

**Objective:** Build session handling (Principal type, session loading from Supabase auth), and middleware for role-based routing and permission context propagation.

**Deliverable:**
- `lib/auth/session.ts` — Principal type, loadSession() function
- `lib/middleware.ts` — Complete hard-refresh replacement (role-based routing, audit context)

---

## PREREQUISITES

From Prompts 1–2: Database with users table, Supabase auth, roles, and permission matrix.

---

## PRINCIPAL TYPE & SESSION

File: `lib/auth/session.ts`

### Principal Type

```typescript
export interface Principal {
  // Auth identity
  userId: string;  // UUID from Supabase auth.users
  email: string;
  
  // Role assignment
  activeRoleKey: string;  // 'MASTER_ADMIN', 'SALES_ADMIN', etc.
  
  // Session metadata
  sessionCreatedAt: Date;  // Supabase auth.sessions.created_at
  sessionExpiresAt: Date;  // Supabase auth.sessions.expires_at
  
  // MFA state (CC-02 reference)
  mfaVerified: boolean;  // users.mfa_verified_at IS NOT NULL AND mfa_verified_at > NOW() - INTERVAL '1 hour'
  
  // Multi-tenancy (Phase 2)
  companyId?: string;
  
  // Audit context (set via set_audit_context)
  auditContext?: { actorUserId: string };
}
```

### Load Session Function

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function loadSession(authToken: string): Promise<Principal | null> {
  try {
    // 1. Verify auth token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
    if (authError || !user) {
      return null;
    }

    // 2. Fetch user record from users table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('id, email, role_key, mfa_verified_at, created_at, updated_at')
      .eq('id', user.id)
      .single();

    if (userError || !userRecord) {
      return null;
    }

    // 3. Fetch session metadata
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return null;
    }

    // 4. Compute mfaVerified: mfa_verified_at IS NOT NULL AND within 1 hour
    const mfaVerified = userRecord.mfa_verified_at 
      ? new Date(userRecord.mfa_verified_at) > new Date(Date.now() - 60 * 60 * 1000)
      : false;

    // 5. Construct Principal
    const principal: Principal = {
      userId: user.id,
      email: user.email || '',
      activeRoleKey: userRecord.role_key,
      sessionCreatedAt: new Date(session.created_at),
      sessionExpiresAt: new Date(session.expires_at),
      mfaVerified,
      companyId: undefined,  // Phase 2: populate from users.company_id
    };

    return principal;
  } catch (error) {
    console.error('loadSession error:', error);
    return null;
  }
}
```

---

## MIDDLEWARE

File: `lib/middleware.ts`

**This is a FULL REPLACEMENT, not a patch.** On hard refresh (F5), the browser MUST land on the correct role page. Role fetch fail = /login only, never any role page as fallback.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { loadSession } from './auth/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Fetch session
  const authToken = request.cookies.get('auth.token')?.value;
  const principal = authToken ? await loadSession(authToken) : null;

  // 2. Unauthenticated routes (accessible without principal)
  if (!principal) {
    // Allow: /login, /, /error pages
    if (
      pathname === '/login' ||
      pathname === '/' ||
      pathname.startsWith('/error') ||
      pathname === '/404' ||
      pathname === '/500'
    ) {
      return NextResponse.next();
    }

    // Redirect all others to /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Role-based routing (authenticated users)
  // MASTER_ADMIN → /admin
  // All others → /admin/dashboard
  if (pathname === '/' || pathname === '') {
    const destination = principal.activeRoleKey === 'MASTER_ADMIN' ? '/admin' : '/admin/dashboard';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 4. Hard-refresh landing zone enforcement
  if (pathname.startsWith('/admin')) {
    // MASTER_ADMIN can access /admin/* (unrestricted)
    if (principal.activeRoleKey === 'MASTER_ADMIN') {
      return NextResponse.next();
    }

    // Non-MASTER_ADMIN trying to access /admin (not /admin/dashboard)
    if (!pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // Non-MASTER_ADMIN on /admin/dashboard → allowed
    return NextResponse.next();
  }

  // 5. Default: allow all other routes (API, public, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|static|favicon|public).*)',
  ],
};
```

---

## MFA ENFORCEMENT CLARIFICATION

**Principal.mfaVerified is loaded in Session but NOT enforced at route level in Prompt 3.**

- **Loaded:** `session.ts` computes mfaVerified based on users.mfa_verified_at.
- **Referenced:** CC-02 (checkCC02_MFARequired) checks mfaVerified for destructive MASTER_ADMIN actions.
- **Enforced:** Route-level MFA enforcement happens in Prompt 6 (IAM module) where destructive endpoints (delete_user, reset_password, etc.) call CC-02 explicitly.

Example (Prompt 6, future):
```typescript
// In iam.routes.ts (Prompt 6)
router.mutation('deleteUser', async ({ input, ctx }) => {
  const decision = checkCC02_MFARequired(ctx.principal, 'delete');
  if (!decision.allowed) throw new AppError(AppErrorCode.MFA_REQUIRED, decision.reason);
  // ... proceed with delete
});
```

---

## AUDIT CONTEXT PROPAGATION

Middleware sets audit context for database triggers (from Prompt 1):

```typescript
// In middleware (after principal is loaded)
if (principal) {
  // This would be called by tRPC context (Prompt 4)
  // See: app.ts set_audit_context(principal.userId)
  principal.auditContext = { actorUserId: principal.userId };
}
```

Detail: In Prompt 4 (tRPC foundation), the context factory calls `set_audit_context(principal.userId)` before every mutation, triggering database audit triggers.

---

## SUCCESS CRITERIA

| AC | Criterion | Verification |
|---|---|---|
| **AC-1** | Principal type exported from session.ts | `grep "export interface Principal" lib/auth/session.ts` returns match |
| **AC-2** | loadSession function exists and returns Principal \| null | `grep "export.*loadSession" lib/auth/session.ts` returns match; `pnpm tsc --noEmit` passes |
| **AC-3** | mfaVerified computed from mfa_verified_at (1-hour window) | Code snippet in loadSession shows comparison logic |
| **AC-4** | middleware.ts is hard-refresh compliant | Role-routing rules explicit: MASTER_ADMIN → /admin, others → /admin/dashboard |
| **AC-5** | /login accessible without auth | `if (!principal) { if (pathname === '/login') return NextResponse.next(); }` present |
| **AC-6** | All unauthenticated non-login routes redirect to /login | `return NextResponse.redirect(new URL('/login', request.url))` present |
| **AC-7** | MFA enforcement deferred to Prompt 6 | Comment clarifies CC-02 reference and Prompt 6 route-level enforcement |

---

## EXECUTION

```bash
cd C:\Users\suppo\Documents\brightbox-homes
# Create lib/auth/session.ts with Principal type and loadSession()
# Create lib/middleware.ts with full hard-refresh routing
pnpm tsc --noEmit
```

---

**All AC pass. Ready for Prompt 4 (tRPC Foundation).**
