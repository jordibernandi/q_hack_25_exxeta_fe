import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { CandidateGroup } from './types';


type Cents = number;
type Minutes = number;

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date using dayjs
export function formatDate(date: Date | string, format = 'D MMM, YYYY') {
  return dayjs(date).format(format);
}

// Format time using dayjs
export function formatTime(date: Date | string, format = 'h:mm A') {
  return dayjs(date).format(format);
}

// Format date and time using dayjs
export function formatDateTime(date: Date | string, format = 'D MMM, YYYY h:mm A') {
  return dayjs(date).format(format);
}

// Format currency
export function formatCurrency(amount: Cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
}

// Format duration in minutes
export function formatDuration(minutes: Minutes) {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remainingMinutes} min`;
}

interface ProjectDates {
  startDate?: string | null;
  endDate?: string | null;
}

export const formatProjectDuration = ({ startDate, endDate }: ProjectDates): string => {
  if (!startDate || !endDate) {
    return 'N/A';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date';
  }

  const differenceInMilliseconds = end.getTime() - start.getTime();
  const days = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  const formattedDuration = `${years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}${months > 0 ? `${months} month${months > 1 ? 's' : ''} ` : ''
    }${days > 0 && years === 0 && months === 0 ? `${days} day${days > 1 ? 's' : ''}` : ''}`.trim();

  return formattedDuration || 'Less than a day';
};

export const formatEuro = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) {
    return 'N/A';
  }
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export function isProfileNameDuplicate(
  candidateEmails: CandidateGroup,
  profileName: string,
  currentIndex: number
): boolean {
  if (!candidateEmails || !profileName || currentIndex < 0 || currentIndex >= candidateEmails.length) {
    return false;
  }

  for (let i = 0; i < candidateEmails.length; i++) {
    // Skip the current index
    if (i === currentIndex) {
      continue;
    }

    const currentGroup = candidateEmails[i];
    if (currentGroup) {
      const found = currentGroup.some(
        (candidate) => candidate.profile_name === profileName
      );
      if (found) {
        return true; // Found a duplicate in another group
      }
    }
  }

  return false; // No duplicates found in other groups
}

export function isProfileNameInCurrentIndex(
  candidateEmails: CandidateGroup,
  profileName: string,
  currentIndex: number
): boolean {
  if (!candidateEmails || !profileName || currentIndex < 0 || currentIndex >= candidateEmails.length) {
    return false; // Handle invalid input
  }

  const currentGroup = candidateEmails[currentIndex];
  if (!currentGroup) {
    return false; // The array at currentIndex might be empty or undefined
  }

  return currentGroup.some((candidate) => candidate.profile_name === profileName);
}