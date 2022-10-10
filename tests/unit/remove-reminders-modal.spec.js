import RemoveRemindersModal from '@/components/calendar/components/remove-reminders-modal.vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

describe('RemoveRemindersModal', () => {
  const localVue = createLocalVue()
  document.body.setAttribute('data-app', true)
  let vuetify

  beforeEach(() => {
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
})