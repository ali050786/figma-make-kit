GlobalHeader

A full-width header component used across all Jevelina screens. Supports two modes: Unsecured (pre-login) and Secured (post-login, with left navigation visible).


Layout contract

This is the most critical rule for the header. The two modes use fundamentally different alignment strategies for their inner content wrapper.

Unsecured header


The content wrapper is 1216px wide and horizontally centered using margin: 0 auto
This aligns the header content to the 12-column grid
The visual result is symmetric: equal space on left and right (112px each at 1440px viewport)
Do not use a fixed left offset — centering is intentional


Secured header


The content wrapper is also 1216px wide but left-pinned with a fixed margin-left: 112px
This offsets the content to clear the left navigation bar that is present on secured screens
The wrapper does not center — it is always anchored from the left at 112px
Do not center this wrapper — it must stay left-aligned


Unsecured:  |←——auto——→[——1216px content——]←——auto——→|
Secured:    |←—112px—→[——1216px content——————————————]|


When to use which variant

SituationUseLogin page, registration, password reset, any pre-auth screensecured={false} (Unsecured)Any screen where the left navigation bar is visiblesecured={true} (Secured)

The left nav and the secured header are always paired — if the left nav is present, the header must be secured.


API

tsx<GlobalHeader
  secured={false}           // false = unsecured (default), true = secured
  companyName="..."         // Brand/TPA name — top right, semibold, uppercase
  portalName="..."          // Portal label — below companyName, smaller
  logo={<YourLogo />}       // Logo node, constrained to 240×64px
  userName="..."            // Secured only — shown in profile dropdown
  userRole="..."            // Secured only — shown in profile dropdown
  userInitials="SJ"         // Secured only — avatar initials
  avatarBg="..."            // Secured only — avatar background color, defaults to var(--color-primary-2)
  onMyProfile={() => {}}    // Secured only — profile dropdown "My Profile" action
  onLogout={() => {}}       // Secured only — profile dropdown "Logout" action
/>


Content structure

Unsecured (left to right within centered wrapper):


Logo (left)
Spacer (flex: 1)
Company name + portal label (right)


Secured (left to right within left-pinned wrapper):


Logo (left)
Spacer (flex: 1)
Company name + portal label (right)
Divider line
Help icon
Bell icon
Avatar + chevron (opens ProfileDropdown)



Do not


❌ Change the wrapper width away from 1216px
❌ Center the secured header wrapper — it must be left-pinned at 112px
❌ Use a fixed left offset for the unsecured wrapper — it must use margin: auto
❌ Use hardcoded hex colors — all colors via var(--color-*) tokens
❌ Render the secured action icons (Help, Bell, Avatar) on an unsecured header
❌ Place the header inside the left nav's width — the header is always full-width (width: 100%) and the content wrapper handles the offset