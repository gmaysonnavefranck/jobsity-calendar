export const namespaced = true;

export const state = {
  reminders: [],
};

let nextId = 1;
export const mutations = {
  PUSH(state, reminder) {
    state.reminders.push({
      ...reminder,
      id: nextId++,
    });
  },
  DELETE(state, reminderToRemove) {
    state.reminders = state.reminders.filter(
      (reminder) => reminder.id !== reminderToRemove.id
    );
  },
  UPDATE(state, reminderToUpdate) {
    const stateIndex = state.reminders.findIndex(state => state.id === reminderToUpdate.id)
    state.reminders[stateIndex] = reminderToUpdate;
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
    return state.reminders.find((reminder) => reminder.id === id);
  },
  getRemindersByMonth: (state) => (month) => {
    return state.reminders.find((reminder) => reminder.date.split('-')[1].toString() === month.toString())
  }
};
