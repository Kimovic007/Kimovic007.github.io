export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type MissionHighlight = {
  title: string;
  description: string;
  iconPath: string;
  iconColorClass: string;
  iconBgClass: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Veterinary Advisor',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
    bio: 'Licensed veterinarian with 15+ years of experience in pet nutrition and wellness.'
  },
  {
    name: 'Emily Chen',
    role: 'Feline Behaviorist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'Certified cat behavior consultant helping owners understand their feline friends.'
  },
  {
    name: 'Michael Torres',
    role: 'Dog Training Expert',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'CPDT-KA certified trainer with expertise in positive reinforcement training methods.'
  },
  {
    name: 'Jessica Williams',
    role: 'Product Review Lead',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    bio: 'Pet product enthusiast who rigorously tests every item we recommend.'
  }
];

export const missionHighlights: MissionHighlight[] = [
  {
    title: 'Expert-Reviewed',
    description: 'All content is reviewed by veterinary professionals.',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColorClass: 'text-forest-green',
    iconBgClass: 'bg-alabaster'
  },
  {
    title: 'Pet-First Approach',
    description: "Your pet's wellbeing is always our top priority.",
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    iconColorClass: 'text-champagne',
    iconBgClass: 'bg-forest-green'
  },
  {
    title: 'Honest Reviews',
    description: 'We only recommend products we would use ourselves.',
    iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColorClass: 'text-warm-taupe',
    iconBgClass: 'bg-alabaster'
  }
];
