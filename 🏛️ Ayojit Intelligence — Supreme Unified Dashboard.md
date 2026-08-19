<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 🏛️ Ayojit Intelligence — Supreme Unified Dashboard

**Domain:** `ayojitintelligence.com`
**Concept:** Single, role-aware dashboard that adapts to Scholar, Instructor, or Admin — with all features accessible from one central cockpit.

***

## 🎯 Supreme Unified Dashboard Architecture

### Dashboard Router (`app/(dashboard)/dashboard/page.tsx`)

```typescript
// app/(dashboard)/dashboard/page.tsx
import { getCurrentUser } from '@/lib/auth/session';
import { ScholarDashboard } from '@/components/dashboard/ScholarDashboard';
import { InstructorDashboard } from '@/components/dashboard/InstructorDashboard';
import { AdminDashboard } from '@/components/admin/SupremeMasterConsole';
import { UnifiedDashboard } from '@/components/dashboard/UnifiedDashboard';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Role-based dashboard rendering
  // But all roles can access unified view with permission checks
  
  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedDashboard user={user} />
    </div>
  );
}
```


***

## 🎨 Unified Dashboard Component

```typescript
// components/dashboard/UnifiedDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { User, Role } from '@/lib/auth/session';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { OverviewTab } from './tabs/OverviewTab';
import { LearningTab } from './tabs/LearningTab';
import { TeachingTab } from './tabs/TeachingTab';
import { EcommerceTab } from './tabs/EcommerceTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { AdminTab } from './tabs/AdminTab';

interface UnifiedDashboardProps {
  user: User;
}

export function UnifiedDashboard({ user }: UnifiedDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  
  // Determine available tabs based on role
  const availableTabs = {
    overview: { label: 'Overview', icon: '📊', always: true },
    learning: { label: 'Learning', icon: '📚', roles: ['SCHOLAR', 'ADMIN'] },
    teaching: { label: 'Teaching', icon: '👨‍🏫', roles: ['INSTRUCTOR', 'ADMIN'] },
    ecommerce: { label: 'Store', icon: '🛒', roles: ['SCHOLAR', 'INSTRUCTOR', 'ADMIN'] },
    analytics: { label: 'Analytics', icon: '📈', roles: ['INSTRUCTOR', 'ADMIN'] },
    admin: { label: 'Admin', icon: '⚙️', roles: ['ADMIN'] },
    settings: { label: 'Settings', icon: '🔧', always: true },
  };
  
  const visibleTabs = Object.entries(availableTabs)
    .filter(([_, config]) => config.always || config.roles?.includes(user.role))
    .map(([id, config]) => ({ id, ...config }));
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <DashboardSidebar 
        tabs={visibleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader 
          user={user}
          notifications={notifications}
          onNotificationClick={() => {}}
          searchEnabled={true}
        />
        
        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {activeTab === 'overview' && <OverviewTab user={user} />}
          {activeTab === 'learning' && <LearningTab user={user} />}
          {activeTab === 'teaching' && <TeachingTab user={user} />}
          {activeTab === 'ecommerce' && <EcommerceTab user={user} />}
          {activeTab === 'analytics' && <AnalyticsTab user={user} />}
          {activeTab === 'admin' && user.role === 'ADMIN' && <AdminTab user={user} />}
          {activeTab === 'settings' && <SettingsTab user={user} />}
        </main>
      </div>
    </div>
  );
}
```


***

## 📑 Dashboard Sidebar Component

```typescript
// components/dashboard/DashboardSidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
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
        <Link 
          href="/api/auth/logout"
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
        >
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
```


***

## 📊 Tab Components

### 1. Overview Tab (All Roles)

```typescript
// components/dashboard/tabs/OverviewTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { StatCard } from '@/components/ui/StatCard';
import { ActivityGraph } from '@/components/ui/ActivityGraph';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';

interface OverviewTabProps {
  user: User;
}

export function OverviewTab({ user }: OverviewTabProps) {
  // Fetch data based on role
  const stats = {
    SCHOLAR: [
      { label: 'Courses in Progress', value: 3, icon: '📚', trend: '+1 this week' },
      { label: 'Completed', value: 12, icon: '✅', trend: '95% completion' },
      { label: 'Learning Hours', value: 48, icon: '⏱️', trend: '+8h this month' },
      { label: 'Certificates', value: 12, icon: '🏆', trend: 'Verified' },
    ],
    INSTRUCTOR: [
      { label: 'Total Enrollments', value: 234, icon: '👥', trend: '+15% this month' },
      { label: 'Average Rating', value: 4.8, icon: '⭐', trend: '4.8/5.0' },
      { label: 'Revenue (Month)', value: '₹45,200', icon: '💰', trend: '+22%' },
      { label: 'Completion Rate', value: 67, icon: '📈', trend: 'Above average' },
    ],
    ADMIN: [
      { label: 'Total Users', value: 1247, icon: '👥', trend: '+8% this month' },
      { label: 'Active Courses', value: 23, icon: '📚', trend: '3 new this week' },
      { label: 'Revenue (Month)', value: '₹2.4L', icon: '💰', trend: '+18%' },
      { label: 'System Health', value: '99.9%', icon: '✅', trend: 'All systems operational' },
    ],
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.email.split('@')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your {user.role.toLowerCase()} account today.
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats[user.role].map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Graph */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Activity Overview (Last 30 Days)
          </h2>
          <ActivityGraph 
            data={last30DaysActivity}
            type={user.role === 'SCHOLAR' ? 'learning' : 'engagement'}
          />
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Deadlines
          </h2>
          <UpcomingDeadlines deadlines={upcomingDeadlines} />
        </div>
      </div>
      
      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivities} />
        <QuickActions role={user.role} />
      </div>
    </div>
  );
}
```


***

### 2. Learning Tab (Scholars \& Admins)

```typescript
// components/dashboard/tabs/LearningTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { CourseCard } from '@/components/course/CourseCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuizSchedule } from '@/components/dashboard/QuizSchedule';
import { GradebookWidget } from '@/components/dashboard/GradebookWidget';
import { CertificateShowcase } from '@/components/dashboard/CertificateShowcase';
import { RecommendedCourses } from '@/components/course/RecommendedCourses';

interface LearningTabProps {
  user: User;
}

export function LearningTab({ user }: LearningTabProps) {
  const [activeSection, setActiveSection] = useState('courses');
  
  const sections = [
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'calendar', label: 'Study Calendar', icon: '📅' },
    { id: 'grades', label: 'Gradebook', icon: '📊' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'recommendations', label: 'Recommended', icon: '💡' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>
      
      {/* My Courses */}
      {activeSection === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <Link 
              href="/courses" 
              className="text-sm text-blue-600 hover:underline"
            >
              Browse Catalog →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard 
                key={course.id}
                course={course}
                showProgress={true}
                progress={course.progress}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Study Calendar */}
      {activeSection === 'calendar' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Study Calendar</h2>
          <QuizSchedule 
            quizzes={upcomingQuizzes}
            view="month"
            showLiveClasses={true}
          />
        </div>
      )}
      
      {/* Gradebook */}
      {activeSection === 'grades' && (
        <GradebookWidget 
          enrollments={enrolledCourses}
          showGPA={true}
          exportEnabled={true}
        />
      )}
      
      {/* Certificates */}
      {activeSection === 'certificates' && (
        <CertificateShowcase 
          certificates={userCertificates}
          showVerifyLink={true}
          downloadable={true}
        />
      )}
      
      {/* Recommendations */}
      {activeSection === 'recommendations' && (
        <RecommendedCourses 
          basedOn={completedCourses}
          algorithm="collaborative-filtering"
          limit={6}
        />
      )}
    </div>
  );
}
```


***

### 3. Teaching Tab (Instructors \& Admins)

```typescript
// components/dashboard/tabs/TeachingTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { CourseBuilder } from '@/components/instructor/CourseBuilder';
import { StudentAnalytics } from '@/components/instructor/StudentAnalytics';
import { RevenueReports } from '@/components/instructor/RevenueReports';
import { ReviewManagement } from '@/components/instructor/ReviewManagement';
import { LiveClassScheduler } from '@/components/instructor/LiveClassScheduler';

interface TeachingTabProps {
  user: User;
}

export function TeachingTab({ user }: TeachingTabProps) {
  const [activeSection, setActiveSection] = useState('courses');
  
  const sections = [
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'live', label: 'Live Classes', icon: '📹' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>
      
      {/* My Courses */}
      {activeSection === 'courses' && (
        <CourseBuilder 
          courses={instructorCourses}
          onCreateNew={() => {}}
          onEdit={(courseId) => {}}
          showAnalytics={true}
        />
      )}
      
      {/* Students */}
      {activeSection === 'students' && (
        <StudentAnalytics 
          students={enrolledStudents}
          showProgress={true}
          showAtRisk={true}
          exportEnabled={true}
        />
      )}
      
      {/* Revenue */}
      {activeSection === 'revenue' && (
        <RevenueReports 
          revenueData={monthlyRevenue}
          showTaxes={true}
          showRefunds={true}
          downloadable={true}
        />
      )}
      
      {/* Reviews */}
      {activeSection === 'reviews' && (
        <ReviewManagement 
          reviews={courseReviews}
          allowReply={true}
          filterByRating={true}
        />
      )}
      
      {/* Live Classes */}
      {activeSection === 'live' && (
        <LiveClassScheduler 
          scheduledClasses={upcomingLiveClasses}
          onScheduleNew={() => {}}
          recordingEnabled={true}
        />
      )}
      
      {/* Certificates */}
      {activeSection === 'certificates' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Issue Certificates</h2>
          <CertificateBulkIssuer 
            courses={instructorCourses}
            eligibleStudents={completedStudents}
          />
        </div>
      )}
    </div>
  );
}
```


***

### 4. E-Commerce Tab (All Roles)

```typescript
// components/dashboard/tabs/EcommerceTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { CourseCatalog } from '@/components/course/CourseCatalog';
import { ShoppingCart } from '@/components/checkout/ShoppingCart';
import { OrderHistory } from '@/components/dashboard/OrderHistory';
import { Wishlist } from '@/components/course/Wishlist';
import { Coupons } from '@/components/checkout/Coupons';

interface EcommerceTabProps {
  user: User;
}

export function EcommerceTab({ user }: EcommerceTabProps) {
  const [activeSection, setActiveSection] = useState('catalog');
  
  const sections = [
    { id: 'catalog', label: 'Browse Courses', icon: '🛒' },
    { id: 'cart', label: 'Shopping Cart', icon: '🛍️' },
    { id: 'orders', label: 'Order History', icon: '📦' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'coupons', label: 'Coupons', icon: '🎟️' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>
      
      {/* Course Catalog */}
      {activeSection === 'catalog' && (
        <CourseCatalog 
          filters={{
            category: [],
            level: [],
            price: [0, 10000],
            rating: 4,
            language: [],
          }}
          sortBy="popularity"
          view="grid"
          showFilters={true}
        />
      )}
      
      {/* Shopping Cart */}
      {activeSection === 'cart' && (
        <ShoppingCart 
          cartItems={cartItems}
          onUpdateCart={() => {}}
          showCoupons={true}
          showTaxes={true}
        />
      )}
      
      {/* Order History */}
      {activeSection === 'orders' && (
        <OrderHistory 
          orders={userOrders}
          showInvoices={true}
          showTracking={true}
          filterable={true}
        />
      )}
      
      {/* Wishlist */}
      {activeSection === 'wishlist' && (
        <Wishlist 
          items={wishlistItems}
          onMoveToCart={() => {}}
          onRemove={() => {}}
        />
      )}
      
      {/* Coupons */}
      {activeSection === 'coupons' && (
        <Coupons 
          availableCoupons={userCoupons}
          onApply={() => {}}
          shareable={true}
        />
      )}
    </div>
  );
}
```


***

### 5. Analytics Tab (Instructors \& Admins)

```typescript
// components/dashboard/tabs/AnalyticsTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { CourseAnalytics } from '@/components/analytics/CourseAnalytics';
import { RevenueAnalytics } from '@/components/analytics/RevenueAnalytics';
import { StudentEngagement } from '@/components/analytics/StudentEngagement';
import { ContentPerformance } from '@/components/analytics/ContentPerformance';

interface AnalyticsTabProps {
  user: User;
}

export function AnalyticsTab({ user }: AnalyticsTabProps) {
  const [dateRange, setDateRange] = useState('30d');
  const [activeSection, setActiveSection] = useState('overview');
  
  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'content', label: 'Content', icon: '📝' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Analytics Dashboard</h2>
        <DateRangePicker 
          value={dateRange}
          onChange={setDateRange}
          options={['7d', '30d', '90d', '1y', 'all']}
        />
      </div>
      
      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>
      
      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Revenue" value="₹2.4L" trend="+18%" icon="💰" />
          <StatCard label="Enrollments" value="1,247" trend="+12%" icon="👥" />
          <StatCard label="Completion Rate" value="67%" trend="+5%" icon="📈" />
          <StatCard label="Avg Rating" value="4.8" trend="stable" icon="⭐" />
        </div>
      )}
      
      {/* Course Analytics */}
      {activeSection === 'courses' && (
        <CourseAnalytics 
          courses={allCourses}
          metrics={['enrollments', 'revenue', 'completion', 'ratings']}
          dateRange={dateRange}
          exportable={true}
        />
      )}
      
      {/* Revenue Analytics */}
      {activeSection === 'revenue' && (
        <RevenueAnalytics 
          revenueData={revenueData}
          showTaxes={true}
          showRefunds={true}
          showTrends={true}
          downloadable={true}
        />
      )}
      
      {/* Student Engagement */}
      {activeSection === 'students' && (
        <StudentEngagement 
          data={engagementData}
          showHeatmap={true}
          showAtRisk={true}
          filterByCourse={true}
        />
      )}
      
      {/* Content Performance */}
      {activeSection === 'content' && (
        <ContentPerformance 
          lessons={allLessons}
          metrics={['views', 'completions', 'quiz-scores', 'time-spent']}
          sortBy="engagement"
        />
      )}
    </div>
  );
}
```


***

### 6. Admin Tab (Admins Only)

```typescript
// components/dashboard/tabs/AdminTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { UserManagement } from '@/components/admin/UserManagement';
import { CourseApproval } from '@/components/admin/CourseApproval';
import { FinancialReports } from '@/components/admin/FinancialReports';
import { SecurityAudit } from '@/components/admin/SecurityAudit';
import { SystemHealth } from '@/components/admin/SystemHealth';
import { ContentModeration } from '@/components/admin/ContentModeration';
import { EmailCampaigns } from '@/components/admin/EmailCampaigns';
import { BackupRestore } from '@/components/admin/BackupRestore';

interface AdminTabProps {
  user: User;
}

export function AdminTab({ user }: AdminTabProps) {
  const [activeSection, setActiveSection] = useState('users');
  
  const sections = [
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'system', label: 'System', icon: '⚙️' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'backup', label: 'Backup', icon: '💾' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>
      
      {/* User Management */}
      {activeSection === 'users' && (
        <UserManagement 
          users={allUsers}
          onRoleChange={() => {}}
          onSuspend={() => {}}
          bulkImport={true}
          exportEnabled={true}
        />
      )}
      
      {/* Course Approval */}
      {activeSection === 'courses' && (
        <CourseApproval 
          pendingCourses={pendingApprovals}
          onApprove={() => {}}
          onReject={() => {}}
          qualityChecks={true}
        />
      )}
      
      {/* Financial Reports */}
      {activeSection === 'finance' && (
        <FinancialReports 
          revenueData={totalRevenue}
          showTaxes={true}
          showRefunds={true}
          showPayouts={true}
          downloadable={true}
        />
      )}
      
      {/* Security Audit */}
      {activeSection === 'security' && (
        <SecurityAudit 
          loginAttempts={recentLogins}
          suspiciousActivity={flaggedActivities}
          twoFactorAdoption={mfaStats}
          exportable={true}
        />
      )}
      
      {/* System Health */}
      {activeSection === 'system' && (
        <SystemHealth 
          uptime={systemUptime}
          responseTimes={apiLatency}
          errorRates={errorRates}
          databaseStatus={dbHealth}
          redisStatus={redisHealth}
        />
      )}
      
      {/* Content Moderation */}
      {activeSection === 'content' && (
        <ContentModeration 
          flaggedContent={flaggedItems}
          plagiarismReports={plagiarismChecks}
          onApprove={() => {}}
          onReject={() => {}}
        />
      )}
      
      {/* Email Campaigns */}
      {activeSection === 'email' && (
        <EmailCampaigns 
          templates={emailTemplates}
          onSendCampaign={() => {}}
          analytics={emailAnalytics}
        />
      )}
      
      {/* Backup & Restore */}
      {activeSection === 'backup' && (
        <BackupRestore 
          backups={availableBackups}
          onRestore={() => {}}
          scheduleEnabled={true}
          retentionDays={30}
        />
      )}
    </div>
  );
}
```


***

### 7. Settings Tab (All Roles)

```typescript
// components/dashboard/tabs/SettingsTab.tsx
'use client';

import { User } from '@/lib/auth/session';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { AccessibilitySettings } from '@/components/settings/AccessibilitySettings';
import { BillingSettings } from '@/components/settings/BillingSettings';
import { DataExport } from '@/components/settings/DataExport';

interface SettingsTabProps {
  user: User;
}

export function SettingsTab({ user }: SettingsTabProps) {
  const [activeSection, setActiveSection] = useState('profile');
  
  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'data', label: 'Data', icon: '📊' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>
      
      {/* Profile Settings */}
      {activeSection === 'profile' && (
        <ProfileSettings 
          user={user}
          onUpdate={() => {}}
          avatarUpload={true}
          emailChange={true}
        />
      )}
      
      {/* Security Settings */}
      {activeSection === 'security' && (
        <SecuritySettings 
          user={user}
          twoFactorEnabled={mfaEnabled}
          onEnable2FA={() => {}}
          sessionManagement={true}
          loginHistory={true}
        />
      )}
      
      {/* Notification Settings */}
      {activeSection === 'notifications' && (
        <NotificationSettings 
          preferences={notificationPrefs}
          onUpdate={() => {}}
          channels={['email', 'push', 'sms']}
          categories={['course', 'payment', 'security', 'marketing']}
        />
      )}
      
      {/* Accessibility Settings */}
      {activeSection === 'accessibility' && (
        <AccessibilitySettings 
          preferences={accessibilityPrefs}
          onUpdate={() => {}}
          preview={true}
        />
      )}
      
      {/* Billing Settings */}
      {activeSection === 'billing' && (
        <BillingSettings 
          invoices={userInvoices}
          paymentMethods={savedCards}
          onAddPaymentMethod={() => {}}
          gstNumber={gstNumber}
        />
      )}
      
      {/* Data Export */}
      {activeSection === 'data' && (
        <DataExport 
          user={user}
          onExport={() => {}}
          formats={['json', 'csv', 'pdf']}
          gdprCompliant={true}
        />
      )}
    </div>
  );
}
```


***

## 🎨 Dashboard Header Component

```typescript
// components/dashboard/DashboardHeader.tsx
'use client';

import { useState } from 'react';
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
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.email.split('@')[0]}
          </span>
        </div>
      </div>
    </header>
  );
}
```


***

## 📋 Complete Feature Matrix

| Feature | Scholar | Instructor | Admin |
| :-- | :-- | :-- | :-- |
| **Overview Tab** | ✅ | ✅ | ✅ |
| **Learning Tab** | ✅ | ❌ | ✅ |
| **Teaching Tab** | ❌ | ✅ | ✅ |
| **E-Commerce Tab** | ✅ | ✅ | ✅ |
| **Analytics Tab** | ❌ | ✅ | ✅ |
| **Admin Tab** | ❌ | ❌ | ✅ |
| **Settings Tab** | ✅ | ✅ | ✅ |
| **Google Login** | ✅ | ✅ | ✅ |
| **Email OTP** | ✅ | ✅ | ✅ |
| **2FA** | Optional | Required | Required |
| **UPI Payments** | ✅ | ✅ | ✅ |
| **Course Catalog** | ✅ | ✅ | ✅ |
| **Shopping Cart** | ✅ | ✅ | ✅ |
| **Order History** | ✅ | ✅ | ✅ |
| **Wishlist** | ✅ | ✅ | ✅ |
| **Coupons** | ✅ | ✅ | ✅ |
| **Gradebook** | ✅ | ✅ | ✅ |
| **Certificates** | ✅ | ✅ | ✅ |
| **Live Classes** | ✅ | ✅ | ✅ |
| **Discussion Forums** | ✅ | ✅ | ✅ |
| **Accessibility** | ✅ | ✅ | ✅ |
| **Data Export** | ✅ | ✅ | ✅ |


***

**Mandatory Attribution:**
`Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.`
`Visioned & Operated by Ashwini Kumar Tarai.`
`A vision shaped by Jyoti Gupta.`

