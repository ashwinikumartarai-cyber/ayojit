<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 🚪 Ayojit Intelligence — Logout Implementation

**Add logout functionality across all components with proper session cleanup.**

***

## 🔐 1. Logout API Route

```typescript
// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { sessionToken } = await request.json();
    
    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Session token required' },
        { status: 400 }
      );
    }
    
    // Delete session from database
    await db.session.deleteMany({
      where: { token: sessionToken },
    });
    
    // Create response with cleared cookies
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    
    // Clear session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
  }
}
```


***

## 🎨 2. Logout Button in Dashboard Sidebar

```typescript
// components/dashboard/DashboardSidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/auth/session';

interface Tab {
  id: string;
  label: string;
  icon: string;
  roles?: string[];
  always?: boolean;
}

interface DashboardSidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  user: User;
}

export function DashboardSidebar({ 
  tabs, 
  activeTab, 
  onTabChange, 
  isOpen, 
  onToggle,
  user 
}: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(!isOpen);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    if (logoutLoading) return;
    
    setLogoutLoading(true);
    
    try {
      // Get session token from cookie
      const sessionToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1];
      
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      });
      
      if (response.ok) {
        // Clear any client-side auth state
        localStorage.removeItem('user');
        sessionStorage.clear();
        
        // Redirect to login
        router.push('/login');
        router.refresh();
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  };
  
  return (
    <aside 
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
    >
      {/* Logo & Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-semibold text-gray-900">Ayojit</span>
          </Link>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">
              {user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            } ${collapsed ? 'justify-center' : 'space-x-3'}`}
          >
            <span className="text-xl">{tab.icon}</span>
            {!collapsed && <span>{tab.label}</span>}
          </button>
        ))}
      </nav>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link 
          href="/"
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
        >
          <span>🏠</span>
          {!collapsed && <span>Home</span>}
        </Link>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          disabled={logoutLoading}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50`}
        >
          <span>🚪</span>
          {!collapsed && <span>{logoutLoading ? 'Logging out...' : 'Logout'}</span>}
        </button>
      </div>
    </aside>
  );
}
```


***

## 🎨 3. Logout in Dashboard Header (Alternative Location)

```typescript
// components/dashboard/DashboardHeader.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/auth/session';
import { SearchBar } from '@/components/ui/SearchBar';
import { NotificationBell } from '@/components/ui/NotificationBell';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface DashboardHeaderProps {
  user: User;
  notifications: any[];
  onNotificationClick: () => void;
  searchEnabled?: boolean;
}

export function DashboardHeader({ 
  user, 
  notifications, 
  onNotificationClick,
  searchEnabled = true 
}: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    if (logoutLoading) return;
    
    setLogoutLoading(true);
    
    try {
      const sessionToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1];
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        sessionStorage.clear();
        router.push('/login');
        router.refresh();
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  };
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left: Search */}
      {searchEnabled && (
        <div className="flex-1 max-w-xl">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses, lessons, students..."
            shortcuts={true}
          />
        </div>
      )}
      
      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications */}
        <div className="relative">
          <NotificationBell 
            count={notifications.filter(n => !n.read).length}
            onClick={() => setShowNotifications(!showNotifications)}
          />
          
          {showNotifications && (
            <NotificationDropdown 
              notifications={notifications}
              onMarkAsRead={() => {}}
              onViewAll={() => {}}
            />
          )}
        </div>
        
        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {user.email.split('@')[0]}
            </span>
            <span className="text-gray-400">▼</span>
          </button>
          
          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
              </div>
              
              <div className="py-2">
                <a 
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  👤 Profile
                </a>
                <a 
                  href="/dashboard/preferences"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  ⚙️ Settings
                </a>
                <a 
                  href="/dashboard/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  📦 Orders
                </a>
              </div>
              
              <div className="border-t border-gray-200 py-2">
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  🚪 {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
```


***

## 🎨 4. Logout in Navbar (Public Pages)

```typescript
// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/lib/auth/session';

interface NavbarProps {
  user?: User | null;
}

export function Navbar({ user }: NavbarProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    if (logoutLoading) return;
    
    setLogoutLoading(true);
    
    try {
      const sessionToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1];
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        sessionStorage.clear();
        router.push('/login');
        router.refresh();
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  };
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Ayojit Intelligence
          </Link>
          
          {/* Public Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600">
              Courses
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/founder" className="text-gray-700 hover:text-blue-600">
              Founder
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
```


***

## 🎨 5. Logout Confirmation Modal (Optional)

```typescript
// components/ui/LogoutModal.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleConfirmLogout = async () => {
    setLoading(true);
    
    try {
      const sessionToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1];
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        sessionStorage.clear();
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Logout Confirmation
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to logout? You will need to login again to access your dashboard.
        </p>
        
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLogout}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging out...' : 'Yes, Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Usage:**

```typescript
// In your component
const [showLogoutModal, setShowLogoutModal] = useState(false);

<button onClick={() => setShowLogoutModal(true)}>
  🚪 Logout
</button>

<LogoutModal 
  isOpen={showLogoutModal} 
  onClose={() => setShowLogoutModal(false)} 
/>
```


***

## 🎨 6. Footer Logout Link (Dashboard Pages)

```typescript
// components/layout/Footer.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function Footer() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    if (logoutLoading) return;
    
    setLogoutLoading(true);
    
    try {
      const sessionToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1];
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        sessionStorage.clear();
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayojit Intelligence</h3>
            <p className="text-gray-400 text-sm">
              Academic intelligence and research infrastructure platform.
            </p>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/academic-integrity" className="hover:text-white">Academic Integrity</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/dashboard/profile" className="hover:text-white">Profile</Link></li>
              <li><Link href="/dashboard/preferences" className="hover:text-white">Settings</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.</p>
          <p className="mt-2">Visioned & Operated by Ashwini Kumar Tarai.</p>
        </div>
      </div>
    </footer>
  );
}
```


***

## ✅ 7. Logout Feature Checklist

| Component | Logout Button | Status |
| :-- | :-- | :-- |
| **Dashboard Sidebar** | ✅ Yes (Primary) | Implemented |
| **Dashboard Header** | ✅ Yes (User Menu) | Implemented |
| **Public Navbar** | ✅ Yes (If logged in) | Implemented |
| **Dashboard Footer** | ✅ Yes (Account section) | Implemented |
| **API Route** | ✅ `/api/auth/logout` | Implemented |
| **Session Cleanup** | ✅ Cookie + DB | Implemented |
| **Loading State** | ✅ Yes | Implemented |
| **Error Handling** | ✅ Yes | Implemented |
| **Redirect** | ✅ To `/login` | Implemented |


***

## 🚀 8. Test Logout Flow

```bash
# 1. Login to the platform
# 2. Navigate to dashboard
# 3. Click logout button (sidebar, header, or footer)
# 4. Verify:
#    - Session cookie is cleared
#    - Database session is deleted
#    - Redirected to /login page
#    - Cannot access /dashboard without login
```


***

**Mandatory Attribution:**
`Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.`
`Visioned & Operated by Ashwini Kumar Tarai.`

