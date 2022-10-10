import RemoveRemindersModal from '@/components/calendar/components/remove-reminders-modal.vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

describe('RemoveRemindersModal', () => {
  const localVue = createLocalVue()
  let vuetify
  localVue.use(Vuetify)

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
    expect(wrapper.findAll('span').at(1).text()).toBe('to delete this reminder?')
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
    expect(wrapper.findAll('span').at(1).text()).toBe('to delete all the reminders?')
  })
})