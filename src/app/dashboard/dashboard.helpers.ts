import { CategoryCardProps } from '@/components/CategoryCard/page';
import { categoryCardColours } from '@/constants/colours';

export function getImageUrl(percent: number): string {
  if (percent === 100) {
    return '/images/terriermon-disappointed.jpg';
  }

  if (percent >= 80 && percent < 100) {
    return '/images/terriermon-sad.jpg';
  }

  return '/images/terriermon-happy.jpg';
}

export function getProgressBarColour(percent: number): string {
  if (percent >= 80 && percent < 100) {
    return '#FF9D23';
  }

  if (percent === 100) {
    return '#FF2929';
  }

  return '#5D8736';
}

export function createCategoryCardItems(
  categories: any[]
): CategoryCardProps[] {
  let categoryCardItems: CategoryCardProps[] = [];

  for (let i = 0; i < categories.length; i++) {
    categoryCardItems.push({
      id: i,
      name: categories[i].name,
      amount: categories[i].total,
      color: categoryCardColours[i],
    });
  }

  return categoryCardItems;
}
