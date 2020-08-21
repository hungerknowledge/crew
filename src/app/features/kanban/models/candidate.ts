export interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    picture: string;
    job: string;
    location: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    quora?: string;
    medium?: string;
    stackOverflow?: string;
    dribble?: string;
    website?: string;
    tags: string[];
    stage: CandidateStage;
}

export enum CandidateStage {
    new = '✨ New',
    offerSent = '📝 Offer Sent',
    onsiteInterview = '🤝 Onsite Interview',
    notNow = '⏰ Not Now',
    rejected = '⛔ Rejected',
    hired = '🍾 Hired',
    contacted = '👻 Contacted',
    phoneScreen = '📞 Phone Screen'
}
