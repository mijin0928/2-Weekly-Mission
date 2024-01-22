import { MouseEvent } from 'react';

export function getDateText({ createdAt }: { createdAt: string }) {
  const idx = createdAt.indexOf('T');
  const text = createdAt.slice(0, idx);
  return text;
}

export function getDateInfo({ createdAt }: { createdAt: string }) {
  const createdDate = new Date(createdAt);
  const today = new Date();
  const result = +today - +createdDate;

  const seconds = result / 1000;
  const minites = seconds / 60;
  const hours = minites / 60;
  const months = hours / 24;
  const years = months / 30;

  if (minites < 2) return '1 minites ago';
  if (minites < 60) return `${Math.floor(minites)} minutes ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (months < 30) return `${Math.floor(months)} days ago`;
  if (years < 12) return `${Math.floor(years)} months ago`;
  if (years >= 12) {
    const yearDate = Math.floor(years / 12);
    return yearDate === 1 ? '1 years ago' : `${years} years ago`;
  }
}

export const handleMouseOver = (
  e: MouseEvent<HTMLAnchorElement>,
  isOver: boolean
) => e.currentTarget.classList[isOver ? 'add' : 'remove']('active');
