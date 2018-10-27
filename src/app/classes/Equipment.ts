import IItem from "../interfaces/ItemData";

const totalAvailableSlots: {
  [key: string]: number;
} = {
  body: 1,
  feet: 1,
  hand: 2,
  hands: 1,
  head: 1,
  legs: 1
};

export default class CEquipment {
  items: IItem[];

  constructor(items: IItem[]) {
    this.items = items;
  }

  hasSpace(item: IItem) {
    const type = item.type;
    let availableSlots = totalAvailableSlots[type];

    for (const item of this.items) {
      if (item.type === type) {
        availableSlots -= item.slots;
      }
    }

    return availableSlots >= item.slots;
  }

  removeItemsOfType(type: string) {
    const items = [];

    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];

      if (item.type === type) {
        // Remove the item ad add it to the list
        items.push(this.items.splice(i, 1)[0]);
      }
    }

    return items;
  }

  equip(item: IItem): IItem[] {
    let removedItems: IItem[] = [];

    if (!this.hasSpace(item)) {
      removedItems = this.removeItemsOfType(item.type);
    }

    this.items.push(item);

    return removedItems;
  }

  unequip(item: IItem): IItem[] {
    const index = this.items.indexOf(item);

    if (index === -1) {
      return [];
    }

    return this.items.splice(index, 1);
  }

  get(type: string, slot: number = 1) {
    let slotCount = 1;

    for (const item of this.items) {
      if (item.type === type) {
        if (slot === slotCount) {
          return item;
        } else {
          slotCount += item.slots;
        }
      }
    }

    return null;
  }
}
