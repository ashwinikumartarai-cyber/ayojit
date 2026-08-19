<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 🏛️ Ayojit Intelligence — About \& Founder Section Update Guide

**Domain:** `ayojitintelligence.com`
**Changes:** Remove phone number, add editable About/Founder sections, add Visions \& Goals

***

## 📝 1. Updated Professional Profile (No Phone Number)

```typescript
// data/founder-profile.ts
export const founderProfile = {
  name: 'Ashwini Kumar Tarai',
  title: 'Behavioral & Quantitative Research Analyst',
  location: 'Jamshedpur, Jharkhand, India',
  email: 'ashwinikumar360@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashwinikumartarai',
  // Phone removed for privacy
  
  summary: `Freelance Behavioral and Quantitative Research Analyst with three years of experience supporting academic, non-profit, and behavioral science projects through statistical reasoning, research design, and advanced data analysis in JASP. Skilled at converting psychological and behavioral data into evidence-based insights using both frequentist and Bayesian methods. Pursuing a Bachelor of Arts (Honours) in Psychology at Indira Gandhi National Open University, with a focus on ethical application of behavioral analytics. Experienced in APA 7th Edition scholarly reporting, ethical research compliance, and delivering findings that prioritize human wellbeing and responsible research practice.`,
  
  visions: [
    {
      title: 'Ethical Academic Intelligence',
      description: 'Build a platform that turns fragmented academic knowledge into organized, usable work while maintaining 100% ethical standards with zero ghostwriting and zero plagiarism.',
      icon: '🎯',
    },
    {
      title: 'Accessible Research Infrastructure',
      description: 'Democratize access to advanced research tools, literature search, and quantitative analysis for students and researchers across India and beyond.',
      icon: '🌍',
    },
    {
      title: 'Behavioral Science Integration',
      description: 'Bridge the gap between behavioral analytics, quantitative research, and academic learning to create evidence-based educational experiences.',
      icon: '🧠',
    },
    {
      title: 'AI-Powered Mentorship',
      description: 'Leverage GenAI and statistical reasoning to provide personalized academic mentorship while maintaining human oversight and ethical boundaries.',
      icon: '🤖',
    },
  ],
  
  goals: [
    {
      title: 'Platform Growth',
      metric: '10,000+ Scholars',
      timeline: 'By 2027',
      description: 'Scale the platform to serve 10,000+ active scholars with courses, research support, and mentorship.',
    },
    {
      title: 'Research Impact',
      metric: '500+ Projects',
      timeline: 'By 2027',
      description: 'Support 500+ academic and behavioral science research projects with statistical analysis and methodology consulting.',
    },
    {
      title: 'Content Excellence',
      metric: '100+ Courses',
      timeline: 'By 2027',
      description: 'Publish 100+ high-quality masterclasses and courses with 11-stage editorial quality gates.',
    },
    {
      title: 'Global Recognition',
      metric: 'ISO Certification',
      timeline: 'By 2028',
      description: 'Achieve ISO 27001 (Information Security) and ISO 9001 (Quality Management) certifications.',
    },
  ],
  
  skills: {
    statistical: [
      'JASP',
      'Statistical Testing (t-tests, ANOVA, Regression)',
      'Bayesian & Frequentist Analysis',
      'Quantitative Data Analysis',
      'Behavioral Analytics',
      'Data Visualization',
      'Credit Risk Analysis',
      'KPI Development',
      'Cloud Solutions Architecture (AWS)',
      'GenAI-Powered Analytics',
      'Cybersecurity Fundamentals',
    ],
    research: [
      'Research Design (Experimental & Correlational)',
      'Literature Review',
      'Scholarly Report Writing',
      'APA 7th Edition Formatting',
      'Survey/Data Collection',
    ],
    compliance: [
      'APA Ethical Principles and Code of Conduct',
      'Ethical AI Evaluation',
      'Human-Subjects Research Compliance',
    ],
    attributes: [
      'Critical Thinking',
      'Independent Work',
      'Detail-Oriented',
      'Committed',
      'Responsible',
      'Focused',
      'Statistical Reasoning',
    ],
  },
  
  experience: [
    {
      role: 'Behavioral & Quantitative Research Analyst (Freelance)',
      period: 'Jun 2023 – Present',
      company: 'Independent Psychological Consulting',
      location: 'Delhi, India (Remote)',
      responsibilities: [
        'Formulated and managed ethical, evidence-based research designs using controlled experimental and correlational methodologies for academic and behavioral science projects.',
        'Performed statistical testing — t-tests, ANOVA, and regression — on quantitative datasets in JASP, applying both frequentist and Bayesian analytical approaches.',
        'Ensured all data collection and human-participant interactions complied with APA Ethical Principles and Code of Conduct, supported by APA membership.',
        'Produced scholarly reports and literature reviews in APA 7th Edition format for submission to academic committees, demonstrating critical analysis and scientific communication.',
        'Delivered evidence-based insights for academic, non-profit, and behavioral science clients by translating complex psychological data into actionable findings.',
      ],
    },
    {
      role: 'Freelancer',
      period: 'Aug 2018 – Present',
      company: 'Self-Employed',
      location: 'Remote',
      responsibilities: [
        'Operated as an independent freelancer, managing client engagements and day-to-day operational responsibility on a remote basis over an eight-year period.',
      ],
    },
    {
      role: 'Junior Accountant',
      period: 'Feb 2017 – May 2018',
      company: 'Being Social Foundation',
      location: 'Bhilai, India',
      responsibilities: [
        'Supported financial record-keeping and accounting operations for a non-profit organization.',
      ],
    },
  ],
  
  education: [
    {
      degree: 'Bachelor of Arts (Honours), Psychology',
      institution: 'Indira Gandhi National Open University',
      period: 'Jul 2021 – Jun 2024',
    },
  ],
  
  certifications: [
    'Big Data 101 (BD0101EN) — IBM / Cognitive Class — Jan 2026',
    'Cybersecurity Fundamentals — IBM SkillsBuild — Jan 2026',
    'Explorations into Mindfulness — IBM SkillsBuild — Jan 2026',
    'Wellbeing Academy for Students — IBM & spunout — Jan 2026',
    'Learn about Crude Oil Across Asia Region — CME Group Institute — Jan 2026',
    'Mental Health, Recovery and Community Inclusion',
    'Mental Health and Multiple Sclerosis',
    'E-Taxation',
  ],
  
  jobSimulations: [
    'Data Analytics Job Simulation — Deloitte — Jan 2026',
    'Solutions Architecture Job Simulation — AWS — Jan 2026',
    'IT Architecture Job Simulation — BCG Platinion — Jan 2026',
    'Quantitative Research Job Simulation — JPMorgan Chase and Co. — Jan 2026',
    'Markets Quantitative Analysis (MQA) Job Simulation — Citi — Jan 2026',
    'Operations Job Simulation — Goldman Sachs — Jan 2026',
    'Project Manager Job Simulation — Siemens — Jan 2026',
    'Data Visualisation: Empowering Business with Effective Insights — Tata — Jan 2026',
    'GenAI Powered Data Analytics Job Simulation — Tata — Jan 2026',
  ],
};
```


***

## 🗄️ 2. Database Schema for Editable Content

```prisma
// prisma/schema.prisma

// Add these new models for editable About & Founder sections

model AboutSection {
  id          String   @id @default(cuid())
  section     String   @unique // 'about', 'founder', 'mission', 'vision'
  title       String
  content     String   @db.Text
  order       Int      @default(0)
  published   Boolean  @default(true)
  updatedAt   DateTime @updatedAt
  createdAt   DateTime @default(now())
}

model Vision {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  icon        String
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model Goal {
  id          String   @id @default(cuid())
  title       String
  metric      String
  timeline    String
  description String   @db.Text
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model Certification {
  id          String   @id @default(cuid())
  name        String
  issuer      String
  date        String
  type        CertificationType @default(CERTIFICATION)
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

enum CertificationType {
  CERTIFICATION
  JOB_SIMULATION
  COURSE
}
```


***

## 🔧 3. Server Actions for CRUD Operations

```typescript
// lib/actions/content.ts
'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

// About Section Actions
export async function updateAboutSection(section: string, content: string) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  await db.aboutSection.upsert({
    where: { section },
    update: { content },
    create: {
      section,
      title: section.charAt(0).toUpperCase() + section.slice(1),
      content,
    },
  });
  
  revalidatePath('/about');
  revalidatePath('/founder');
  
  return { success: true };
}

export async function getAboutSection(section: string) {
  const about = await db.aboutSection.findUnique({
    where: { section },
  });
  
  return about;
}

// Vision Actions
export async function createVision(data: { title: string; description: string; icon: string }) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  const vision = await db.vision.create({
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
      order: await db.vision.count(),
    },
  });
  
  revalidatePath('/founder');
  
  return vision;
}

export async function updateVision(id: string, data: Partial<{ title: string; description: string; icon: string; order: number }>) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  const vision = await db.vision.update({
    where: { id },
    data,
  });
  
  revalidatePath('/founder');
  
  return vision;
}

export async function deleteVision(id: string) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  await db.vision.delete({
    where: { id },
  });
  
  revalidatePath('/founder');
  
  return { success: true };
}

export async function getVisions() {
  return await db.vision.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}

// Goal Actions
export async function createGoal(data: { title: string; metric: string; timeline: string; description: string }) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  const goal = await db.goal.create({
    data: {
      title: data.title,
      metric: data.metric,
      timeline: data.timeline,
      description: data.description,
      order: await db.goal.count(),
    },
  });
  
  revalidatePath('/founder');
  
  return goal;
}

export async function updateGoal(id: string, data: Partial<{ title: string; metric: string; timeline: string; description: string; order: number }>) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  const goal = await db.goal.update({
    where: { id },
    data,
  });
  
  revalidatePath('/founder');
  
  return goal;
}

export async function deleteGoal(id: string) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  await db.goal.delete({
    where: { id },
  });
  
  revalidatePath('/founder');
  
  return { success: true };
}

export async function getGoals() {
  return await db.goal.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}
```


***

## 📄 4. Updated About Page

```typescript
// app/(public)/about/page.tsx
import { db } from '@/lib/db';
import { AboutContent } from '@/components/about/AboutContent';
import { MissionSection } from '@/components/about/MissionSection';

export const metadata = {
  title: 'About Ayojit Intelligence',
  description: 'Academic intelligence and research infrastructure platform connecting learning, knowledge, research support, documentation, and workflow.',
};

export default async function AboutPage() {
  const aboutSection = await db.aboutSection.findFirst({
    where: { section: 'about', published: true },
  });
  
  const missionSection = await db.aboutSection.findFirst({
    where: { section: 'mission', published: true },
  });
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Ayojit Intelligence
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            An academic intelligence and research infrastructure platform connecting learning, knowledge, research support, documentation, and workflow.
          </p>
        </div>
      </section>
      
      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AboutContent content={aboutSection?.content} />
        </div>
      </section>
      
      {/* Mission & Ethics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <MissionSection content={missionSection?.content} />
        </div>
      </section>
      
      {/* Core Mandate */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Core Mandate
            </h2>
            <p className="text-xl text-gray-700 italic">
              Turn fragmented academic knowledge into organized, usable work.
            </p>
          </div>
        </div>
      </section>
      
      {/* Ethical Boundary */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Ethical Boundary
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>100% Ethical Academic Mentorship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Strict Zero-Ghostwriting Code of Conduct</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Strict Zero-Plagiarism Code of Conduct</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>APA Ethical Principles and Code of Conduct Compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Human-Subjects Research Compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```


***

## 👤 5. Updated Founder Page

```typescript
// app/(public)/founder/page.tsx
import { db } from '@/lib/db';
import { founderProfile } from '@/data/founder-profile';
import { FounderProfile } from '@/components/founder/FounderProfile';
import { VisionsSection } from '@/components/founder/VisionsSection';
import { GoalsSection } from '@/components/founder/GoalsSection';
import { ExperienceSection } from '@/components/founder/ExperienceSection';
import { CertificationsSection } from '@/components/founder/CertificationsSection';

export const metadata = {
  title: 'Founder — Ashwini Kumar Tarai',
  description: 'Behavioral & Quantitative Research Analyst, founder of Ayojit Intelligence.',
};

export default async function FounderPage() {
  const visions = await db.vision.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
  
  const goals = await db.goal.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
  
  const certifications = await db.certification.findMany({
    where: { published: true, type: 'CERTIFICATION' },
    orderBy: { order: 'asc' },
  });
  
  const jobSimulations = await db.certification.findMany({
    where: { published: true, type: 'JOB_SIMULATION' },
    orderBy: { order: 'asc' },
  });
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {founderProfile.name}
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-4">
              {founderProfile.title}
            </p>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <span>📍 {founderProfile.location}</span>
              <a 
                href={`mailto:${founderProfile.email}`}
                className="text-blue-600 hover:underline"
              >
                📧 {founderProfile.email}
              </a>
              <a 
                href={founderProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Profile Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FounderProfile summary={founderProfile.summary} />
        </div>
      </section>
      
      {/* Visions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <VisionsSection visions={visions.length > 0 ? visions : founderProfile.visions} />
        </div>
      </section>
      
      {/* Goals */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <GoalsSection goals={goals.length > 0 ? goals : founderProfile.goals} />
        </div>
      </section>
      
      {/* Skills */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Core Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistical & Analytical</h3>
                <ul className="space-y-2 text-gray-700">
                  {founderProfile.skills.statistical.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Research & Reporting</h3>
                <ul className="space-y-2 text-gray-700">
                  {founderProfile.skills.research.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance & Ethics</h3>
                <ul className="space-y-2 text-gray-700">
                  {founderProfile.skills.compliance.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Attributes</h3>
                <ul className="space-y-2 text-gray-700">
                  {founderProfile.skills.attributes.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ExperienceSection experience={founderProfile.experience} />
        </div>
      </section>
      
      {/* Education */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
            {founderProfile.education.map((edu, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-gray-600 text-sm mt-2">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <CertificationsSection 
            certifications={founderProfile.certifications}
            jobSimulations={founderProfile.jobSimulations}
          />
        </div>
      </section>
      
      {/* Footer Attribution */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Visioned & Operated by Ashwini Kumar Tarai.
          </p>
        </div>
      </section>
    </div>
  );
}
```


***

## 🎨 6. Admin Editor Components

```typescript
// components/admin/ContentEditor.tsx
'use client';

import { useState } from 'react';
import { updateAboutSection, createVision, createGoal } from '@/lib/actions/content';

interface ContentEditorProps {
  section: 'about' | 'founder' | 'mission';
  initialContent?: string;
}

export function ContentEditor({ section, initialContent = '' }: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutSection(section, content);
      setMessage('✅ Content updated successfully');
    } catch (error) {
      setMessage('❌ Failed to update content');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {section.charAt(0).toUpperCase() + section.slice(1)} Section
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="Enter content here..."
      />
      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    </div>
  );
}

export function VisionEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🎯');
  
  const handleCreate = async () => {
    await createVision({ title, description, icon });
    setTitle('');
    setDescription('');
    setIcon('🎯');
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Add New Vision</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Vision Title"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Vision Description"
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Icon (emoji)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleCreate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add Vision
      </button>
    </div>
  );
}

export function GoalEditor() {
  const [title, setTitle] = useState('');
  const [metric, setMetric] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  
  const handleCreate = async () => {
    await createGoal({ title, metric, timeline, description });
    setTitle('');
    setMetric('');
    setTimeline('');
    setDescription('');
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Add New Goal</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal Title"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        value={metric}
        onChange={(e) => setMetric(e.target.value)}
        placeholder="Metric (e.g., 10,000+ Scholars)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
        placeholder="Timeline (e.g., By 2027)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Goal Description"
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleCreate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add Goal
      </button>
    </div>
  );
}
```


***

## 📋 7. Admin Dashboard Integration

```typescript
// components/admin/ContentManagementTab.tsx
'use client';

import { ContentEditor, VisionEditor, GoalEditor } from './ContentEditor';

export function ContentManagementTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Section</h2>
        <ContentEditor section="about" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mission Section</h2>
        <ContentEditor section="mission" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Visions</h2>
        <VisionEditor />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Goals</h2>
        <GoalEditor />
      </div>
    </div>
  );
}
```


***

## ✅ 8. Migration Script

```typescript
// prisma/migrations/seed-content.ts
import { db } from '@/lib/db';
import { founderProfile } from '@/data/founder-profile';

export async function seedContent() {
  // Seed About Section
  await db.aboutSection.upsert({
    where: { section: 'about' },
    update: {},
    create: {
      section: 'about',
      title: 'About Ayojit Intelligence',
      content: `Ayojit Intelligence is an academic intelligence and research infrastructure platform connecting learning, knowledge, research support, documentation, and workflow. Founded by Ashwini Kumar Tarai, the platform is built on the core mandate to turn fragmented academic knowledge into organized, usable work.`,
    },
  });
  
  // Seed Mission Section
  await db.aboutSection.upsert({
    where: { section: 'mission' },
    update: {},
    create: {
      section: 'mission',
      title: 'Mission & Ethics',
      content: `Our mission is to provide 100% ethical academic mentorship with strict zero-ghostwriting and zero-plagiarism code of conduct. We comply with APA Ethical Principles and Code of Conduct, ensuring human-subjects research compliance in all our projects.`,
    },
  });
  
  // Seed Visions
  for (const vision of founderProfile.visions) {
    await db.vision.create({
      data: {
        title: vision.title,
        description: vision.description,
        icon: vision.icon,
      },
    });
  }
  
  // Seed Goals
  for (const goal of founderProfile.goals) {
    await db.goal.create({
      data: {
        title: goal.title,
        metric: goal.metric,
        timeline: goal.timeline,
        description: goal.description,
      },
    });
  }
  
  console.log('Content seeded successfully!');
}
```


***

## 🚀 9. Deployment Steps

1. **Update database schema:**

```bash
npx prisma migrate dev --name add_content_sections
```

2. **Run seed script:**

```bash
npx ts-node prisma/migrations/seed-content.ts
```

3. **Update footer component:**

```typescript
// components/layout/Footer.tsx
<p>Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.</p>
<p>Visioned & Operated by Ashwini Kumar Tarai.</p>
```

4. **Remove all "Jyoti Gupta" references:**

```bash
grep -r "Jyoti Gupta" .
# Manually delete any occurrences found
```

5. **Rebuild and deploy:**

```bash
npm run build
docker compose up -d --build
```


***

**Mandatory Attribution:**
`Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.`
`Visioned & Operated by Ashwini Kumar Tarai.`

