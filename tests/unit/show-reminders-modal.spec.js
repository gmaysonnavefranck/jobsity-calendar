import ShowRemindersModal from '@/components/calendar/show-reminders-modal.vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

describe('ShowRemindersModal', () => {
  const localVue = createLocalVue()
  let vuetify
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('The date displayed should be equal to the reminder passed.', async () => {
    const wrapper = mount(ShowRemindersModal,{
      vuetify,
      localVue,
      propsData: {
        value: true,
        reminders: [{
          reminder: 'test',
          date: '2022-10-01',
          time: '10:10',
          id: '1',
          city: 'curitiba',
          weather: 'The weather will be overcast clouds!',
          color: '#FFFFFF'
        }]
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('h2').text()).toBe('All reminders of the day 01')
  })

  it('The component should show all reminders.', async () => {
    const wrapper = mount(ShowRemindersModal,{
      vuetify,
      localVue,
      propsData: {
        value: true,
        reminders: [
          {
            reminder: 'test',
            date: '2022-10-01',
            time: '10:10',
            id: '1',
            city: 'curitiba',
            weather: 'The weather will be overcast clouds!',
            color: '#FFFFFF'
          },
          {
            reminder: 'test2',
            date: '2022-10-01',
            time: '11:11',
            id: '2',
            city: 'curitiba',
            weather: 'The weather will be overcast clouds!',
            color: '#FFFFFF'
          },
        ]
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('span').at(0).text()).toBe('@10:10: test')
    expect(wrapper.findAll('span').at(1).text()).toBe('@11:11: test2')

  })
})