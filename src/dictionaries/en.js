// src/dictionaries/en.js
export const dictionary = {
  home: {
    heroTitle: "Connecting Exceptional Talent with Leading Companies",
    heroSubtitle: "Your next professional opportunity is just a search away.",
    searchPlaceholder: "Job title or keyword",
    locationPlaceholder: "City or zip code",
    searchButton: "Search Jobs",
    companiesTitle: "Find the Talent Your Company Needs",
    companiesDescription: "Post your job openings with us and access a network of qualified professionals ready to work. We simplify your hiring process.",
    companiesButton: "Post a Job",
    tipsTitle: "Resources to Boost Your Career",
    tip1Title: "Optimize Your Resume",
    tip1Description: "Learn how to highlight your skills and experience to capture recruiters' attention.",
    tip2Title: "Prepare for the Interview",
    tip2Description: "Practical tips to answer with confidence and demonstrate your value.",
    tip3Title: "Salary Negotiation",
    tip3Description: "Understand the keys to negotiating a fair salary that matches your profile.",
    contactTitle: "Have Questions?",
    contactDescription: "Our team is ready to help you find the perfect solution.",
    contactButton: "Contact Us",
    moreInfoButton: "More Info",
    findTalentButton: "Find Your Candidate",
    
    // New keys for the expanded resources page
    resourcesPageTitle: "Boost Your Career with Our Exclusive Resources",
    resourcesPageSubtitle: "From perfecting your resume to mastering the interview, we support you every step of the way to find your ideal job.",
    
    cvSectionTitle: "Optimize Your Resume and Cover Letter",
    cvSectionDesc: "Learn how to create documents that capture recruiters' attention and open doors to new opportunities.",
    cvTip1: "How to structure an impactful resume",
    cvTip2: "Keywords that get you noticed by recruiters",
    cvTip3: "Winning cover letter templates",
    
    interviewSectionTitle: "Prepare for Interview Success",
    interviewSectionDesc: "Confidence is key. With our guides, you'll be ready for any question and leave a memorable impression.",
    interviewTip1: "Common questions and answers",
    interviewTip2: "Tips for virtual interviews",
    interviewTip3: "How to effectively negotiate your salary",
    
    hiringSectionTitle: "Tips for the Hiring Process",
    hiringSectionDesc: "We guide you through the final steps to make the transition to your new job as smooth as possible.",
    hiringTip1: "Understanding job offers",
    hiringTip2: "Essential documents and procedures",
    hiringTip3: "First weeks: how to excel in your new role",
    
    startSearching: "Start searching for jobs",
    browseJobs: "Explore all openings",
  },
  jobs: {
    showingResults: "Showing {start}-{end} of {total} jobs",
    sort: "Sort by:",
    mostRelevant: "Most Relevant",
    mostRecent: "Most Recent",
    highestSalary: "Salary (Highest First)",
    titleAZ: "Title (A-Z)",
  },
  companiesPage: {
    heroTitle: "The Strategic Partner for Your Workforce",
    heroSubtitle: "Access a network of qualified professionals ready to boost your projects. We handle the recruiting, so you can focus on growth.",
    processTitle: "Our Simplified Process",
    processStep1Title: "Needs Analysis",
    processStep1Desc: "We meet with you to thoroughly understand the technical and cultural requirements of your team.",
    processStep2Title: "Selection & Vetting",
    processStep2Desc: "Our recruitment team filters, interviews, and verifies the best candidates from our network.",
    processStep3Title: "Integration & Support",
    processStep3Desc: "We present the finalists and facilitate a smooth hiring process with continuous follow-up.",
    testimonialsTitle: "What Our Clients Say",
    testimonial1: "WG Labor revolutionized our hiring process. We found qualified staff in record time. Their professionalism is unmatched.",
    testimonial1Author: "Sun Construction Co.",
    testimonial2: "The flexibility and quality of the candidates they provided exceeded our expectations. They are a key partner for our production peaks.",
    testimonial2Author: "Express Logistics",
    testimonial3: "Since working with them, our staff turnover has decreased significantly. They understand our needs perfectly.",
    testimonial3Author: "Paradise Hotel Cancun",
    formTitle: "Ready to build your ideal team?",
    formSubtitle: "Leave us your details, and a specialist will contact you shortly."
  },
  footer: {
    adminLogin: "Admin Login",
  },
  resourcesPage: {
    heroTitle: "Boost Your Career with Our Resources",
    heroSubtitle: "From perfecting your resume to mastering the interview, we support you every step of the way.",
    tips: [
      {
        id: 1,
        title: "Optimize Your CV and Cover Letter",
        description: "Learn to create documents that capture recruiters' attention and open doors to new opportunities.",
        iconName: 'FaFileAlt',
        imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1770',
        readMore: "Read More",
        extendedContent: {
          heading1: "Key Points:",
          points1: [
            "Tailor Your CV: Customize your CV for each application, highlighting the most relevant experience and skills.",
            "Use Keywords: Integrate terms from the job description to pass through automated filters (ATS).",
            "Quantify Achievements: Instead of 'Responsible for sales,' use 'Increased sales by 15% in 6 months.' Numbers are powerful."
          ],
          heading2: "Action Verbs to Impress:",
          paragraph1: "Use words like: Led, Optimized, Implemented, Increased, Developed, Managed, Created."
        }
      },
      {
        id: 2,
        title: "Prepare for Success in Your Interviews",
        description: "Confidence is key. With our guides, you'll be ready for any question and leave a memorable impression.",
        iconName: 'FaUserTie',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770',
        readMore: "Read More",
        extendedContent: {
          heading1: "Preparation Phases:",
          points1: [
            "Research: Know the company, its culture, products, and your interviewer. Show genuine interest.",
            "Practice (STAR Method): Prepare answers using the Situation, Task, Action, Result method. It's ideal for behavioral questions.",
            "Prepare Smart Questions: Have 2-3 questions ready that show your interest in the role, the team, or the company."
          ]
        }
      },
      {
        id: 3,
        title: "Tips for the Hiring Process",
        description: "We guide you through the final steps to make the transition to your new job as smooth as possible.",
        iconName: 'FaHandshake',
        imageUrl: '/tip-3.webp',
        readMore: "Read More",
        extendedContent: {
          heading1: "Final Checklist:",
          points1: [
            "Understand the Offer: Analyze the salary, benefits, responsibilities, and growth opportunities.",
            "Negotiation: Know your market value. Don't be afraid to negotiate, but do it professionally and with justification.",
            "Onboarding: During your first weeks, focus on learning, getting to know your team, and showing a proactive attitude."
          ],
          heading2: "Mistakes to Avoid:",
          paragraph1: "Don't stop asking questions, don't criticize previous employers, and don't forget to send a thank-you note."
        }
      }
    ]
  }
};