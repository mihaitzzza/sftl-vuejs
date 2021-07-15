import { mount } from '@vue/test-utils';
import List from '../List';

describe('List component', () => {
    it('renders a header if any items is provided', () => {
        const wrapper = mount(List, {
            props: {
                items: [],
                isEditable: false,
                editItem: null,
                removeItem: () => {},
                moveItemUp: () => {},
                moveItemDown: () => {},
                checkItem: () => {},
            }
        });

        expect(wrapper.find('h3').text()).toMatch('Please create a list by adding a new item.');
    });

    it('renders a a list for provided items', () => {
        const items = [{
            id: 1,
            name: 'Apples',
            qty: '2 kg',
        }, {
            id: 2,
            name: 'Bananas',
            qty: '1.5 kg',
        }, {
            id: 3,
            name: 'Oranges',
            qty: '1 kg',
        }];

        const wrapper = mount(List, {
            props: {
                items,
                isEditable: false,
                editItem: null,
                removeItem: () => {},
                moveItemUp: () => {},
                moveItemDown: () => {},
                checkItem: () => {},
            }
        });

        const ul = wrapper.find('ul');
        expect(ul.exists()).toBe(true);

        const liElements = ul.findAll('li');

        liElements.forEach((li, index) => {
            expect(li.find('div.item-name').text()).toMatch(items[index].name);
            expect(li.find('div.item-qty').text()).toMatch(items[index].qty);
        });
    });
});
