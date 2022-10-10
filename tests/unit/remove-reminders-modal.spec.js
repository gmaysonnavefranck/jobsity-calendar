import RemoveRemindersModal from '@/components/calendar/components/remove-reminders-modal.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from '@/store'
import { mount, createLocalVue } from '@vue/test-utils'

describe('RemoveRemindersModal', () => {
  const localVue = createLocalVue()
  document.body.setAttribute('data-app', true)
  let vuetify

  beforeEach(() => {
    localVue.use(Vuex)
    vuetify = new Vuetify()
  })

  it('If there is only one reminder, text to confirm should say so.', async () => {
    const wrapper = mount(RemoveRemindersModal,{
      vuetify,
      localVue,
      propsData: {
        value: true,
        reminders: ['reminder']
      }
    });

    await wrapper.vm.$nextTick();
    const spanSingleReminder = wrapper.find('[data-testid="span-single-reminder"]')
    const spanMultipleReminders = wrapper.find('[data-testid="span-multiple-reminders"]')
    expect(spanMultipleReminders.exists()).toBe(false)
    expect(spanSingleReminder.text()).toBe('to delete this reminder?')
  })

  it('If there is more than one reminder, text to confirm should say so.', async () => {
    const wrapper = mount(RemoveRemindersModal,{
      vuetify,
      localVue,
      propsData: {
        value: true,
        reminders: ['reminder', 'reminder2']
      }
    });

    await wrapper.vm.$nextTick();
    const spanSingleReminder = wrapper.find('[data-testid="span-single-reminder"]')
    const spanMultipleReminders = wrapper.find('[data-testid="span-multiple-reminders"]')

    expect(spanSingleReminder.exists()).toBe(false)
    expect(spanMultipleReminders.text()).toBe('to delete all the reminders?')
  })

  it('Deleting reminders should remove them from the state.', async () => {
    const reminder = {
      reminder: 'test',
      date: '2022-10-01',
      time: '10:10',
      id: 1,
      city: 'test',
      weather: 'The weather will be overcast clouds!',
      color: '#FFFFFF'
    }
    const wrapper = mount(RemoveRemindersModal,{
      store,
      vuetify,
      localVue,
      propsData: {
        value: true,
        reminders: [reminder] 
      }
    });

    store.state.reminder.reminders = [reminder]

    const deleteButton = wrapper.find('[data-testid="delete-button"]')

    expect(store.state.reminder.reminders).toEqual([
      {
        reminder: 'test',
        date: '2022-10-01',
        id: 1,
        time: '10:10',
        city: 'test',
        weather: 'The weather will be overcast clouds!',
        color: '#FFFFFF'
      }
    ])
    await deleteButton.trigger('click')
    await wrapper.vm.$nextTick();

    expect(store.state.reminder.reminders).toEqual([])
  })
})