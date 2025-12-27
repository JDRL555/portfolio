type Contents = typeof import('../data/site-en.json');

export type Slide = Contents['slide']
export type WhoIAm = Contents['who_i_am'];
export type StackAndPortfolio = Contents['stack_and_portfolio'];
export type Experience = Contents['experience'];
export type ContactToMe = Contents['contact_to_me'];