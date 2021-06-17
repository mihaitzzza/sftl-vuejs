import { createStore } from 'vuex'

const getInitialShoppingList = () => ({
  id: new Date().getTime(),
  items: [],
});

const getListsFromLocalStorage = () => {
  const lsLists = window.localStorage.getItem('lists');

  if (lsLists) {
    return JSON.parse(lsLists);
  }

  return [];
};

const getFavouriteList = () => {
  const favouriteList = window.localStorage.getItem('favourite_list');

  if (favouriteList) {
    return JSON.parse(favouriteList);
  }

  return getListsFromLocalStorage()[0];
}

export default createStore({
  state: {
    shoppingList: getInitialShoppingList(),
    lists: getListsFromLocalStorage(),
    favouriteList: getFavouriteList(),
  },
  mutations: {
    addShoppingListItem: (state, { item }) => {
      state.shoppingList.items.push({
        ...item,
        id: new Date().getTime(),
        checked: false,
      })
    },
    updateShoppingListItem: (state, { index, item }) => {
      state.shoppingList.items[index] = { ...item };
    },
    removeShoppingListItem: (state, { index }) => {
      state.shoppingList.items = [
        ...state.shoppingList.items.slice(0, index),
        ...state.shoppingList.items.slice(index + 1),
      ];
    },
    moveShoppingListItemUp: (state, { item }) => {
      const itemIndex = state.shoppingList.items.indexOf(item);

      if (itemIndex > 0) {
        const prevItem = state.shoppingList.items[itemIndex - 1];
        state.shoppingList.items[itemIndex - 1] = item;
        state.shoppingList.items[itemIndex] = prevItem;
      }
    },
    moveShoppingListItemDown: (state, { item }) => {
      const itemIndex = state.shoppingList.items.indexOf(item);

      if (itemIndex < state.shoppingList.items.length - 1) {
        const nextItem = state.shoppingList.items[itemIndex + 1];
        state.shoppingList.items[itemIndex + 1] = item;
        state.shoppingList.items[itemIndex] = nextItem;
      }
    },
    resetShoppingList: (state) => {
      state.shoppingList.items = [];
    },
    createShoppingList: (state, { name }) => {
      state.lists.push({
        ...state.shoppingList,
        name,
      });
      state.shoppingList = getInitialShoppingList();
      window.localStorage.setItem('lists', JSON.stringify(state.lists));
    },
    removeList: (state, { list }) => {
      const index = state.lists.indexOf(list);
      state.lists = [
        ...state.lists.slice(0, index),
        ...state.lists.slice(index + 1),
      ];
      window.localStorage.setItem('lists', JSON.stringify(state.lists));

      if (list.id === state.favouriteList.id) {
        if (state.lists.length > 0) {
          state.favouriteList = state.lists[0];
          window.localStorage.setItem('favourite_list', JSON.stringify(state.favouriteList));
        } else {
          state.favouriteList = null;
          window.localStorage.removeItem('favourite_list');
        }
      }
    },
    setShoppingList: (state, { list }) => {
      state.shoppingList = { ...list };
    },
    updateShoppingList: (state) => {
      const index = state.lists.findIndex(list => list.id === state.shoppingList.id);

      if (index !== -1) {
        state.lists = [
          ...state.lists.slice(0, index),
          state.shoppingList,
          ...state.lists.slice(index + 1),
        ];
        state.shoppingList = getInitialShoppingList();
        window.localStorage.setItem('lists', JSON.stringify(state.lists));
      }
    },
    updateShoppingListName: (state, { name }) => {
      state.shoppingList.name = name;
    },
    markListAsFavourite: (state, { list }) => {
      state.favouriteList = list;
      window.localStorage.setItem('favourite_list', JSON.stringify(list));
    },
    checkListItem: (state, { listId, item }) => {
      const list = state.lists.find(list => list.id === listId);

      if (list) {
        const itemToUpdate = list.items.find(i => i.id === item.id);
        itemToUpdate && (itemToUpdate.checked = !itemToUpdate.checked);

        if (list.id === state.favouriteList.id) {
          state.favouriteList = list;
          window.localStorage.setItem('favourite_list', JSON.stringify(list));
        }

        window.localStorage.setItem('lists', JSON.stringify(state.lists));
      }

      console.log('state', state.favouriteList.items[0].checked);
    },
  },
  actions: {
  },
  modules: {
  }
});
