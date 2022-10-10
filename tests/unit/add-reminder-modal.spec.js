import AddReminderModal from '@/components/add-reminder-modal/add-reminder-modal.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from '@/store'
import { mount, createLocalVue } from '@vue/test-utils'

describe('AddReminderModal', () => {
  let localVue = createLocalVue()
  document.body.setAttribute('data-app', true)
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(Vuex)
  })

  it('If the city does not have text it should not create a reminder.', async () => {
    const wrapper = mount(AddReminderModal,{
      store,
      vuetify,
      localVue,
      propsData: {
        value: true,
      }
    });

    await wrapper.setData({
      reminderForm: {
        reminder: 'test',
        date: '2022-10-01',
        time: '10:10',
        city: '',
        weather: 'The weather will be overcast clouds!',
        color: '#FFFFFF'
      }
    })

    const savebutton = wrapper.find('[data-testid="save-button"]');
    await savebutton.trigger('click')

    expect(store.state.reminder.reminders).toEqual([])
  })

  it('If the reminder does not have text it should not create a reminder.', async () => {
    const wrapper = mount(AddReminderModal,{
      store,
      vuetify,
      localVue,
      propsData: {
        value: true,
      }
    });

    await wrapper.setData({
      reminderForm: {
        reminder: '',
        date: '2022-10-01',
        time: '10:10',
        city: 'test',
        weather: 'The weather will be overcast clouds!',
        color: '#FFFFFF'
      }
    })
    
    const savebutton = wrapper.find('[data-testid="save-button"]');
    await savebutton.trigger('click')
    
    expect(store.state.reminder.reminders).toEqual([])
  })
  
  it('If the reminder has more than 30 characters, it should not create a reminder.', async () => {
    const wrapper = mount(AddReminderModal,{
      store,
      vuetify,
      localVue,
      propsData: {
        value: true,
      }
    });

    await wrapper.setData({
      reminderForm: {
        reminder: 'This text has more than 30 letters in it!',
        date: '2022-10-01',
        time: '10:10',
        city: 'test',
        weather: 'The weather will be overcast clouds!',
        color: '#FFFFFF'
      }
    })

    const savebutton = wrapper.find('[data-testid="save-button"]');
    await savebutton.trigger('click')

    expect(store.state.reminder.reminders).toEqual([])
  })
  
  it('If the form is correctly filled it should create a reminder with an Id.', async () => {
    const wrapper = mount(AddReminderModal,{
      store,
      vuetify,
      localVue,
      propsData: {
        value: true,
      }
    });

    await wrapper.setData({
      reminderForm: {
        reminder: 'test',
        date: '2022-10-01',
        time: '10:10',
        city: 'test',
        weather: 'The weather will be overcast clouds!',
        color: '#FFFFFF'
      }
    })

    const savebutton = wrapper.find('[data-testid="save-button"]');
    await savebutton.trigger('click')

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
  })
})