export const namespaced = true;

export const state = {
  reminders: [],
};

let nextId = 1;
export const mutations = {
  PUSH(state, reminder) {
    state.reminders.push({
      ...reminder,
      id: reminder.id ? reminder.id : nextId++,
    });
  },
  DELETE(state, reminderToRemove) {
    state.reminders = state.reminders.filter(
      (reminder) => reminder.id !== reminderToRemove.id
    );
  },
  UPDATE(state, reminderToUpdate) {
    const stateIndex = state.reminders.findIndex(state => state.id === reminderToUpdate.id)
    state.reminders.splice(stateIndex, 1 ,reminderToUpdate);
  },
};

export const actions = {
  add({ commit }, reminder) {
    commit("PUSH", reminder);
  },
  remove({ commit }, reminderToRemove) {
    commit("DELETE", reminderToRemove);
  },
  update({ commit }, reminderToUpdate) {
    commit("UPDATE", reminderToUpdate);
  },
};

export const getters = {
  getReminderById: (state) => (id) => {
    const foundReminder = state.reminders.find((reminder) => reminder.id === id);
    return foundReminder;
  },
  getRemindersByDate: (state) => (date) => {
    const unorderedReminders = state.reminders.filter((reminder) => reminder.date === date);
    function compare(a, b) {
      const firstTime = parseInt(a.time.replace(':',''));
      const secondTime = parseInt(b.time.replace(':',''));
      if (firstTime >= secondTime) return 1;
      if (secondTime > firstTime) return -1;
      return 0;
    }
    const orderedReminders = unorderedReminders.sort(compare);
    return orderedReminders;
  }
};
