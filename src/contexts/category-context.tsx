'use client';

import * as React from 'react';

export interface Category {
    category_id: string;
    user_id: string;
    name: string;
}

export interface CategoryContextValue {
    categories: Category[] | null;
    error: string | null;
    isLoading: boolean;
}

export const CategoryContext = React.createContext<CategoryContextValue |
    undefined>(undefined);

export interface CategoryProviderProps {
    children: React.ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps): React.JSX.Element {
    const [state, setState] = React.useState<{ categories: Category[] | null; error: string |
            null; isLoading: boolean}>
    ({
        categories: null,
        error: null,
        isLoading: false
    })

    return <CategoryContext.Provider value={{...state }}>{children}</CategoryContext.Provider>
}

export const CategoryConsumer = CategoryContext.Consumer;

