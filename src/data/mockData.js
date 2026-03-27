export const policies = [
  {
    id: '1',
    title: 'Code of Conduct',
    department: 'Human Resources',
    owner: 'Sarah Johnson',
    version: '2.1',
    lastModified: 'Mar 10, 2024',
    effectiveDate: 'Apr 1, 2024',
    status: 'review',
    step: 2,
    category: 'Ethics & Compliance',
    description: 'Defines expected standards of behavior and professional conduct for all employees.',
  },
  {
    id: '2',
    title: 'Data Privacy Policy',
    department: 'Legal & Compliance',
    owner: 'Michael Chen',
    version: '3.0',
    lastModified: 'Mar 12, 2024',
    effectiveDate: 'May 1, 2024',
    status: 'stakeholder-review',
    step: 4,
    category: 'Data & Privacy',
    description: 'Governs how personal data of employees and customers is collected, processed, and stored.',
  },
  {
    id: '3',
    title: 'Anti-Bribery & Corruption Policy',
    department: 'Legal & Compliance',
    owner: 'Amanda Torres',
    version: '1.5',
    lastModified: 'Feb 28, 2024',
    effectiveDate: 'Mar 15, 2024',
    status: 'published',
    step: 5,
    category: 'Ethics & Compliance',
    description: 'Prohibits all forms of bribery and corruption in business dealings worldwide.',
  },
  {
    id: '4',
    title: 'Whistleblower Protection Policy',
    department: 'Human Resources',
    owner: 'David Kim',
    version: '1.0',
    lastModified: 'Mar 14, 2024',
    effectiveDate: 'Jun 1, 2024',
    status: 'uploaded',
    step: 1,
    category: 'Ethics & Compliance',
    description: 'Provides protections and safe reporting channels for employees who report workplace misconduct.',
  },
]

export const aiSuggestions = [
  {
    id: 's1',
    type: 'regulation',
    severity: 'high',
    title: 'GDPR Article 13 — Data Collection Transparency',
    section: 'Section 4.2 — Employee Data Collection',
    current: 'Employee data may be collected for operational purposes.',
    suggested: 'Employees must be informed at the time of data collection about the identity of the data controller, the purposes and legal basis for processing, the recipients of the data, and their rights under GDPR Articles 15–22.',
    source: 'EU General Data Protection Regulation (GDPR) Art. 13',
    badge: 'GDPR',
  },
  {
    id: 's2',
    type: 'regulation',
    severity: 'high',
    title: 'SOX Section 302 — Corporate Accountability',
    section: 'Section 7.1 — Financial Disclosures',
    current: 'Senior management is responsible for financial reporting accuracy.',
    suggested: 'The CEO and CFO must personally certify the accuracy of financial reports and disclose any material weaknesses in internal controls. Violations may result in criminal penalties up to $1M fine and 10 years imprisonment.',
    source: 'Sarbanes-Oxley Act Section 302',
    badge: 'SOX',
  },
  {
    id: 's3',
    type: 'lrn',
    severity: 'medium',
    title: 'LRN Best Practice — Scenario-Based Guidance',
    section: 'Section 2.1 — Policy Overview',
    current: 'Employees are expected to act ethically in all business situations.',
    suggested: 'Add concrete scenario examples for common ethical dilemmas specific to your industry. LRN research shows scenario-based policies increase comprehension by 73% and reduce misconduct incidents by 41%.',
    source: 'LRN Ethics & Compliance Program Effectiveness Report 2023',
    badge: 'LRN',
  },
  {
    id: 's4',
    type: 'regulation',
    severity: 'low',
    title: 'FCPA — Foreign Corrupt Practices Act Alignment',
    section: 'Section 8.3 — Third Party Relationships',
    current: 'Third-party vendors must comply with company standards.',
    suggested: 'Explicitly state FCPA obligations for third-party agents: require anti-corruption certifications, conduct due diligence for high-risk jurisdictions, and maintain records of all payments to foreign officials.',
    source: 'Foreign Corrupt Practices Act (FCPA) 15 U.S.C. § 78dd-1',
    badge: 'FCPA',
  },
  {
    id: 's5',
    type: 'lrn',
    severity: 'medium',
    title: 'LRN Best Practice — Plain Language Rewrite',
    section: 'General — All Sections',
    current: 'Policy language uses technical legal terminology throughout.',
    suggested: 'Simplify language to an 8th-grade reading level. LRN data shows plain-language policies have 2.4x higher employee engagement and 89% better recall in post-training assessments.',
    source: 'LRN 2024 Compliance Program Benchmark Study',
    badge: 'LRN',
  },
]

export const versions = [
  {
    id: 'v3',
    version: '2.1',
    date: 'Mar 10, 2024',
    author: 'Sarah Johnson',
    changes: 'Updated Section 4.2 per AI review. Added GDPR Art. 13 compliance clause. Revised whistleblower protections language.',
    isCurrent: true,
  },
  {
    id: 'v2',
    version: '2.0',
    date: 'Jan 15, 2024',
    author: 'Sarah Johnson',
    changes: 'Major revision: Added remote work conduct expectations, updated social media policy, expanded conflict of interest definitions.',
    isCurrent: false,
  },
  {
    id: 'v1',
    version: '1.5',
    date: 'Jul 20, 2023',
    author: 'Robert Martinez',
    changes: 'Minor update: Corrected department references, updated HR contact information.',
    isCurrent: false,
  },
]

export const diffBefore = `4.2 Employee Data Collection

The Company collects and processes employee personal
data for operational purposes. This may include contact
information, employment history, performance records,
and payroll data.

Employees should be aware that this data is used for
legitimate business purposes and is handled with
appropriate confidentiality measures.`

export const diffAfter = `4.2 Employee Data Collection

The Company collects and processes employee personal
data for operational purposes. This may include contact
information, employment history, performance records,
and payroll data.

In accordance with GDPR Article 13, employees are
informed at the time of data collection about:
(a) the identity and contact details of the data
    controller;
(b) the purposes and legal basis for processing;
(c) the recipients or categories of recipients;
(d) their rights under GDPR Articles 15-22, including
    the right to access, rectify, or erase their data.

Employees should be aware that this data is used for
legitimate business purposes and is handled with
appropriate confidentiality measures. Any data retention
beyond the minimum necessary period requires written
approval from the Data Protection Officer.`

export const reviewers = [
  {
    id: 'r1',
    name: 'Amanda Torres',
    role: 'Chief Compliance Officer',
    avatar: 'AT',
    status: 'approved',
    comment: 'The GDPR additions look comprehensive. The explicit Article 13 reference is exactly what we needed. Approved from compliance perspective.',
    date: 'Mar 13, 2024',
  },
  {
    id: 'r2',
    name: 'James Wright',
    role: 'General Counsel',
    avatar: 'JW',
    status: 'approved',
    comment: 'Legally sound. The SOX Section 302 language aligns with our current certifications. Approved.',
    date: 'Mar 14, 2024',
  },
  {
    id: 'r3',
    name: 'Lisa Park',
    role: 'VP Human Resources',
    avatar: 'LP',
    status: 'pending',
    comment: null,
    date: null,
  },
  {
    id: 'r4',
    name: 'Thomas Berg',
    role: 'Head of Internal Audit',
    avatar: 'TB',
    status: 'changes-requested',
    comment: 'Section 7.1 needs clearer escalation paths. Who does an employee contact if their direct manager is implicated? Please clarify before I can approve.',
    date: 'Mar 14, 2024',
  },
]

export const stats = {
  total: 24,
  published: 18,
  inReview: 4,
  pendingUpload: 2,
}

export const recentActivity = [
  { id: 'a1', action: 'Published', policy: 'Anti-Bribery & Corruption Policy', user: 'Amanda Torres', time: '2 hours ago', type: 'publish' },
  { id: 'a2', action: 'Approved', policy: 'Data Privacy Policy', user: 'James Wright', time: '5 hours ago', type: 'approve' },
  { id: 'a3', action: 'AI Review completed', policy: 'Code of Conduct', user: 'System', time: '1 day ago', type: 'ai' },
  { id: 'a4', action: 'Uploaded', policy: 'Whistleblower Protection Policy', user: 'David Kim', time: '2 days ago', type: 'upload' },
  { id: 'a5', action: 'Changes requested', policy: 'Code of Conduct', user: 'Thomas Berg', time: '1 day ago', type: 'changes' },
]

export const policyText = `CODE OF CONDUCT
Version 2.1 | Human Resources Department
Last Modified: March 10, 2024

1. PURPOSE AND SCOPE
This Code of Conduct establishes the standards of
behavior expected of all employees, contractors, and
representatives of the Company. It applies to all
business activities conducted in the office, remotely,
or on behalf of the Company.

2. CORE VALUES
Our Company is committed to integrity, respect, and
transparency. Employees are expected to act ethically
in all business situations and in accordance with
applicable laws and regulations.

3. CONFLICTS OF INTEREST
Employees must avoid situations where personal interests
conflict with those of the Company. Any potential
conflicts must be disclosed to the employee's manager
and HR within 30 days of becoming aware.

4. DATA AND PRIVACY
4.1 Confidential Information
Employees must protect confidential Company information
and may not disclose it to unauthorized parties.

4.2 Employee Data Collection
The Company collects and processes employee personal
data for operational purposes. This may include contact
information, employment history, performance records,
and payroll data.

Employees should be aware that this data is used for
legitimate business purposes and is handled with
appropriate confidentiality measures.

5. WORKPLACE CONDUCT
All employees are entitled to a workplace free from
harassment, discrimination, and bullying. Any violations
must be reported to HR immediately.

6. USE OF COMPANY ASSETS
Company assets, including technology systems, must be
used primarily for business purposes.

7. FINANCIAL INTEGRITY
7.1 Financial Disclosures
Senior management is responsible for financial reporting
accuracy. All financial records must be accurate,
complete, and maintained in accordance with applicable
accounting standards.

8. THIRD PARTIES
8.3 Third Party Relationships
Third-party vendors must comply with company standards
and sign a vendor code of conduct before engagement.

9. REPORTING VIOLATIONS
Employees who become aware of violations should report
them to their manager, HR, or through the anonymous
Ethics Hotline at 1-800-ETHICS-1.`
