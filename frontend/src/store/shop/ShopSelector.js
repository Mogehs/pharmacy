import { createSelector } from 'reselect';

export const selectAllProducts = (state) => state.shop.allProducts;

export const selectUniqueCategories = createSelector(
    [selectAllProducts],
    (allProducts) => {
        const categories = allProducts.map(p => p.category);
        return ['All', ...Array.from(new Set(categories))];
    }
);
