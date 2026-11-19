import { ProcessGuide, Source } from '../types';

export const OFFICIAL_SOURCES: Source[] = [
  {
    id: 'src-nch',
    title: 'National Consumer Helpline (NCH)',
    url: 'https://consumerhelpline.gov.in/',
    jurisdiction: 'India (National)',
    publisher: 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food and Public Distribution, Government of India',
    last_reviewed_at: '2025-01-15',
    description: 'Government initiative to advise, guide and redress consumer grievances directly with registered convergence partner companies.',
    official_disclaimer: 'Independent public grievance portal. CLEARPATH has no official affiliation or endorsement with the National Consumer Helpline.'
  },
  {
    id: 'src-ejagriti',
    title: 'e-Jagriti (Consumer Commission Portal)',
    url: 'https://e-jagriti.gov.in/',
    jurisdiction: 'India (National / State / District Commissions)',
    publisher: 'National Consumer Disputes Redressal Commission (NCDRC), Government of India',
    last_reviewed_at: '2025-01-10',
    description: 'Online portal for filing consumer complaints before District, State, and National Consumer Dispute Redressal Commissions under the Consumer Protection Act, 2019.',
    official_disclaimer: 'Official judicial e-filing portal. Filing through e-Jagriti is a formal legal dispute filing. CLEARPATH does not file legal claims on behalf of users.'
  },
  {
    id: 'src-cpgrams',
    title: 'Centralized Public Grievance Redress and Monitoring System (CPGRAMS)',
    url: 'https://pgportal.gov.in/',
    jurisdiction: 'India (Central & State Government Entities)',
    publisher: 'Department of Administrative Reforms and Public Grievances (DARPG), Government of India',
    last_reviewed_at: '2025-01-20',
    description: 'Portal for citizens to lodge grievances pertaining to Central Ministries, Departments, and participating State Government organizations.',
    official_disclaimer: 'Public administration grievance platform. CLEARPATH provides informational links only and does not process official government submissions.'
  },
  {
    id: 'src-cpa2019',
    title: 'Consumer Protection Act, 2019',
    url: 'https://consumeraffairs.nic.in/acts-and-rules/consumer-protection',
    jurisdiction: 'India',
    publisher: 'Ministry of Consumer Affairs, Government of India',
    last_reviewed_at: '2024-11-30',
    description: 'Primary legislation governing consumer rights, product liability, unfair contract terms, and dispute redressal forums in India.',
    official_disclaimer: 'Statutory reference for informational purposes. This summary does not constitute formal legal counsel.'
  }
];

export const PROCESS_GUIDES: ProcessGuide[] = [
  {
    id: 'guide-delayed-delivery',
    category: 'delayed_delivery',
    title: 'Delayed Online Order or Shipment Delivery',
    badge: 'E-Commerce / Delivery',
    summary: 'A structured approach to trace missing consignments, request formal timeline commitments, and escalate through merchant channels.',
    what_it_means: 'When an e-commerce platform or vendor confirms an estimated delivery window that passes without delivery or tracking updates, having an unbroken chain of documentation (order acknowledgment, courier tracking AWB, and timestamped customer service tickets) is the most effective way to secure expedited delivery or cancellation with refund.',
    key_checklist: [
      'Order confirmation email or SMS with Order ID and date',
      'Air Waybill (AWB) or tracking number and courier partner name',
      'Screenshots of estimated delivery date originally committed',
      'Screenshots of current status from tracking portal',
      'Records of any prior customer support tickets or chats'
    ],
    first_steps: [
      {
        step: 1,
        title: 'Check Carrier Status & Internal Delays',
        description: 'Verify if the tracking number reflects seller dispatch or if it is stuck at a hub/customs checkpoint. Take a timestamped screenshot.',
        tips: 'Identify whether the merchant is an intermediary marketplace or the direct seller.'
      },
      {
        step: 2,
        title: 'Send a Formal Written Inquiry via Primary Support Channel',
        description: 'Submit an in-app ticket or formal email quoting your Order ID, tracking number, and the elapsed timeline. Request a definite updated delivery date or cancellation option.',
        tips: 'Keep the tone polite, concise, and reference previous ticket IDs if applicable.'
      },
      {
        step: 3,
        title: 'Issue a 48-72 Hour Follow-Up with Resolution Choice',
        description: 'If no substantive response is received, send a polite follow-up stating that if dispatch cannot be verified within a reasonable window, you request an immediate cancellation and credit note/refund.',
        tips: 'Avoid aggressive language; a clear factual timeline gets faster resolution from escalation managers.'
      }
    ],
    escalation_path: [
      {
        authority: 'Merchant Grievance Officer',
        portal_name: 'Appointed Company Grievance Redressal Officer (Mandated under Consumer Protection E-Commerce Rules)',
        url: '',
        when_to_use: 'When primary frontline customer support fails to provide a resolution within 48-72 hours.',
        note: 'Check the footer or terms page of the e-commerce website for the Grievance Officer email and designation.'
      },
      {
        authority: 'National Consumer Helpline',
        portal_name: 'consumerhelpline.gov.in / Call 1915',
        url: 'https://consumerhelpline.gov.in/',
        when_to_use: 'When the company is registered as a Convergence Partner and fails to respond to internal escalation.',
        note: 'NCH facilitates docket-based resolution directly with registered brands.'
      }
    ],
    official_sources: [
      {
        name: 'Consumer Protection (E-Commerce) Rules, 2020',
        url: 'https://consumeraffairs.nic.in/',
        publisher: 'Ministry of Consumer Affairs',
        last_reviewed: '2024-12-01'
      },
      {
        name: 'National Consumer Helpline Portal',
        url: 'https://consumerhelpline.gov.in/',
        publisher: 'Dept of Consumer Affairs',
        last_reviewed: '2025-01-15'
      }
    ],
    last_reviewed_at: '2025-01-15'
  },
  {
    id: 'guide-refund-followup',
    category: 'refund_follow_up',
    title: 'Pending or Delayed Refund Follow-Up',
    badge: 'Banking & Payments',
    summary: 'Track return validations, banking transaction reference numbers (RRN/UTR), and merchant payment reconciliations.',
    what_it_means: 'Refunds generally involve two stages: the merchant approving and initiating the reversal, and the payment gateway/bank processing the funds back to the original source. Identifying where the transfer is pending is key to reaching the right team.',
    key_checklist: [
      'Return pickup receipt or return confirmation email',
      'Merchant refund initiation email or message showing the refund amount',
      'Bank statement showing the original deduction and absence of credit',
      'Transaction Reference Number (ARN / RRN / UTR) if provided by seller'
    ],
    first_steps: [
      {
        step: 1,
        title: 'Request the Bank Reference Number (ARN or UTR)',
        description: 'Ask the merchant customer support specifically for the Acquirer Reference Number (ARN) for cards or UTR for UPI/IMPS. This proves funds left their gateway.',
        tips: 'Without an ARN or UTR, your own bank cannot trace an incoming refund credit.'
      },
      {
        step: 2,
        title: 'Cross-Verify with Your Bank or Card Issuer',
        description: 'Provide the ARN/UTR to your bank or card customer service to check if the incoming transaction is under settlement or reversal hold.',
        tips: 'Banks usually take 3 to 7 business days for electronic clearing of card reversals.'
      },
      {
        step: 3,
        title: 'Formal Reconciliation Letter',
        description: 'If the merchant failed to provide a valid reference after stated turnaround time, submit a formal dispute with bank proof.',
        tips: 'Attach your statement snippet showing zero credit received.'
      }
    ],
    escalation_path: [
      {
        authority: 'Merchant Nodal Officer',
        portal_name: 'Appointed Principal Nodal Officer',
        url: '',
        when_to_use: 'When refund is promised but no banking reference or credit occurs after 7-10 business days.',
        note: 'Escalate to the nodal email address with all prior ticket numbers.'
      },
      {
        authority: 'Bank Chargeback / Disputed Transaction Form',
        portal_name: 'Your Card-Issuing Bank / UPI App Dispute',
        url: '',
        when_to_use: 'If payment was debited, merchant cancelled order or received return, but refuses refund.',
        note: 'Submit chargeback documentation under Visa / Mastercard / RuPay dispute codes within applicable card scheme deadlines.'
      }
    ],
    official_sources: [
      {
        name: 'RBI Guidelines on Turnaround Time (TAT) and Harmonisation of Customer Compensation',
        url: 'https://www.rbi.org.in/',
        publisher: 'Reserve Bank of India',
        last_reviewed: '2024-10-15'
      }
    ],
    last_reviewed_at: '2025-01-10'
  },
  {
    id: 'guide-warranty-repair',
    category: 'warranty_repair',
    title: 'Product Warranty & Authorized Service Follow-Up',
    badge: 'Hardware & Electronics',
    summary: 'Document repair job sheets, diagnostic reports, repeat hardware defects, and manufacturer commitments.',
    what_it_means: 'Authorized service centers handle repairs under manufacturer warranties. Having the original tax invoice, clear job sheets detailing technician remarks, and itemized part status is critical if repeat failures occur or replacement is sought.',
    key_checklist: [
      'Original purchase tax invoice showing Serial / IMEI Number',
      'Manufacturer warranty card or registered warranty certificate',
      'Authorized Service Centre Job Sheet / Work Order number',
      'Clear photos or short videos demonstrating the defect',
      'Written notes of technician statements or part delay notices'
    ],
    first_steps: [
      {
        step: 1,
        title: 'Collect Detailed Job Sheet with Defect Notation',
        description: 'Ensure the authorized technician notes the exact symptom you described on the formal printed job sheet before handing over the device.',
        tips: 'Do not accept a generic description like "device check". Insist on specific defect logging.'
      },
      {
        step: 2,
        title: 'Track Stated Turnaround Time (SLA)',
        description: 'Most consumer hardware brands specify 7 to 14 days for spare parts procurement and repairs. Request updates referencing the Job Sheet number.',
        tips: 'Ask for specific part status if waiting on backordered components.'
      },
      {
        step: 3,
        title: 'Request Product Replacement or Authorized Certificate',
        description: 'If the repair fails repeatedly for the identical defect, or if parts are unavailable beyond reasonable timeframe, request replacement or commercial credit note.',
        tips: 'Maintain copies of all previous job sheets demonstrating repeated visits.'
      }
    ],
    escalation_path: [
      {
        authority: 'Manufacturer Regional Service Head / Escalation Desk',
        portal_name: 'Brand Consumer Care Head',
        url: '',
        when_to_use: 'When local service centre holds product without progress or disputes legitimate warranty.',
        note: 'Send an email with scanned job sheets to the manufacturer corporate care.'
      },
      {
        authority: 'National Consumer Helpline (NCH)',
        portal_name: 'consumerhelpline.gov.in',
        url: 'https://consumerhelpline.gov.in/',
        when_to_use: 'If brand ignores warranty terms or charges for in-warranty manufacturing defects.',
        note: 'NCH logs complaints for defective goods under the Consumer Protection Act.'
      }
    ],
    official_sources: [
      {
        name: 'Consumer Protection Act, 2019 - Product Liability Chapter VI',
        url: 'https://consumeraffairs.nic.in/',
        publisher: 'Department of Consumer Affairs',
        last_reviewed: '2024-11-20'
      }
    ],
    last_reviewed_at: '2025-01-12'
  },
  {
    id: 'guide-service-complaints',
    category: 'service_complaint',
    title: 'Service Provider & Utility Complaints',
    badge: 'Telecom / Utilities / Subscriptions',
    summary: 'Address recurring service outages, unresolved billing discrepancies, and provider contractual commitments.',
    what_it_means: 'Service agreements typically specify uptime commitments, response times, and billing cycles. Documenting service outage intervals and ticket numbers provides empirical evidence when requesting billing adjustments or service termination without penalty.',
    key_checklist: [
      'Account / Subscriber ID and registered mobile number',
      'Service agreement or monthly invoices',
      'Log of outage dates, hours, and speed/connectivity test records',
      'Docket numbers generated for each customer service call or ticket'
    ],
    first_steps: [
      {
        step: 1,
        title: 'Generate Formal Docket Number for Every Incident',
        description: 'Every time service fails, contact support to log a formal service ticket. Note down the unique docket number and agent identifier.',
        tips: 'Informal verbal complaints without a recorded docket cannot be cited in escalations.'
      },
      {
        step: 2,
        title: 'Submit Consolidated Written Summary',
        description: 'Compile the dates, downtime duration, and ticket numbers into a concise chronological email to the service manager.',
        tips: 'Request a proportional credit adjustment on the upcoming invoice for verifiable downtime.'
      },
      {
        step: 3,
        title: 'Formal Notice of Contractual Deficiency',
        description: 'If service remains persistently degraded without corrective action, submit a formal request for waiver of exit fees or termination.',
        tips: 'Maintain copies of all communications.'
      }
    ],
    escalation_path: [
      {
        authority: 'Appellate Authority of Service Provider',
        portal_name: 'Appointed Appellate Authority (e.g. Telecom Regulations)',
        url: '',
        when_to_use: 'When the complaint remains unresolved past the specified resolution timeframe.',
        note: 'Regulated providers (such as telecom) have designated Appellate Authorities with fixed review periods.'
      },
      {
        authority: 'CPGRAMS (For Central / Public Sector Providers)',
        portal_name: 'pgportal.gov.in',
        url: 'https://pgportal.gov.in/',
        when_to_use: 'For grievances involving public sector undertakings or state service authorities.',
        note: 'CPGRAMS monitors public sector grievance turnaround.'
      }
    ],
    official_sources: [
      {
        name: 'Telecom Regulatory Authority of India (TRAI) Quality of Service Regulations',
        url: 'https://www.trai.gov.in/',
        publisher: 'TRAI',
        last_reviewed: '2024-12-10'
      }
    ],
    last_reviewed_at: '2025-01-18'
  },
  {
    id: 'guide-supplier-delays',
    category: 'supplier_issue',
    title: 'Small Business Supplier & B2B Delays',
    badge: 'Small Business / Commercial',
    summary: 'Manage commercial supply chain delays, purchase order non-performance, and commercial notice workflows.',
    what_it_means: 'In B2B commercial relationships, disputes often arise from ambiguity around delivery milestones, revised delivery dates without written confirmation, or quality variances. Establishing written PO revisions and mutually confirmed milestones minimizes commercial loss.',
    key_checklist: [
      'Purchase Order (PO) with signed terms and delivery dates',
      'Proof of advance payment or proforma invoice receipt',
      'Mutual email acknowledgments of specifications and milestones',
      'Log of written follow-ups and supplier explanations'
    ],
    first_steps: [
      {
        step: 1,
        title: 'Audit the Commercial Purchase Order Terms',
        description: 'Review the delivery clause, grace periods, force majeure provisions, and milestone acceptance criteria in the signed agreement or PO.',
        tips: 'Verify whether late delivery penalties or liquidated damages clauses were contractually agreed.'
      },
      {
        step: 2,
        title: 'Issue a Milestone Reconciliation Notice',
        description: 'Send a formal written notice to the vendor key account manager detailing the overdue milestone and requesting a confirmed production schedule within 3 business days.',
        tips: 'Keep the tone commercially cooperative while establishing firm written milestones.'
      },
      {
        step: 3,
        title: 'Commercial Escalation or Alternative Procurement Notice',
        description: 'If the supplier cannot commit to delivery, inform them in writing of the commercial necessity to seek alternative procurement or cancel the order.',
        tips: 'Ensure all prior advance payments are reconciled in writing.'
      }
    ],
    escalation_path: [
      {
        authority: 'MSME Samadhaan (For Registered Micro & Small Enterprises)',
        portal_name: 'samadhaan.msme.gov.in',
        url: 'https://samadhaan.msme.gov.in/',
        when_to_use: 'When a buyer fails to pay a registered MSME supplier within statutory limits (informational note for small businesses).',
        note: 'Applies to registered MSME suppliers seeking delayed payment redressal under the MSMED Act.'
      },
      {
        authority: 'Commercial Mediation or Legal Counsel',
        portal_name: 'Private Commercial Mediation',
        url: '',
        when_to_use: 'For significant business contract disputes where amicable commercial negotiation fails.',
        note: 'CLEARPATH does not provide commercial arbitration or legal counsel.'
      }
    ],
    official_sources: [
      {
        name: 'MSME Development Act, 2006 & Samadhaan Portal',
        url: 'https://samadhaan.msme.gov.in/',
        publisher: 'Ministry of Micro, Small and Medium Enterprises',
        last_reviewed: '2024-11-15'
      }
    ],
    last_reviewed_at: '2025-01-20'
  }
];
