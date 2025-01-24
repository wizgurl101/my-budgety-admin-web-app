import {CategoryCardProps} from "@/components/CategoryCard/page";
import {categoryCardColours} from "@/constants/colours";

export function getImageUrl(percent: number): string {
    if(percent === 100) {
        return "/images/terriermon-disappointed.jpg"
    }

    if(percent >= 80 && percent < 100) {
        return "/images/terriermon-sad.jpg"
    }

    return "/images/terriermon-happy.jpg"
}

export function getProgressBarColour(percent: number): string {
    if(percent >= 80 && percent < 100) {
        return "orange"
    }

    if(percent === 100) {
        return "red"
    }

    return "green"
}

export function createCategoryCardItems(categories: Category[]): CategoryCardProps[] {
    let categoryCardItems: CategoryCardProps[] = []

    for(let i = 0; i < categories.length; i++) {
        categoryCardItems.push({
            id: categories[i].id,
            name: categories[i].name,
            amount: categories[i].total,
            color: categoryCardColours[i]
        })
    }

    return categoryCardItems
}