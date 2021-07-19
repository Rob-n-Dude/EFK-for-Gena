import { allCard, CategoryInfo } from '../public/cards';
// import { Category } from "./category";

const allCategorys: CategoryInfo[] = allCard;

const getIDCategory = (id: number) => allCategorys.find((cat) => cat.categoryId === id);
const getCategoryIndex = (id: number) => allCategorys.findIndex((cat) => cat.categoryId === id);

export function getCategories(): Promise<CategoryInfo[]> {
  return Promise.resolve<CategoryInfo[]>(allCategorys);
}

export function getCategoryById(categoryId: number): Promise<CategoryInfo | undefined> {
  return Promise.resolve(getIDCategory(categoryId));
}

export function createCategory(category: CategoryInfo): Promise<CategoryInfo> {
  const isExist = typeof allCategorys
    .find((cat) => cat.categoryName.toLowerCase() === category.categoryName.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Category with name ${category.categoryName} is already exists`));
  }

  const categoryId = allCategorys.length + 1;
  const model = { ...category, categoryId };
  allCategorys.push(model);

  return Promise.resolve(model);
}

export function deleteCategory(id: number): Promise<void> {
  const index = getCategoryIndex(id);
  if (index < 0) {
    Promise.reject(new Error('Category not found'));
  }
  allCategorys.splice(index, 1);
  return Promise.resolve();
}

export function updateCategory(category: CategoryInfo): Promise<CategoryInfo> {
  const index = getCategoryIndex(category.categoryId);
  if (index < 0) {
    return Promise.reject(new Error('Item not found'));
  }
  const existsItem = allCategorys.splice(getCategoryIndex(category.categoryId), 1)[0];
  const newItem: CategoryInfo = {
    ...existsItem,
    ...category,
  };
  allCategorys.push(newItem);
  return Promise.resolve(newItem);
}
